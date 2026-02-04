import React, { useState } from 'react';
import { FaChevronRight, FaChevronDown, FaFolder, FaFolderOpen } from 'react-icons/fa';
import { getFileIcon, getFolderIcon } from '../utils/fileIcons';

const TreeNode = ({ node, level = 0 }) => {
    const [isOpen, setIsOpen] = useState(level < 2);
    const isFolder = node.type === 'tree';

    const handleToggle = () => {
        if (isFolder) setIsOpen(!isOpen);
    };

    const iconData = isFolder ? getFolderIcon(isOpen) : getFileIcon(node.name);
    const Icon = iconData.icon;

    const formatBytes = (bytes) => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round((bytes / Math.pow(k, i)) * 10) / 10 + ' ' + sizes[i];
    };

    return (
        <div>
            <div
                className={`
          group/node flex items-center gap-2 px-3 py-2.5 rounded-lg transition-all duration-200 relative
          ${isFolder ? 'cursor-pointer hover:bg-primary-500/10 hover:border-l-2 hover:border-primary-500' : 'hover:bg-primary-500/5'}
        `}
                style={{ paddingLeft: `${level * 1.5 + 0.75}rem` }}
                onClick={handleToggle}
            >
                {/* Hover glow effect */}
                {isFolder && (
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-500/0 via-primary-500/5 to-primary-500/0 opacity-0 group-hover/node:opacity-100 transition-opacity rounded-lg" />
                )}

                {isFolder && (
                    <span className={`text-dark-400 text-xs flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-0' : '-rotate-90'}`}>
                        <FaChevronDown />
                    </span>
                )}
                <Icon
                    className={`text-lg flex-shrink-0 transition-transform group-hover/node:scale-110 ${isFolder ? 'group-hover/node:rotate-6' : ''}`}
                    style={{ color: iconData.color }}
                />
                <span className="font-mono text-sm text-dark-200 flex-1 truncate group-hover/node:text-dark-50 transition-colors">
                    {node.name}
                </span>
                {!isFolder && node.size && (
                    <span className="text-xs text-dark-500 flex-shrink-0 bg-dark-800/50 px-2 py-1 rounded">
                        {formatBytes(node.size)}
                    </span>
                )}
            </div>

            {isFolder && isOpen && node.children && (
                <div className="animate-slide-down">
                    {node.children.map((child, index) => (
                        <TreeNode
                            key={`${child.path}-${index}`}
                            node={child}
                            level={level + 1}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const FolderTree = ({ tree, stats }) => {
    const [searchTerm, setSearchTerm] = useState('');

    if (!tree || tree.length === 0) {
        return (
            <div className="glass-card p-12 text-center">
                <div className="text-6xl mb-4 opacity-50">📁</div>
                <p className="text-dark-400 text-lg">No folder structure available</p>
            </div>
        );
    }

    return (
        <div className="glass-card p-6 sm:p-8 group hover:border-primary-500/40 transition-all duration-300">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b-2 border-primary-500/20">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary-500/10 rounded-xl">
                        <FaFolder className="text-2xl text-primary-400" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-dark-50">Folder Structure</h2>
                        {stats && (
                            <div className="flex items-center gap-3 text-sm text-dark-400 mt-1">
                                <span className="flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
                                    <strong className="text-primary-400 font-semibold">{stats.folderCount}</strong> folders
                                </span>
                                <span className="text-primary-500/50">•</span>
                                <span className="flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-secondary-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
                                    <strong className="text-secondary-400 font-semibold">{stats.fileCount}</strong> files
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div
                className="max-h-[600px] overflow-y-auto custom-scrollbar overscroll-contain rounded-lg bg-dark-900/30 p-2"
                data-lenis-prevent
            >
                {tree.map((node, index) => (
                    <TreeNode key={`${node.path}-${index}`} node={node} />
                ))}
            </div>
        </div>
    );
};

export default FolderTree;
