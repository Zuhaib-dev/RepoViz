import React from 'react';
import {
    FaGithub,
    FaLinkedin,
    FaTwitter,
    FaEnvelope,
    FaGlobe,
    FaHeart,
    FaCode
} from 'react-icons/fa';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        {
            name: 'GitHub',
            icon: FaGithub,
            url: 'https://github.com/Zuhaib-dev',
            color: 'hover:text-gray-300',
            bgGradient: 'hover:from-gray-700 hover:to-gray-900'
        },
        {
            name: 'LinkedIn',
            icon: FaLinkedin,
            url: 'https://www.linkedin.com/in/zuhaib-rashid-661345318/',
            color: 'hover:text-blue-400',
            bgGradient: 'hover:from-blue-600 hover:to-blue-800'
        },
        {
            name: 'Twitter',
            icon: FaTwitter,
            url: 'https://x.com/xuhaib_x9',
            color: 'hover:text-sky-400',
            bgGradient: 'hover:from-sky-500 hover:to-sky-700'
        },
        {
            name: 'Portfolio',
            icon: FaGlobe,
            url: 'https://www.zuhaibrashid.com/',
            color: 'hover:text-purple-400',
            bgGradient: 'hover:from-purple-600 hover:to-purple-800'
        },
        {
            name: 'Email',
            icon: FaEnvelope,
            url: 'mailto:zuhaibrashid01@gmail.com',
            color: 'hover:text-red-400',
            bgGradient: 'hover:from-red-600 hover:to-red-800'
        }
    ];

    const quickLinks = [
        { name: 'About', url: 'https://www.zuhaibrashid.com/#about' },
        { name: 'Projects', url: 'https://www.zuhaibrashid.com/#projects' },
        { name: 'Contact', url: 'https://www.zuhaibrashid.com/#contact' }
    ];

    return (
        <footer className="relative mt-20 border-t border-primary-500/10 backdrop-blur-sm overflow-hidden">
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900/50 to-transparent pointer-events-none" />

            {/* Decorative gradient orbs */}
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-primary-500/10 rounded-full blur-3xl animate-pulse-slow" />
            <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-secondary-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

                    {/* Brand Section */}
                    <div className="space-y-4 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-2">
                            <FaCode className="text-primary-500 text-2xl animate-pulse-slow" />
                            <h3 className="text-2xl font-bold gradient-text">RepoViz</h3>
                        </div>
                        <p className="text-dark-400 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
                            Instantly visualize GitHub repository README files and folder structures with beautiful, interactive displays.
                        </p>
                        <div className="flex items-center justify-center md:justify-start gap-2 text-dark-500 text-xs">
                            <span>Powered by</span>
                            <a
                                href="https://docs.github.com/en/rest"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary-400 hover:text-primary-300 transition-colors font-semibold"
                            >
                                GitHub API
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4 text-center">
                        <h4 className="text-lg font-semibold text-dark-200">Quick Links</h4>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-dark-400 hover:text-primary-400 transition-colors text-sm inline-block hover:translate-x-1 transform duration-200"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                            <li>
                                <a
                                    href="https://github.com/Zuhaib-dev/RepoViz"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-dark-400 hover:text-primary-400 transition-colors text-sm inline-block hover:translate-x-1 transform duration-200"
                                >
                                    Source Code
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div className="space-y-4 text-center md:text-right">
                        <h4 className="text-lg font-semibold text-dark-200">Connect With Me</h4>
                        <div className="flex items-center justify-center md:justify-end gap-3 flex-wrap">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={social.name}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.name}
                                        className={`
                      group relative p-3 rounded-xl bg-dark-800/50 border border-dark-700/50
                      hover:border-primary-500/50 transition-all duration-300
                      hover:scale-110 hover:shadow-lg hover:shadow-primary-500/20
                      ${social.color}
                    `}
                                    >
                                        <Icon className="text-xl text-dark-300 group-hover:text-current transition-colors" />

                                        {/* Tooltip */}
                                        <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-dark-800 text-dark-200 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                            {social.name}
                                        </span>
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent mb-8" />

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
                    {/* Copyright */}
                    <div className="text-dark-400 flex items-center gap-2 order-2 md:order-1">
                        <span>© {currentYear}</span>
                        <a
                            href="https://www.zuhaibrashid.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold gradient-text hover:opacity-80 transition-opacity"
                        >
                            Zuhaib Rashid
                        </a>
                        <span>• All rights reserved</span>
                    </div>

                    {/* Made with love */}
                    <div className="flex items-center gap-2 text-dark-400 order-1 md:order-2">
                        <span>Crafted with</span>
                        <FaHeart className="text-red-500 animate-pulse-slow" />
                        <span>and</span>
                        <FaCode className="text-primary-500 animate-pulse-slow" />
                    </div>
                </div>

                {/* Tech Stack Badge */}
                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-dark-500">
                    <span>Built with</span>
                    <span className="px-2 py-1 rounded bg-dark-800/50 text-primary-400 font-semibold">React</span>
                    <span className="px-2 py-1 rounded bg-dark-800/50 text-secondary-400 font-semibold">Vite</span>
                    <span className="px-2 py-1 rounded bg-dark-800/50 text-accent-400 font-semibold">Tailwind CSS</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
