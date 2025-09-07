# Web Event to Calendar

Monorepo with Chrome Extension (MV3) and a lightweight WebCal backend.

## Projects

- extension: Chrome Extension (React + Vite + MUI + MobX)
- server: Node.js backend (Express + ics)

## Getting Started

1) Install deps

```
cd extension && yarn && cd ../server && yarn
```

2) Start backend

```
cd server && yarn start
```

3) Build extension

```
cd extension && yarn build
```

4) Load in Chrome

- Open chrome://extensions
- Enable Developer mode
- Load unpacked → select `extension/dist`

## Popup

- Extracted events are shown as cards
- Buttons: Export ICS, Generate WebCal link, Add to Google Calendar

## Backend API

- POST /generate-ics → returns `{ id, url, webcal }`
- GET /calendar/:id.ics → serves ICS file

## Dev Notes

- Vite uses CRX plugin; manifest in `public/manifest.json`
- Content script scans page text with regex heuristics
- Background stores events in `chrome.storage.local`
