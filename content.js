// Content script that runs on the target domain
// This script injects and removes custom styles based on extension state

(function() {
  'use strict';
  
  const STYLE_ID = 'twitch-chat-position-style-injector';
  
  // Check if extension is enabled and apply styles accordingly
  function applyStyles() {
    // Query the background script for this tab's state
    chrome.runtime.sendMessage({ action: 'getTabState' }, function(response) {
      if (response && response.enabled) {
        injectStyles();
      } else {
        removeStyles();
      }
    });
  }
  
  // Inject the custom stylesheet
  function injectStyles() {
    // Check if styles are already injected
    if (document.getElementById(STYLE_ID)) {
      return;
    }
    
    // Create link element for the stylesheet
    const link = document.createElement('link');
    link.id = STYLE_ID;
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = chrome.runtime.getURL('custom-styles.css');
    
    // Inject into the document
    (document.head || document.documentElement).appendChild(link);
    
    console.log('Custom styles injected');
  }
  
  // Remove the custom stylesheet and clean up
  function removeStyles() {
    const styleElement = document.getElementById(STYLE_ID);
    
    if (styleElement) {
      styleElement.remove();
      console.log('Custom styles removed');
    }
  }

  // Listen for messages from clicking the icon
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'toggleStyles') {
      if (request.enabled) {
        injectStyles();
      } else {
        removeStyles();
      }
      sendResponse({ success: true });
    }
    return true; // Important: keeps the message channel open
  });
  
  // Apply styles on page load
  applyStyles();  
})();
