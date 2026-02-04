import React, { useState, useEffect } from 'react';
import { FaGithub, FaCode, FaBars, FaTimes, FaRocket } from 'react-icons/fa';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#home', icon: FaRocket },
        { name: 'Features', href: '#features', icon: FaCode },
        { name: 'GitHub', href: 'https://github.com/Zuhaib-dev/RepoViz', icon: FaGithub, external: true },
    ];

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <header
            className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isScrolled
                    ? 'bg-dark-900/95 backdrop-blur-lg border-b border-primary-500/20 shadow-lg shadow-primary-500/10'
                    : 'bg-transparent'
                }
      `}
        >
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">

                    {/* Logo Section */}
                    <div
                        className="flex items-center gap-3 cursor-pointer group"
                        onClick={scrollToTop}
                    >
                        <div className="relative">
                            {/* Animated glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />

                            {/* Logo icon */}
                            <div className="relative bg-gradient-to-br from-primary-600 to-secondary-600 p-2 rounded-lg transform group-hover:scale-110 transition-transform">
                                <FaCode className="text-white text-xl md:text-2xl" />
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <h1 className="text-xl md:text-2xl font-bold gradient-text tracking-tight">
                                RepoViz
                            </h1>
                            <p className="text-xs text-dark-400 hidden sm:block">
                                GitHub Visualizer
                            </p>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => {
                            const Icon = link.icon;
                            return (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    target={link.external ? '_blank' : undefined}
                                    rel={link.external ? 'noopener noreferrer' : undefined}
                                    className="
                    group relative px-4 py-2 rounded-lg
                    text-dark-300 hover:text-white
                    transition-all duration-300
                    hover:bg-dark-800/50
                  "
                                >
                                    <div className="flex items-center gap-2">
                                        <Icon className="text-sm group-hover:scale-110 transition-transform" />
                                        <span className="font-medium text-sm">{link.name}</span>
                                    </div>

                                    {/* Animated underline */}
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                                </a>
                            );
                        })}

                        {/* CTA Button */}
                        <a
                            href="https://www.zuhaibrashid.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                ml-4 px-5 py-2.5 rounded-lg
                bg-gradient-to-r from-primary-600 to-secondary-600
                text-white font-semibold text-sm
                shadow-lg shadow-primary-500/30
                hover:shadow-primary-500/50 hover:scale-105
                transition-all duration-300
                border border-primary-500/20
              "
                        >
                            Portfolio
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="
              md:hidden p-2 rounded-lg
              text-dark-300 hover:text-white
              hover:bg-dark-800/50
              transition-all duration-300
            "
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? (
                            <FaTimes className="text-2xl" />
                        ) : (
                            <FaBars className="text-2xl" />
                        )}
                    </button>
                </div>

                {/* Mobile Navigation */}
                <div
                    className={`
            md:hidden overflow-hidden transition-all duration-300 ease-in-out
            ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
          `}
                >
                    <div className="py-4 space-y-2 border-t border-primary-500/10">
                        {navLinks.map((link) => {
                            const Icon = link.icon;
                            return (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    target={link.external ? '_blank' : undefined}
                                    rel={link.external ? 'noopener noreferrer' : undefined}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="
                    flex items-center gap-3 px-4 py-3 rounded-lg
                    text-dark-300 hover:text-white
                    hover:bg-dark-800/50
                    transition-all duration-300
                    group
                  "
                                >
                                    <Icon className="text-lg group-hover:scale-110 transition-transform" />
                                    <span className="font-medium">{link.name}</span>
                                </a>
                            );
                        })}

                        {/* Mobile CTA Button */}
                        <a
                            href="https://www.zuhaibrashid.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="
                flex items-center justify-center gap-2
                mx-4 mt-4 px-5 py-3 rounded-lg
                bg-gradient-to-r from-primary-600 to-secondary-600
                text-white font-semibold
                shadow-lg shadow-primary-500/30
                hover:shadow-primary-500/50
                transition-all duration-300
              "
                        >
                            Visit Portfolio
                        </a>
                    </div>
                </div>
            </nav>

            {/* Decorative bottom gradient line */}
            {isScrolled && (
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />
            )}
        </header>
    );
};

export default Header;
