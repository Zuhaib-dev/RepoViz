import React, { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import URLInput from './components/URLInput';
import RepoStats from './components/RepoStats';
import ReadmeViewer from './components/ReadmeViewer';
import FolderTree from './components/FolderTree';
import ExportOptions from './components/ExportOptions';
import { fetchAllRepoData } from './services/githubAPI';
import { buildTreeStructure, calculateTreeStats } from './utils/treeGenerator';

function App() {
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');
    const [repoData, setRepoData] = React.useState(null);

    // Initialize Lenis smooth scroll
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            smoothTouch: false,
            touchMultiplier: 2,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    const handleFetchRepo = async (owner, repo) => {
        setLoading(true);
        setError('');
        setRepoData(null);

        try {
            const data = await fetchAllRepoData(owner, repo);

            if (data.repoInfo && !data.repoInfo.success) {
                setError(data.repoInfo.error);
                setLoading(false);
                return;
            }

            let treeStructure = [];
            let treeStats = null;
            if (data.tree && data.tree.success) {
                treeStructure = buildTreeStructure(data.tree.data.tree);
                treeStats = calculateTreeStats(treeStructure);
            }

            setRepoData({
                info: data.repoInfo.success ? data.repoInfo.data : null,
                readme: data.readme.success ? data.readme.data.content : null,
                tree: treeStructure,
                treeStats: treeStats,
                languages: data.languages.success ? data.languages.data : [],
                truncated: data.tree?.data?.truncated || false
            });

        } catch (err) {
            setError('An unexpected error occurred. Please try again.');
            console.error('Error fetching repo:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col relative overflow-hidden">
            {/* Enhanced animated gradient background with multiple layers */}
            <div className="fixed inset-0 -z-10">
                {/* Base gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950" />

                {/* Animated gradient orbs */}
                <div className="absolute inset-0 opacity-40">
                    <div className="absolute top-[10%] left-[10%] w-[600px] h-[600px] bg-primary-500/20 rounded-full blur-3xl animate-float" />
                    <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-secondary-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-accent-500/10 rounded-full blur-3xl animate-pulse-slow" />
                </div>

                {/* Grid pattern overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

                {/* Noise texture */}
                <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />
            </div>

            {/* Top progress bar when loading */}
            {loading && (
                <div className="fixed top-0 left-0 right-0 h-1 bg-dark-800 z-50 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 animate-[shimmer_1.5s_ease-in-out_infinite] w-full" />
                </div>
            )}

            <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 relative z-10">
                <URLInput onSubmit={handleFetchRepo} loading={loading} />

                {error && (
                    <div className="flex items-center gap-4 glass-card p-5 mb-8 border-red-500/50 bg-red-500/10 animate-slide-in group hover:border-red-500/70 transition-all">
                        <span className="text-3xl animate-bounce-slow">⚠️</span>
                        <span className="text-red-300 flex-1">{error}</span>
                        <button
                            onClick={() => setError('')}
                            className="text-red-400 hover:text-red-300 transition-colors p-1"
                        >
                            ✕
                        </button>
                    </div>
                )}

                {loading && (
                    <div className="flex flex-col items-center justify-center py-20 gap-8">
                        <div className="relative">
                            <div className="w-20 h-20 border-4 border-primary-500/20 border-t-primary-500 rounded-full animate-spin" />
                            <div className="absolute inset-0 w-20 h-20 border-4 border-secondary-500/20 border-b-secondary-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
                        </div>
                        <div className="text-center">
                            <p className="text-dark-200 text-xl font-semibold mb-2">Fetching repository data...</p>
                            <p className="text-dark-400 text-sm">This may take a few moments</p>
                        </div>
                    </div>
                )}

                {repoData && !loading && (
                    <div className="space-y-8">
                        {repoData.info && (
                            <div className="animate-fade-in-up">
                                <RepoStats
                                    repoInfo={repoData.info}
                                    languages={repoData.languages}
                                />
                            </div>
                        )}

                        {repoData.readme && (
                            <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                                <ReadmeViewer
                                    content={repoData.readme}
                                    repoName={repoData.info?.name}
                                />
                            </div>
                        )}

                        {repoData.tree && repoData.tree.length > 0 && (
                            <>
                                <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                                    <FolderTree
                                        tree={repoData.tree}
                                        stats={repoData.treeStats}
                                    />
                                </div>
                                <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                                    <ExportOptions
                                        tree={repoData.tree}
                                        repoName={repoData.info?.name || 'repo'}
                                    />
                                </div>
                                {repoData.truncated && (
                                    <div className="flex items-center gap-4 glass-card p-4 border-secondary-500/50 bg-secondary-500/10 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                                        <span className="text-2xl">ℹ️</span>
                                        <span className="text-secondary-300">This repository is very large. Some files may not be shown.</span>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                )}
            </div>

            <footer className="text-center py-8 mt-16 border-t border-primary-500/10 backdrop-blur-sm relative z-10">
                <p className="text-dark-400 text-sm">
                    Built with <span className="text-red-500 animate-pulse-slow">❤️</span> using React • Data from{' '}
                    <a
                        href="https://docs.github.com/en/rest"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-400 hover:text-secondary-400 transition-colors font-semibold hover:underline"
                    >
                        GitHub API
                    </a>
                </p>
            </footer>
        </div>
    );
}

export default App;
