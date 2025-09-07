/* global chrome */

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ events: [] })
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.type === 'CONTENT_EVENTS') {
    const events = message.payload || []
    chrome.storage.local.set({ events }, () => {
      chrome.runtime.sendMessage({ type: 'EVENTS_UPDATED', payload: events })
    })
    sendResponse({ ok: true })
  }

  if (message?.type === 'GENERATE_WEBCAL') {
    // Placeholder: forward to a backend if configured later
    // For now, just acknowledge
    sendResponse({ ok: true, message: 'WebCal generation not configured' })
  }
  // Return true to indicate async sendResponse possible
  return true
})

