# RepoViz 🚀

A modern, production-ready web application to visualize GitHub repository README files and folder structures instantly.

## ✨ Features

- 📖 **README Viewer** - Full GitHub Flavored Markdown support with syntax highlighting
- 📁 **Folder Structure** - Interactive, collapsible tree view with file type icons
- 📊 **Repository Stats** - Stars, forks, watchers, language breakdown, and more
- 💾 **Export Options** - Copy or download folder structure as text or JSON
- 🎨 **Premium UI** - Modern design with glassmorphism, gradients, and smooth animations
- 📱 **Fully Responsive** - Works perfectly on desktop, tablet, and mobile
- ⚡ **Fast & Optimized** - Code splitting, lazy loading, and performance optimizations
- 🔍 **SEO Ready** - Comprehensive meta tags for search engines and social media

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎯 Usage

1. Paste any GitHub repository URL (e.g., `github.com/facebook/react`)
2. Click "Explore" or press Enter
3. View README, folder structure, and repository statistics
4. Export folder structure as needed

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **react-markdown** - Markdown rendering
- **remark-gfm** - GitHub Flavored Markdown support
- **react-syntax-highlighter** - Code syntax highlighting
- **react-icons** - Icon library
- **axios** - HTTP client for GitHub API
- **GitHub REST API** - Repository data source

## 📦 Project Structure

```
RepoViz/
├── src/
│   ├── components/
│   │   ├── URLInput.jsx          # URL input form
│   │   ├── ReadmeViewer.jsx      # README display
│   │   ├── FolderTree.jsx        # Folder structure tree
│   │   ├── RepoStats.jsx         # Repository statistics
│   │   └── ExportOptions.jsx     # Export functionality
│   ├── services/
│   │   └── githubAPI.js          # GitHub API integration
│   ├── utils/
│   │   ├── urlParser.js          # URL parsing utilities
│   │   ├── treeGenerator.js      # Tree structure utilities
│   │   └── fileIcons.js          # File type icon mapping
│   ├── App.jsx                   # Main app component
│   ├── App.css                   # Global styles
│   └── main.jsx                  # Entry point
├── index.html                    # HTML template
├── package.json                  # Dependencies
└── vite.config.js               # Vite configuration
```

## 🎨 Features in Detail

### README Viewer
- Full GFM support (tables, task lists, strikethrough)
- Syntax highlighting for code blocks
- Image rendering with lazy loading
- Automatic link handling (opens in new tab)
- Responsive tables

### Folder Structure
- Interactive tree with expand/collapse
- Color-coded file type icons
- File size display
- Auto-expand first 2 levels
- Smooth animations

### Repository Stats
- Owner information with avatar
- Stars, forks, watchers, issues count
- Language breakdown with visual bar
- Last updated date
- License information

### Export Options
- Copy folder structure to clipboard
- Download as text file (ASCII tree)
- Download as JSON
- Visual feedback on actions

## 🌐 API Usage

This app uses the GitHub REST API without authentication:
- **Rate Limit**: 60 requests per hour per IP
- **No authentication required**
- **Public repositories only**

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

Built with ❤️ using React and GitHub API
