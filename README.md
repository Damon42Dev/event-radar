# Event Radar - Chrome Extension

A powerful Chrome Extension that extracts event information from web pages and provides seamless calendar integration. Built with React, Material UI, and modern web technologies.

## 🎯 Overview

Event Radar is a Chrome Extension (Manifest V3) that intelligently extracts event details from any webpage and allows users to:

- **Extract Events**: Automatically detect event information (title, date, time, location, description) from web pages
- **Export to Calendar**: Generate `.ics` files for calendar applications
- **WebCal Integration**: Generate webcal:// links for real-time calendar subscriptions
- **Google Calendar**: One-click import to Google Calendar
- **Modern UI**: Clean, responsive interface built with Material UI

## 🛠️ Tech Stack

### Frontend
- **React.js** - Component-based UI framework
- **Material UI (MUI)** - Modern, responsive UI components
- **MobX** - State management
- **Vite** - Fast build tool and development server
- **TypeScript** - Type-safe JavaScript

### Backend (Future)
- **Node.js** - Server-side runtime
- **Express.js** - Web framework
- **ical.js** - Calendar file generation

### Package Manager
- **Yarn** - Fast, reliable dependency management

## 📂 Project Structure

```
event-radar/
├── .cursorrules                 # AI coding standards
├── README.md                   # Project documentation
├── package.json                # Dependencies and scripts
├── yarn.lock                   # Locked dependency versions
├── vite.config.js              # Vite configuration
├── tsconfig.json               # TypeScript configuration
├── .eslintrc.js                # ESLint configuration
├── .prettierrc                 # Prettier configuration
└── extension/                  # Chrome Extension source
    ├── public/
    │   └── manifest.json       # Extension manifest (V3)
    └── src/
        ├── popup/              # Extension popup UI
        │   ├── components/     # React components
        │   ├── pages/          # Page components
        │   └── index.tsx       # Popup entry point
        ├── content/            # Content script
        │   └── index.ts        # Event extraction logic
        ├── background/         # Background script
        │   └── index.ts        # Service worker
        ├── store/              # MobX stores
        │   └── eventStore.ts   # Event state management
        ├── types/              # TypeScript type definitions
        │   └── index.ts        # Shared types
        └── utils/              # Utility functions
            ├── eventExtractor.ts  # Event parsing logic
            └── calendarUtils.ts   # Calendar generation
```

## 🚀 Features

### Core Functionality
- **Smart Event Detection**: Uses regex patterns and AI to extract event information from web pages
- **Real-time Extraction**: Automatically scans current page for events
- **Event Management**: View, edit, and manage extracted events
- **Calendar Export**: Generate and download `.ics` files
- **WebCal Links**: Create shareable calendar subscription links

### UI Features
- **Modern Design**: Clean, Material Design-inspired interface
- **Responsive Layout**: Works on all screen sizes
- **Event Cards**: Beautiful card-based event display
- **Quick Actions**: One-click export and calendar integration
- **Dark/Light Theme**: User preference support

### Technical Features
- **Manifest V3**: Latest Chrome Extension standard
- **TypeScript**: Full type safety
- **MobX State**: Reactive state management
- **Vite Build**: Fast development and optimized production builds
- **ESLint + Prettier**: Code quality and formatting

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- Yarn package manager
- Chrome browser

### Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd event-radar
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Start development server**
   ```bash
   yarn dev
   ```

4. **Build for production**
   ```bash
   yarn build
   ```

5. **Load extension in Chrome**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `dist` folder

## 🔧 Development

### Available Scripts

```bash
# Development
yarn dev          # Start development server
yarn build        # Build for production
yarn preview      # Preview production build

# Code Quality
yarn lint         # Run ESLint
yarn lint:fix     # Fix ESLint issues
yarn format       # Format code with Prettier

# Testing
yarn test         # Run tests
yarn test:watch   # Run tests in watch mode
```

### Code Standards

This project follows strict coding standards defined in `.cursorrules`:

- **TypeScript**: All code must be written in TypeScript
- **Naming**: camelCase for variables/functions, PascalCase for components
- **Async/Await**: Always use async/await instead of .then()
- **Indentation**: 2 spaces
- **Quotes**: Single quotes for strings
- **SOLID Principles**: Follow SOLID, DRY, and KISS principles

## 📋 Usage

### For Users

1. **Install the extension** from Chrome Web Store (when published)
2. **Navigate to any webpage** with event information
3. **Click the extension icon** to open the popup
4. **View extracted events** in the popup interface
5. **Export events** using the available buttons:
   - Download `.ics` file
   - Generate WebCal link
   - Add to Google Calendar

### For Developers

1. **Event Extraction**: Content script automatically scans pages for event data
2. **State Management**: MobX store manages event state across components
3. **Calendar Generation**: Utility functions handle `.ics` file creation
4. **API Integration**: Background script coordinates data flow

## 🔮 Future Roadmap

### Phase 1: Core Extension (Current)
- [x] Project setup and configuration
- [x] Basic event extraction
- [x] Popup UI with Material UI
- [x] MobX state management
- [x] ICS file generation

### Phase 2: Enhanced Features
- [ ] AI-powered event detection
- [ ] Event editing and validation
- [ ] Multiple calendar format support
- [ ] Event categories and tags
- [ ] Bulk operations

### Phase 3: Backend Integration
- [ ] Node.js API server
- [ ] WebCal subscription service
- [ ] User accounts and sync
- [ ] Event sharing and collaboration
- [ ] Analytics and insights

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Follow the coding standards in `.cursorrules`
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Issues**: Report bugs and request features on GitHub Issues
- **Documentation**: Check the `/docs` folder for detailed guides
- **Discussions**: Join GitHub Discussions for questions and ideas

## 🙏 Acknowledgments

- Material UI team for the excellent component library
- Chrome Extensions team for Manifest V3 support
- React and Vite teams for the amazing developer experience
- MobX team for reactive state management

---

**Built with ❤️ for better event management**
