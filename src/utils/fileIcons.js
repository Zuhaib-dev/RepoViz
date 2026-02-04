import {
    FaFolder,
    FaFolderOpen,
    FaFileCode,
    FaFileAlt,
    FaFile,
} from 'react-icons/fa';
import {
    SiJavascript,
    SiTypescript,
    SiPython,
    SiReact,
    SiHtml5,
    SiCss3,
    SiJson,
    SiMarkdown,
    SiGit,
    SiDocker,
    SiNpm,
} from 'react-icons/si';
import { VscJson } from 'react-icons/vsc';

/**
 * Get icon component for a file based on its name/extension
 */
export const getFileIcon = (fileName) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    const name = fileName.toLowerCase();

    // Special files
    if (name === 'package.json') return { icon: SiNpm, color: '#CB3837' };
    if (name === '.gitignore' || name === '.gitattributes') return { icon: SiGit, color: '#F05032' };
    if (name === 'dockerfile') return { icon: SiDocker, color: '#2496ED' };
    if (name === 'readme.md' || name === 'readme') return { icon: SiMarkdown, color: '#083fa1' };

    // By extension
    const iconMap = {
        // JavaScript/TypeScript
        js: { icon: SiJavascript, color: '#F7DF1E' },
        jsx: { icon: SiReact, color: '#61DAFB' },
        ts: { icon: SiTypescript, color: '#3178C6' },
        tsx: { icon: SiReact, color: '#61DAFB' },

        // Python
        py: { icon: SiPython, color: '#3776AB' },

        // Web
        html: { icon: SiHtml5, color: '#E34F26' },
        css: { icon: SiCss3, color: '#1572B6' },
        scss: { icon: SiCss3, color: '#CC6699' },
        sass: { icon: SiCss3, color: '#CC6699' },

        // Data
        json: { icon: VscJson, color: '#FFA500' },
        md: { icon: SiMarkdown, color: '#083fa1' },

        // Config
        yml: { icon: FaFileCode, color: '#CB171E' },
        yaml: { icon: FaFileCode, color: '#CB171E' },
        toml: { icon: FaFileCode, color: '#9c4221' },
        xml: { icon: FaFileCode, color: '#e37933' },

        // Text
        txt: { icon: FaFileAlt, color: '#6c757d' },
    };

    return iconMap[ext] || { icon: FaFile, color: '#6c757d' };
};

/**
 * Get folder icon (open or closed)
 */
export const getFolderIcon = (isOpen) => {
    return {
        icon: isOpen ? FaFolderOpen : FaFolder,
        color: '#ffa500'
    };
};
