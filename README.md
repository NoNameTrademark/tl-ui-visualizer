# TL UI Visualizer

This is an experimental project where you can visualize your Throne and Liberty custom UI placements file (.azj) in the web. While the positioning might not be perfect, it gives you a good preview of how your custom UI layout will look in-game before importing.

![TL UI Visualizer Screenshot](https://github.com/user-attachments/assets/d1ad53b4-bca7-4ef8-babc-b97c87e357aa)

## ✨ Features

- 🎮 **Visualize Throne & Liberty UI layouts** from .azj files
- 🌐 **Cross-browser compatibility** with enhanced error handling
- 📱 **Responsive design** that scales to different screen sizes
- 🎛️ **Interactive controls**: Toggle grid, show/hide UI components
- 🔄 **Real-time file import** with drag & drop support
- ⚡ **Performance optimized** with debounced window resizing
- 🛡️ **Enhanced error handling** with user-friendly messages
- 🎨 **Improved visual design** with better styling and animations

## 🚀 Getting Started

### Quick Start
1. Clone the repository:
   ```bash
   git clone https://github.com/NoNameTrademark/tl-ui-visualizer.git
   cd tl-ui-visualizer
   ```

2. Serve the files using any web server:
   ```bash
   # Using Python
   python3 -m http.server 8080
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8080
   ```

3. Open your browser and navigate to `http://localhost:8080`

### GitHub Pages
The application is also hosted on GitHub Pages for easy access without local setup.

## 🎯 Usage

### Loading UI Files
1. **Default Layout**: The app loads a sample UI layout automatically
2. **Import .azj File**: Click the "Import T&L UI File (.azj)" button to load your custom layout
3. **File Validation**: The app validates file format and shows helpful error messages

### Controls
- **Toggle Grid**: Show/hide the alignment grid overlay
- **Show Hidden Items**: Restore any UI components you've hidden by clicking
- **Click Components**: Click any UI component to hide it temporarily

### Browser Compatibility
- ✅ **Chrome/Chromium** (Recommended)
- ✅ **Firefox** 
- ✅ **Edge**
- ✅ **Safari** (Limited testing)

## 🔧 Technical Details

### Browser Requirements
- Modern browser with ES6 module support
- FileReader API support for file importing
- CSS calc() support for responsive positioning

### Features Enhanced in v2
- **Fixed CSS syntax errors** in alignment calculations
- **Added browser compatibility checks** with graceful fallbacks
- **Improved error handling** throughout the application
- **Enhanced file validation** with size limits and format checking
- **Better responsive design** for various screen sizes
- **Reduced duplicate code** and event listeners
- **Added console logging** for debugging and monitoring
- **Improved accessibility** with better focus indicators

### File Format
The application expects Throne & Liberty .azj files with the following structure:
```json
{
  "azulejo": { "version": "1.0" },
  "payload": {
    "reference": { /* UI settings */ },
    "transforms": [ /* UI component positions */ ]
  }
}
```

## 🛠️ Development

### Project Structure
```
tl-ui-visualizer/
├── index.html          # Main application file
├── utils.js            # Utility functions and compatibility checks
├── parser/             # JSON parsing utilities
│   ├── test.json      # Sample UI layout
│   └── parser.js      # Component parsing logic
└── assets/            # Static assets
    └── ui.png         # Project screenshot
```

### Key Components
- **Compatibility Layer**: Checks for browser feature support
- **Error Handling**: Comprehensive error catching and user feedback
- **File Processing**: Robust .azj file parsing and validation
- **UI Rendering**: Dynamic component positioning and styling
- **Event Management**: Optimized event handling with debouncing

## 🚨 Known Limitations

- Positioning may not be 100% accurate compared to in-game display
- Some older browsers may have limited functionality
- Large .azj files (>10MB) are not supported for performance reasons
- Grid alignment is approximate and may not match game precision exactly

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes with proper error handling and compatibility checks
4. Test across different browsers
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Development Guidelines
- Maintain cross-browser compatibility
- Add proper error handling for new features
- Include console logging for debugging
- Test with various .azj file formats
- Follow existing code style and patterns

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [Throne & Liberty Official Site](https://throneandliberty.com/)
- [Report Issues](https://github.com/NoNameTrademark/tl-ui-visualizer/issues)
- [Contribute](https://github.com/NoNameTrademark/tl-ui-visualizer/pulls)

## 📋 Testing Steps

To manually verify the application works correctly:

1. **Load Default Layout**: Verify sample UI components load automatically
2. **Import .azj File**: Test file import with a valid .azj file
3. **Error Handling**: Try importing invalid files (wrong format, too large)
4. **Grid Toggle**: Test grid visibility toggle functionality
5. **Component Interaction**: Click components to hide, then show them again
6. **Responsive Design**: Resize browser window to test scaling
7. **Console Check**: Open developer tools and verify no errors
8. **Cross-Browser**: Test in Chrome, Firefox, Edge, and Safari

---

*Enhanced Compatibility v2 - Improved cross-environment support and stability*