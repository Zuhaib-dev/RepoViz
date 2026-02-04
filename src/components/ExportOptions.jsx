import React, { useState } from 'react';
import { FaCopy, FaDownload, FaCheck, FaFileAlt, FaFileCode } from 'react-icons/fa';
import { generateAsciiTree } from '../utils/treeGenerator';

const ExportOptions = ({ tree, repoName }) => {
    const [copied, setCopied] = useState(false);
    const [downloading, setDownloading] = useState('');

    const handleCopyTree = () => {
        const asciiTree = generateAsciiTree(tree);
        navigator.clipboard.writeText(asciiTree);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownloadText = () => {
        setDownloading('txt');
        const asciiTree = generateAsciiTree(tree);
        const blob = new Blob([asciiTree], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${repoName}-structure.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        setTimeout(() => setDownloading(''), 500);
    };

    const handleDownloadJson = () => {
        setDownloading('json');
        const json = JSON.stringify(tree, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${repoName}-structure.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        setTimeout(() => setDownloading(''), 500);
    };

    if (!tree || tree.length === 0) return null;

    const exportOptions = [
        {
            id: 'copy',
            label: copied ? 'Copied!' : 'Copy as Text',
            icon: copied ? FaCheck : FaCopy,
            onClick: handleCopyTree,
            color: copied ? 'text-green-400' : 'text-primary-400',
            bg: copied ? 'bg-green-500/10' : 'bg-primary-500/10',
            border: copied ? 'border-green-500/30' : 'border-primary-500/30',
            glow: copied ? 'hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]' : 'hover:shadow-glow',
        },
        {
            id: 'txt',
            label: 'Download .txt',
            icon: FaFileAlt,
            onClick: handleDownloadText,
            color: 'text-secondary-400',
            bg: 'bg-secondary-500/10',
            border: 'border-secondary-500/30',
            glow: 'hover:shadow-glow-cyan',
            downloading: downloading === 'txt',
        },
        {
            id: 'json',
            label: 'Download .json',
            icon: FaFileCode,
            onClick: handleDownloadJson,
            color: 'text-accent-400',
            bg: 'bg-accent-500/10',
            border: 'border-accent-500/30',
            glow: 'hover:shadow-[0_0_20px_rgba(245,158,11,0.3)]',
            downloading: downloading === 'json',
        },
    ];

    return (
        <div className="glass-card p-6 group hover:border-primary-500/40 transition-all duration-300">
            <div className="flex items-center gap-3 mb-5">
                <div className="p-2 bg-primary-500/10 rounded-lg">
                    <FaDownload className="text-xl text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold text-dark-50">Export Folder Structure</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {exportOptions.map(({ id, label, icon: Icon, onClick, color, bg, border, glow, downloading }) => (
                    <button
                        key={id}
                        onClick={onClick}
                        disabled={downloading}
                        className={`
              group/btn relative flex items-center justify-center gap-3 ${bg} border ${border} ${color} px-6 py-4 rounded-xl font-semibold 
              hover:bg-opacity-20 hover:border-opacity-60 hover:-translate-y-1 transition-all duration-200 
              active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0
              ${glow} overflow-hidden
            `}
                    >
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />

                        <Icon className={`text-xl relative ${downloading ? 'animate-bounce' : 'group-hover/btn:scale-110 transition-transform'}`} />
                        <span className="relative">{label}</span>
                    </button>
                ))}
            </div>

            <div className="mt-4 p-3 bg-dark-800/30 rounded-lg border border-primary-500/10">
                <p className="text-xs text-dark-400 flex items-center gap-2">
                    <span className="text-primary-400">💡</span>
                    <span>Export the folder structure for documentation or analysis</span>
                </p>
            </div>
        </div>
    );
};

export default ExportOptions;
