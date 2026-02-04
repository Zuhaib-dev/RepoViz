import React, { useState, useEffect } from 'react';
import { FaStar, FaCodeBranch, FaEye, FaExclamationCircle, FaCalendar, FaUser, FaExternalLinkAlt } from 'react-icons/fa';

const AnimatedCounter = ({ value, duration = 1000 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const end = parseInt(value);
        if (start === end) return;

        const incrementTime = duration / end;
        const timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start === end) clearInterval(timer);
        }, incrementTime);

        return () => clearInterval(timer);
    }, [value, duration]);

    return <span>{count}</span>;
};

const RepoStats = ({ repoInfo, languages }) => {
    if (!repoInfo) return null;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatNumber = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    };

    const getLanguageColor = (language) => {
        const colors = {
            JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572A5',
            Java: '#b07219', HTML: '#e34c26', CSS: '#563d7c', Go: '#00ADD8',
            Rust: '#dea584', Ruby: '#701516', PHP: '#4F5D95', C: '#555555',
            'C++': '#f34b7d', 'C#': '#178600', Swift: '#ffac45', Kotlin: '#A97BFF',
            Dart: '#00B4AB', Shell: '#89e051', Vue: '#41b883', React: '#61dafb',
        };
        return colors[language] || '#8b5cf6';
    };

    const stats = [
        { icon: FaStar, label: 'Stars', value: repoInfo.stars, color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/30', glow: 'hover:shadow-[0_0_20px_rgba(250,204,21,0.3)]' },
        { icon: FaCodeBranch, label: 'Forks', value: repoInfo.forks, color: 'text-primary-400', bg: 'bg-primary-400/10', border: 'border-primary-400/30', glow: 'hover:shadow-glow' },
        { icon: FaEye, label: 'Watchers', value: repoInfo.watchers, color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/30', glow: 'hover:shadow-[0_0_20px_rgba(96,165,250,0.3)]' },
        { icon: FaExclamationCircle, label: 'Issues', value: repoInfo.openIssues, color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/30', glow: 'hover:shadow-[0_0_20px_rgba(248,113,113,0.3)]' },
    ];

    return (
        <div className="glass-card p-6 sm:p-8 group hover:border-primary-500/40 transition-all duration-300">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                    <div className="relative group/avatar">
                        <div className="absolute inset-0 bg-primary-500/30 rounded-xl blur-lg group-hover/avatar:bg-primary-500/40 transition-all" />
                        <img
                            src={repoInfo.owner.avatar}
                            alt={repoInfo.owner.login}
                            className="relative w-16 h-16 rounded-xl border-2 border-primary-500/30 shadow-lg group-hover/avatar:scale-110 transition-transform duration-300"
                        />
                    </div>
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-dark-50 flex items-center gap-2">
                            {repoInfo.name}
                            {repoInfo.private && (
                                <span className="text-xs bg-accent-500/20 text-accent-400 px-2 py-1 rounded-full border border-accent-500/30">
                                    Private
                                </span>
                            )}
                        </h2>
                        <a
                            href={repoInfo.owner.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-sm text-dark-400 hover:text-primary-400 transition-colors group/link"
                        >
                            <FaUser className="text-xs" />
                            <span className="group-hover/link:underline">{repoInfo.owner.login}</span>
                        </a>
                    </div>
                </div>
                <a
                    href={repoInfo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn btn-gradient px-5 py-2.5 text-sm w-full sm:w-auto text-center flex items-center justify-center gap-2"
                >
                    <span>View on GitHub</span>
                    <FaExternalLinkAlt className="text-xs group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </a>
            </div>

            {/* Description */}
            {repoInfo.description && (
                <p className="text-dark-300 leading-relaxed mb-6 text-lg">{repoInfo.description}</p>
            )}

            {/* Stats Grid with staggered animation */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {stats.map(({ icon: Icon, label, value, color, bg, border, glow }, index) => (
                    <div
                        key={label}
                        className={`${bg} border ${border} rounded-xl p-5 hover:border-opacity-60 hover:-translate-y-1 transition-all duration-300 ${glow} group/stat relative overflow-hidden`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/stat:translate-x-full transition-transform duration-1000" />

                        <div className="relative flex items-center gap-3">
                            <div className={`p-3 rounded-lg ${bg} ${color}`}>
                                <Icon className="text-2xl" />
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-dark-50">
                                    {formatNumber(value)}
                                </div>
                                <div className="text-xs text-dark-400 font-medium uppercase tracking-wide">{label}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 py-4 border-y border-primary-500/20 mb-6">
                {repoInfo.language && (
                    <div className="flex items-center gap-2 bg-primary-500/10 px-3 py-1.5 rounded-lg border border-primary-500/20">
                        <span className="w-3 h-3 rounded-full bg-primary-500 animate-pulse-slow" />
                        <span className="text-sm text-dark-200 font-semibold">{repoInfo.language}</span>
                    </div>
                )}
                {repoInfo.license && (
                    <div className="flex items-center gap-2 text-sm text-dark-300 bg-dark-800/50 px-3 py-1.5 rounded-lg">
                        <span>📄</span>
                        <span>{repoInfo.license}</span>
                    </div>
                )}
                <div className="flex items-center gap-2 text-sm text-dark-300 bg-dark-800/50 px-3 py-1.5 rounded-lg">
                    <FaCalendar className="text-xs" />
                    <span>Updated {formatDate(repoInfo.updatedAt)}</span>
                </div>
            </div>

            {/* Languages with enhanced visualization */}
            {languages && languages.length > 0 && (
                <div>
                    <h3 className="text-lg font-semibold text-dark-50 mb-4 flex items-center gap-2">
                        <span className="w-1 h-6 bg-gradient-to-b from-primary-500 to-secondary-500 rounded-full" />
                        Languages
                    </h3>
                    <div className="flex h-3 rounded-full overflow-hidden mb-4 bg-dark-800 shadow-inner">
                        {languages.slice(0, 5).map((lang, index) => (
                            <div
                                key={index}
                                className="transition-all duration-300 hover:opacity-80 cursor-pointer relative group/lang"
                                style={{
                                    width: `${lang.percentage}%`,
                                    backgroundColor: getLanguageColor(lang.name)
                                }}
                                title={`${lang.name}: ${lang.percentage}%`}
                            >
                                {/* Tooltip on hover */}
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-dark-900 text-dark-50 text-xs rounded opacity-0 group-hover/lang:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                    {lang.name}: {lang.percentage}%
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {languages.slice(0, 5).map((lang, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm bg-dark-800/50 px-3 py-2 rounded-lg border border-primary-500/10 hover:border-primary-500/30 transition-colors">
                                <span
                                    className="w-3 h-3 rounded-full shadow-lg"
                                    style={{ backgroundColor: getLanguageColor(lang.name) }}
                                />
                                <span className="text-dark-200 font-medium">{lang.name}</span>
                                <span className="text-dark-400 font-bold">{lang.percentage}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default RepoStats;
