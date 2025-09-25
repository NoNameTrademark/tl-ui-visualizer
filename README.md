# Throne & Liberty UI Visualizer

A web-based tool for visualizing and customizing your Throne & Liberty UI layout files (.azj). This interactive visualizer allows you to preview your UI configurations before importing them into the game.

![UI Visualizer Screenshot](/assets/ui.png)

## Features

- 🎮 **Interactive UI Preview**: Visualize your Throne & Liberty UI layouts in a web browser
- 📁 **File Import Support**: Load and preview .azj UI configuration files
- 🎯 **Click-to-Hide Elements**: Click on any UI element to hide it from view
- 👁️ **Show Hidden Items**: Restore all hidden elements with a single button
- 🗂️ **Grid Toggle**: Toggle grid overlay for better positioning reference
- 🎨 **Visual Feedback**: Hover effects and tooltips for better user experience
- ⚡ **Real-time Updates**: Immediate visual feedback when loading new configurations

## Quick Start

### Prerequisites
- A modern web browser
- A local web server (Python, Node.js, or any HTTP server)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/NoNameTrademark/tl-ui-visualizer.git
cd tl-ui-visualizer
```

2. Start a local web server:
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

3. Open your browser and navigate to `http://localhost:8000`

## Usage

### Default View
The application loads with a default test configuration showing various UI elements positioned around the screen.

### Importing Your UI Files
1. Click the **"Import T&L UI File (.azj)"** button
2. Select your .azj file from Throne & Liberty
3. The visualizer will load and display your custom UI layout

### Interactive Features
- **Hide Elements**: Click on any UI element to hide it
- **Show Hidden Elements**: Use the "Show Hidden Items" button to restore all hidden elements
- **Toggle Grid**: Use the "Toggle Grid" button to show/hide the positioning grid

### Supported UI Elements
The visualizer supports all major Throne & Liberty UI components including:
- Main Menu, Minimap, Currency Display
- Team Interface, Target Information
- Skill Slots, Inventory Button, Chat Toggle
- And many more UI elements

## File Format

The application expects .azj files with the following structure:
```json
{
  "azulejo": { "version": "1.0" },
  "payload": {
    "reference": {
      "systemResolution": { "width": 1920, "height": 1080 },
      "gameResolution": { "width": 2560, "height": 1440 },
      "viewportScale": 0.8
    },
    "transforms": [
      {
        "componentKey": 108,
        "align": "RightTop",
        "translate": { "x": -20, "y": 20, "z": 0 },
        "desiredSize": { "width": 200, "height": 200 },
        "scale": { "x": 1, "y": 1, "z": 1 }
      }
    ]
  }
}
```

## Technical Details

- **Frontend**: Pure HTML5, CSS3, and ES6 JavaScript
- **No Dependencies**: Runs entirely in the browser
- **Module System**: Uses ES6 modules for code organization
- **Responsive Design**: Scales UI elements based on configuration

## Browser Compatibility

- Chrome/Chromium 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Disclaimer

This tool is not officially affiliated with NCSoft or Throne & Liberty. It's an independent project created to help players visualize their UI configurations.