/**
 * Parse GitHub repository URL and extract owner and repo name
 * Supports various GitHub URL formats
 */
export const parseGitHubUrl = (url) => {
    if (!url || typeof url !== 'string') {
        return { error: 'Please enter a valid URL' };
    }

    // Remove whitespace
    url = url.trim();

    // Regular expressions for different GitHub URL formats
    const patterns = [
        // https://github.com/owner/repo
        /^https?:\/\/github\.com\/([^\/]+)\/([^\/]+?)(\.git)?$/,
        // github.com/owner/repo
        /^github\.com\/([^\/]+)\/([^\/]+?)(\.git)?$/,
        // owner/repo
        /^([^\/\s]+)\/([^\/\s]+)$/,
        // https://github.com/owner/repo/...
        /^https?:\/\/github\.com\/([^\/]+)\/([^\/]+)/,
    ];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) {
            const owner = match[1];
            let repo = match[2];

            // Remove .git extension if present
            repo = repo.replace(/\.git$/, '');

            // Remove trailing slash
            repo = repo.replace(/\/$/, '');

            // Validate owner and repo names
            if (owner && repo && owner !== '' && repo !== '') {
                return { owner, repo };
            }
        }
    }

    return { error: 'Invalid GitHub URL format. Try: github.com/owner/repo' };
};

/**
 * Validate if the parsed result is valid
 */
export const isValidRepoData = (data) => {
    return data && data.owner && data.repo && !data.error;
};
