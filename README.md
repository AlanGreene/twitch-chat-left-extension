# Twitch chat on left - Chrome Extension

A simple Chrome extension that moves the Twitch chat to the left side of the window in theatre mode, with easy enable/disable functionality.

## Features

- 🎯 Only active on pages matching the Twitch domain
- 🎯 Per-tab toggle - each tab has independent state
- 🔄 One-click toggle on/off (click the extension icon directly)
- 🎨 Visual feedback: icon changes color based on state
- 🔔 Badge notification shows ON/OFF status briefly
- 🧹 Automatic cleanup when disabled (removes injected styles)
- 🔄 Disabled by default - enable per tab as needed

## Installation

1. **Download/Clone this extension folder**

2. **Load the extension in Chrome:**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top-right corner)
   - Click "Load unpacked"
   - Select the `chrome-extension` folder
   - The extension should now appear in your extensions list

3. **Pin the extension (optional):**
   - Click the puzzle piece icon in Chrome's toolbar
   - Find "Twitch chat on left" and click the pin icon

## Usage

1. **Navigate to Twitch**

2. **View a video in theatre mode**

3. **Click the extension icon** in Chrome's toolbar to toggle chat position:
   - **Green icon**: Chat is on the left
   - **Gray icon**: Chat is on the right (default)
   - A badge will briefly appear showing "ON" or "OFF"

4. **Each tab has independent state** - toggling in one tab doesn't affect others

5. **Tabs start disabled by default** - you must enable per tab

6. **State is not persistent** - tabs reset to disabled after browser restart or page reload

**That's it!** No popup, no extra clicks - just click the icon to toggle.

## File Structure

```
chrome-extension/
├── manifest.json             # Extension configuration
├── background.js             # Service worker (handles icon clicks)
├── custom-styles.css         # Your custom CSS styles
├── content.js                # Content script (injection logic)
├── icon16.png                # Extension icon - enabled (16x16)
├── icon48.png                # Extension icon - enabled (48x48)
├── icon128.png               # Extension icon - enabled (128x128)
├── icon16-disabled.png       # Extension icon - disabled (16x16)
├── icon48-disabled.png       # Extension icon - disabled (48x48)
├── icon128-disabled.png      # Extension icon - disabled (128x128)
├── LICENSE                   # License text for the project
└── README.md                 # This file
```

## How It Works

1. **Background Service Worker**: Listens for clicks on the extension icon
2. **State Toggle**: Each click toggles between enabled/disabled state for that specific tab
3. **Visual Feedback**: Icon color changes (green = on, gray = off) with brief badge notification
4. **Per-tab state**: State is stored in memory per-tab (not saved across restarts)
5. **Content Script**: Injects or removes CSS based on current tab's state
6. **Cleanup**: When disabled, removes styles and runs cleanup code

## Troubleshooting

### Styles not applying?

- Make sure you've clicked the icon to enable styles for that specific tab
- Each tab maintains its own state - enabling in one tab doesn't affect others
- Check the browser console for any errors

### Extension not showing up?

- Make sure Developer mode is enabled in `chrome://extensions/`
- Check that all files are in the same folder
- Look for any errors in the extension details page

### Need to reload the extension?

- Go to `chrome://extensions/`
- Click the reload icon on your extension
- Refresh any open tabs with your target domain
- Note: Reloading the extension will reset all tab states to disabled

### Chat displayed on the right after refreshing?

- This is expected behavior - state is not persistent
- Simply click the extension icon again to re-enable for that tab
- Note: Make sure the video is in theatre mode
