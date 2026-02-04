import React, { useState } from 'react';
import { FaGithub, FaSearch, FaRocket } from 'react-icons/fa';
import { parseGitHubUrl, isValidRepoData } from '../utils/urlParser';

const URLInput = ({ onSubmit, loading }) => {
    const [url, setUrl] = useState('');
    const [error, setError] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!url.trim()) {
            setError('Please enter a GitHub repository URL');
            return;
        }

        const parsed = parseGitHubUrl(url);

        if (!isValidRepoData(parsed)) {
            setError(parsed.error || 'Invalid URL format');
            return;
        }

        onSubmit(parsed.owner, parsed.repo);
    };

    const handleInputChange = (e) => {
        setUrl(e.target.value);
        if (error) setError('');
    };

    const exampleRepos = [
        { repo: 'facebook/react', label: 'React', icon: '⚛️' },
        { repo: 'microsoft/vscode', label: 'VS Code', icon: '💻' },
        { repo: 'vercel/next.js', label: 'Next.js', icon: '▲' }
    ];

    return (
        <div className="max-w-5xl mx-auto mb-16">
            {/* Header with enhanced styling */}
            <div className="text-center mb-12 relative">
                {/* Glow effect behind logo */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary-500/20 rounded-full blur-3xl animate-pulse-slow" />

                <div className="relative flex items-center justify-center gap-5 mb-4">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-primary-500/20 rounded-full blur-xl group-hover:bg-primary-500/30 transition-all" />
                        <FaGithub className="relative text-6xl text-dark-50 drop-shadow-glow group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h1 className="text-6xl sm:text-7xl font-black gradient-text tracking-tight relative">
                        RepoViz
                        <div className="absolute -top-2 -right-8 text-xs bg-gradient-to-r from-accent-500 to-accent-600 text-white px-2 py-1 rounded-full font-bold rotate-12 shadow-lg">
                            PRO
                        </div>
                    </h1>
                </div>
                <p className="text-xl text-dark-300 font-medium mb-2">
                    Visualize GitHub repositories <span className="text-primary-400 font-bold">instantly</span>
                </p>
                <p className="text-sm text-dark-500">
                    Explore README, folder structure, and stats in a beautiful interface
                </p>
            </div>

            {/* Enhanced Input Form */}
            <form onSubmit={handleSubmit} className="mb-8">
                <div className={`
          relative group
          glass-card p-2 transition-all duration-300
          ${error ? 'border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.2)]' : 'border-primary-500/20'}
          ${isFocused ? 'border-primary-500 shadow-glow scale-[1.02]' : ''}
          hover:border-primary-500/50
        `}>
                    {/* Shimmer effect on hover */}
                    <div className="absolute inset-0 overflow-hidden rounded-2xl">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </div>

                    <div className="relative flex items-center gap-3 flex-col sm:flex-row">
                        <div className="hidden sm:flex items-center justify-center w-12 h-12 bg-primary-500/10 rounded-xl">
                            <FaGithub className="text-2xl text-primary-400" />
                        </div>

                        <input
                            type="text"
                            value={url}
                            onChange={handleInputChange}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            placeholder="github.com/facebook/react"
                            className="flex-1 bg-transparent border-none outline-none text-dark-50 placeholder:text-dark-500 px-4 py-4 w-full text-lg"
                            disabled={loading}
                        />

                        <button
                            type="submit"
                            className="relative group/btn btn-gradient px-8 py-4 flex items-center gap-3 whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed w-full sm:w-auto justify-center overflow-hidden"
                            disabled={loading}
                        >
                            {/* Button shimmer effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />

                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                                    <span className="font-bold">Loading...</span>
                                </>
                            ) : (
                                <>
                                    <FaRocket className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                    <span className="font-bold">Explore</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="mt-4 px-5 py-4 bg-red-500/10 border-2 border-red-500/50 rounded-xl border-l-4 text-red-300 text-sm animate-slide-in flex items-start gap-3 shadow-[0_0_20px_rgba(239,68,68,0.1)]">
                        <span className="text-xl">⚠️</span>
                        <span className="flex-1 pt-0.5">{error}</span>
                    </div>
                )}
            </form>

            {/* Enhanced Examples */}
            <div className="flex items-center justify-center gap-4 flex-wrap">
                <span className="text-dark-400 text-sm font-semibold flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-primary-500 animate-pulse" />
                    Quick Start:
                </span>
                {exampleRepos.map(({ repo, label, icon }) => (
                    <button
                        key={repo}
                        onClick={() => setUrl(repo)}
                        className="group relative glass-card px-5 py-2.5 text-sm font-mono text-dark-200 hover:border-primary-500 hover:bg-primary-500/10 hover:-translate-y-1 hover:shadow-glow transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 overflow-hidden"
                        disabled={loading}
                    >
                        {/* Hover gradient background */}
                        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/0 via-primary-500/10 to-primary-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />

                        <span className="relative flex items-center gap-2">
                            <span className="text-base">{icon}</span>
                            <span>{label}</span>
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default URLInput;
