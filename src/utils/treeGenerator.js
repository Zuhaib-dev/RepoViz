/**
 * Convert GitHub tree API response to hierarchical structure
 */
export const buildTreeStructure = (treeData) => {
    if (!treeData || !Array.isArray(treeData)) {
        return [];
    }

    const root = [];
    const pathMap = {};

    // Sort by path to ensure parents come before children
    const sortedData = [...treeData].sort((a, b) => a.path.localeCompare(b.path));

    sortedData.forEach(item => {
        const parts = item.path.split('/');
        const name = parts[parts.length - 1];

        const node = {
            name,
            path: item.path,
            type: item.type,
            size: item.size,
            children: item.type === 'tree' ? [] : undefined
        };

        pathMap[item.path] = node;

        if (parts.length === 1) {
            // Root level item
            root.push(node);
        } else {
            // Find parent
            const parentPath = parts.slice(0, -1).join('/');
            const parent = pathMap[parentPath];

            if (parent && parent.children) {
                parent.children.push(node);
            }
        }
    });

    return root;
};

/**
 * Generate ASCII tree representation
 */
export const generateAsciiTree = (tree, prefix = '', isLast = true) => {
    let result = '';

    tree.forEach((node, index) => {
        const isLastItem = index === tree.length - 1;
        const connector = isLastItem ? '└── ' : '├── ';
        const icon = node.type === 'tree' ? '📁' : '📄';

        result += prefix + connector + icon + ' ' + node.name + '\n';

        if (node.children && node.children.length > 0) {
            const newPrefix = prefix + (isLastItem ? '    ' : '│   ');
            result += generateAsciiTree(node.children, newPrefix, isLastItem);
        }
    });

    return result;
};

/**
 * Calculate statistics for the tree
 */
export const calculateTreeStats = (tree) => {
    let fileCount = 0;
    let folderCount = 0;
    let totalSize = 0;

    const traverse = (nodes) => {
        nodes.forEach(node => {
            if (node.type === 'tree') {
                folderCount++;
                if (node.children) {
                    traverse(node.children);
                }
            } else {
                fileCount++;
                totalSize += node.size || 0;
            }
        });
    };

    traverse(tree);

    return {
        fileCount,
        folderCount,
        totalSize,
        totalItems: fileCount + folderCount
    };
};

/**
 * Format file size to human-readable format
 */
export const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};
