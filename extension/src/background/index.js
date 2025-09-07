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
    const events = message.payload || []
    const backendBase = (typeof importMeta !== 'undefined' && importMeta.env?.VITE_BACKEND_BASE) || (typeof import.meta !== 'undefined' && import.meta.env?.VITE_BACKEND_BASE) || 'http://localhost:3000'
    fetch(`${backendBase}/generate-ics`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(events)
    })
      .then((r) => r.json())
      .then((data) => {
        sendResponse({ ok: true, ...data })
      })
      .catch((err) => {
        sendResponse({ ok: false, error: err?.message || 'Request failed' })
      })
  }
  // Return true to indicate async sendResponse possible
  return true
})

