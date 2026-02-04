import axios from 'axios';

const GITHUB_API_BASE = 'https://api.github.com';

/**
 * Create axios instance with default config
 */
const api = axios.create({
    baseURL: GITHUB_API_BASE,
    headers: {
        'Accept': 'application/vnd.github.v3+json'
    }
});

/**
 * Handle API errors with user-friendly messages
 */
const handleApiError = (error) => {
    if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.message || '';

        switch (status) {
            case 404:
                return 'Repository not found. Please check the URL and try again.';
            case 403:
                if (message.includes('rate limit')) {
                    return 'GitHub API rate limit exceeded. Please try again in a few minutes.';
                }
                return 'Access forbidden. The repository might be private.';
            case 401:
                return 'Authentication required. This repository might be private.';
            default:
                return `GitHub API error: ${message || 'Unknown error occurred'}`;
        }
    } else if (error.request) {
        return 'Network error. Please check your internet connection.';
    }
    return 'An unexpected error occurred. Please try again.';
};

/**
 * Fetch repository information
 */
export const fetchRepoInfo = async (owner, repo) => {
    try {
        const response = await api.get(`/repos/${owner}/${repo}`);
        return {
            success: true,
            data: {
                name: response.data.name,
                fullName: response.data.full_name,
                description: response.data.description,
                stars: response.data.stargazers_count,
                forks: response.data.forks_count,
                watchers: response.data.watchers_count,
                language: response.data.language,
                license: response.data.license?.name,
                updatedAt: response.data.updated_at,
                createdAt: response.data.created_at,
                owner: {
                    login: response.data.owner.login,
                    avatar: response.data.owner.avatar_url,
                    url: response.data.owner.html_url
                },
                url: response.data.html_url,
                defaultBranch: response.data.default_branch,
                size: response.data.size,
                openIssues: response.data.open_issues_count
            }
        };
    } catch (error) {
        return {
            success: false,
            error: handleApiError(error)
        };
    }
};

/**
 * Fetch README content
 */
export const fetchReadme = async (owner, repo) => {
    try {
        const response = await api.get(`/repos/${owner}/${repo}/readme`);

        // Decode base64 content
        const content = atob(response.data.content);

        return {
            success: true,
            data: {
                content,
                name: response.data.name,
                path: response.data.path,
                downloadUrl: response.data.download_url
            }
        };
    } catch (error) {
        if (error.response?.status === 404) {
            return {
                success: false,
                error: 'No README file found in this repository.'
            };
        }
        return {
            success: false,
            error: handleApiError(error)
        };
    }
};

/**
 * Fetch repository tree (folder structure)
 */
export const fetchRepoTree = async (owner, repo, branch = 'main') => {
    try {
        // First, try with the provided branch
        let response;
        try {
            response = await api.get(`/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`);
        } catch (err) {
            // If main doesn't work, try master
            if (err.response?.status === 404 && branch === 'main') {
                response = await api.get(`/repos/${owner}/${repo}/git/trees/master?recursive=1`);
            } else {
                throw err;
            }
        }

        // Limit to reasonable number of items (GitHub API can return truncated results)
        const tree = response.data.tree || [];
        const truncated = response.data.truncated || false;

        return {
            success: true,
            data: {
                tree,
                truncated,
                sha: response.data.sha
            }
        };
    } catch (error) {
        return {
            success: false,
            error: handleApiError(error)
        };
    }
};

/**
 * Fetch repository languages
 */
export const fetchLanguages = async (owner, repo) => {
    try {
        const response = await api.get(`/repos/${owner}/${repo}/languages`);

        // Calculate percentages
        const languages = response.data;
        const total = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);

        const languageStats = Object.entries(languages).map(([name, bytes]) => ({
            name,
            bytes,
            percentage: ((bytes / total) * 100).toFixed(1)
        })).sort((a, b) => b.bytes - a.bytes);

        return {
            success: true,
            data: languageStats
        };
    } catch (error) {
        return {
            success: false,
            error: handleApiError(error)
        };
    }
};

/**
 * Fetch all repository data at once
 */
export const fetchAllRepoData = async (owner, repo) => {
    try {
        const [repoInfo, readme, languages] = await Promise.all([
            fetchRepoInfo(owner, repo),
            fetchReadme(owner, repo),
            fetchLanguages(owner, repo)
        ]);

        // Fetch tree with the default branch from repo info
        const defaultBranch = repoInfo.success ? repoInfo.data.defaultBranch : 'main';
        const tree = await fetchRepoTree(owner, repo, defaultBranch);

        return {
            repoInfo,
            readme,
            tree,
            languages
        };
    } catch (error) {
        return {
            error: 'Failed to fetch repository data. Please try again.'
        };
    }
};
