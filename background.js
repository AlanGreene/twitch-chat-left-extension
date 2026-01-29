// Background service worker for handling extension icon clicks

// Store enabled state per tab
const tabStates = new Map();

// Handle extension icon clicks
chrome.action.onClicked.addListener(tab => {
  const tabId = tab.id;
  const currentState = tabStates.get(tabId) || false; // Default to false
  const newState = !currentState;

  // Save the new state for this tab
  tabStates.set(tabId, newState);

  // Update icon for this specific tab
  updateIcon(newState, tabId);

  // Send message to content script in the clicked tab
  chrome.tabs.sendMessage(tabId, {
    action: 'toggleStyles',
    enabled: newState
  }, response => {
    if (chrome.runtime.lastError) {
      console.log('Content script not ready. Changes will apply on next page load.');
    }
  });

  // Show a notification/badge to indicate state change
  chrome.action.setBadgeText({ 
    text: newState ? 'ON' : 'OFF',
    tabId
  });
  chrome.action.setBadgeBackgroundColor({ 
    color: newState ? '#4CAF50' : '#F44336',
    tabId
  });

  // Clear badge after 2 seconds
  setTimeout(() => {
    chrome.action.setBadgeText({ text: '', tabId });
  }, 2000);
});

// Update icon based on enabled state
function updateIcon(isEnabled, tabId) {
  const iconPath = isEnabled ? {
    "16": "icon16.png",
    "48": "icon48.png",
    "128": "icon128.png"
  } : {
    "16": "icon16-disabled.png",
    "48": "icon48-disabled.png",
    "128": "icon128-disabled.png"
  };
  
  chrome.action.setIcon({ path: iconPath, tabId });
  chrome.action.setTitle({ 
    title: isEnabled ? 'Twitch chat on left (enabled)' : 'Twitch chat on left (disabled)',
    tabId
  });
}

// Clean up state when tabs are closed
chrome.tabs.onRemoved.addListener(tabId => {
  tabStates.delete(tabId);
});

// Handle tab updates (like navigation)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // When page finishes loading, update icon based on stored state
  if (changeInfo.status === 'complete') {
    const isEnabled = tabStates.get(tabId) || false;
    updateIcon(isEnabled, tabId);
  }
});

// Handle when user switches tabs - update icon for the active tab
chrome.tabs.onActivated.addListener((activeInfo) => {
  const isEnabled = tabStates.get(activeInfo.tabId) || false;
  updateIcon(isEnabled, activeInfo.tabId);
});

// Respond to queries from content scripts about tab state
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getTabState') {
    const tabId = sender.tab.id;
    const isEnabled = tabStates.get(tabId) || false;
    sendResponse({ enabled: isEnabled });
  }
  return true;
});
