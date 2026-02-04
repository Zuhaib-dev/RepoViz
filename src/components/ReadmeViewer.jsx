import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FaBook, FaCopy } from 'react-icons/fa';

const ReadmeViewer = ({ content, repoName }) => {
    const [copiedCode, setCopiedCode] = useState('');

    const handleCopyCode = (code) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(''), 2000);
    };

    if (!content) {
        return (
            <div className="glass-card p-12 text-center">
                <div className="text-6xl mb-4 opacity-50">📖</div>
                <p className="text-dark-400 text-lg">No README file found in this repository.</p>
            </div>
        );
    }

    return (
        <div className="glass-card p-5 md:p-6 lg:p-8 group hover:border-primary-500/40 transition-all duration-300">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b-2 border-primary-500/20">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 md:p-3 bg-primary-500/10 rounded-xl flex-shrink-0">
                        <FaBook className="text-xl md:text-2xl text-primary-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <h2 className="text-xl md:text-2xl font-bold text-dark-50 flex items-center gap-2">
                            README.md
                        </h2>
                        {repoName && (
                            <span className="font-mono text-xs md:text-sm text-dark-400 mt-1 block truncate">
                                {repoName}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className="prose prose-invert prose-primary max-w-none overscroll-contain">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    skipHtml={false}
                    components={{
                        code({ node, inline, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || '');
                            const codeString = String(children).replace(/\n$/, '');

                            return !inline && match ? (
                                <div className="relative group/code my-4">
                                    <button
                                        onClick={() => handleCopyCode(codeString)}
                                        className="absolute top-3 right-3 p-2 bg-dark-800/80 hover:bg-dark-700 text-dark-300 hover:text-dark-50 rounded-lg opacity-0 group-hover/code:opacity-100 transition-all duration-200 z-10 flex items-center gap-2 text-sm"
                                    >
                                        {copiedCode === codeString ? (
                                            <>
                                                <span className="text-green-400">✓</span>
                                                <span>Copied!</span>
                                            </>
                                        ) : (
                                            <>
                                                <FaCopy />
                                                <span>Copy</span>
                                            </>
                                        )}
                                    </button>
                                    <SyntaxHighlighter
                                        style={vscDarkPlus}
                                        language={match[1]}
                                        PreTag="div"
                                        customStyle={{
                                            borderRadius: '0.75rem',
                                            fontSize: '0.9rem',
                                            margin: 0,
                                            background: 'rgba(15, 23, 42, 0.6)',
                                            border: '1px solid rgba(139, 92, 246, 0.2)',
                                            padding: '1.5rem',
                                        }}
                                        {...props}
                                    >
                                        {codeString}
                                    </SyntaxHighlighter>
                                </div>
                            ) : (
                                <code className="bg-primary-500/15 text-primary-300 px-2 py-1 rounded font-mono text-sm border border-primary-500/20" {...props}>
                                    {children}
                                </code>
                            );
                        },
                        a({ node, children, href, ...props }) {
                            return (
                                <a
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary-400 hover:text-secondary-400 underline decoration-primary-500/30 hover:decoration-secondary-500/50 transition-all font-semibold"
                                    {...props}
                                >
                                    {children}
                                </a>
                            );
                        },
                        img({ node, src, alt, ...props }) {
                            return (
                                <img
                                    src={src}
                                    alt={alt}
                                    loading="lazy"
                                    className="rounded-xl shadow-2xl my-6 max-w-full h-auto border border-primary-500/20 hover:border-primary-500/40 transition-all"
                                    {...props}
                                />
                            );
                        },
                        table({ node, children, ...props }) {
                            return (
                                <div className="overflow-x-auto my-6 rounded-xl border border-primary-500/20 shadow-lg">
                                    <table className="min-w-full" {...props}>
                                        {children}
                                    </table>
                                </div>
                            );
                        },
                        th({ node, children, ...props }) {
                            return (
                                <th className="bg-primary-500/15 px-4 py-3 text-left font-bold text-dark-50 border-b-2 border-primary-500/30" {...props}>
                                    {children}
                                </th>
                            );
                        },
                        td({ node, children, ...props }) {
                            return (
                                <td className="px-4 py-3 border-b border-primary-500/10 text-dark-200 bg-dark-900/20" {...props}>
                                    {children}
                                </td>
                            );
                        },
                        h1({ node, children, ...props }) {
                            return (
                                <h1 className="text-4xl font-black text-dark-50 mt-8 mb-4 pb-3 border-b-2 border-gradient-to-r from-primary-500 to-secondary-500 flex items-center gap-3" {...props}>
                                    <span className="w-2 h-10 bg-gradient-to-b from-primary-500 to-secondary-500 rounded-full" />
                                    {children}
                                </h1>
                            );
                        },
                        h2({ node, children, ...props }) {
                            return (
                                <h2 className="text-3xl font-bold text-dark-50 mt-8 mb-4 pb-2 border-b border-primary-500/30 flex items-center gap-2" {...props}>
                                    <span className="w-1.5 h-8 bg-gradient-to-b from-primary-500 to-secondary-500 rounded-full" />
                                    {children}
                                </h2>
                            );
                        },
                        h3({ node, children, ...props }) {
                            return <h3 className="text-2xl font-bold text-dark-50 mt-6 mb-3 flex items-center gap-2" {...props}>
                                <span className="w-1 h-6 bg-primary-500 rounded-full" />
                                {children}
                            </h3>;
                        },
                        h4({ node, children, ...props }) {
                            return <h4 className="text-xl font-semibold text-dark-100 mt-5 mb-2" {...props}>{children}</h4>;
                        },
                        p({ node, children, ...props }) {
                            return <p className="text-dark-200 leading-relaxed my-4 text-base" {...props}>{children}</p>;
                        },
                        ul({ node, children, ...props }) {
                            return <ul className="list-none space-y-2 my-4 text-dark-200" {...props}>{children}</ul>;
                        },
                        li({ node, children, ...props }) {
                            return (
                                <li className="flex items-start gap-2 text-dark-200" {...props}>
                                    <span className="text-primary-400 mt-1.5 flex-shrink-0">▸</span>
                                    <span className="flex-1">{children}</span>
                                </li>
                            );
                        },
                        ol({ node, children, ...props }) {
                            return <ol className="list-decimal list-inside space-y-2 my-4 text-dark-200 ml-2" {...props}>{children}</ol>;
                        },
                        blockquote({ node, children, ...props }) {
                            return (
                                <blockquote className="border-l-4 border-primary-500 bg-primary-500/5 pl-6 py-4 my-6 text-dark-300 italic rounded-r-lg relative" {...props}>
                                    <div className="absolute top-4 left-2 text-4xl text-primary-500/20">"</div>
                                    {children}
                                </blockquote>
                            );
                        },
                        hr({ node, ...props }) {
                            return <hr className="border-0 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent my-8" {...props} />;
                        },
                    }}
                >
                    {content}
                </ReactMarkdown>
            </div>
        </div>
    );
};

export default ReadmeViewer;
