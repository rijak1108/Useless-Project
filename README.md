# The Useless Button

A small, deliberately useless website built for **Option A: Build a Web Toy** (Web Development / Frontend track).

It's a button that dodges your cursor, mocks you with escalating messages, and only lets you "win" after 30 successful presses — at which point it gives up entirely.

## Tech Stack
- HTML
- CSS
- Vanilla JavaScript (no frameworks, no build step)

## Features / Interactions
1. **Dodge on hover/touch** — the button teleports to a random spot in its stage whenever your cursor (or finger) gets near it.
2. **Click to score** — successful clicks increment a press counter, change the button's label and colors, and update a rotating list of sarcastic messages.
3. **Win state (easter egg)** — reach 30 presses and the button gives up, stops moving, and confetti explodes.
4. **Bonus features included:**
   - Sound effects via the Web Audio API (no external audio files needed)
   - Confetti animation every 10 presses and on the win state
   - Dark mode toggle (persisted across visits via `localStorage`)
   - Best score persisted via `localStorage`
   - Reset button to start over

## Running it locally
No build tools or dependencies required.

1. Download/clone this folder.
2. Open `index.html` directly in any modern browser, **or** serve it locally:
   ```bash
   npx serve .
   ```
   or
   ```bash
   python3 -m http.server
   ```
3. Visit the printed local URL (e.g. `http://localhost:3000`).

## File structure
```
.
├── index.html   # Markup and page structure
├── style.css    # Styling, theming, and animations
├── script.js    # All interaction logic
└── README.md    # This file
```

## Deploying
Any static host works — this repo has zero dependencies. For example:
- **GitHub Pages:** push to a repo, enable Pages on the `main` branch (root).
- **Vercel / Netlify:** import the repo and deploy with default static settings (no build command needed).

## Notes
- Everything is self-contained — no npm install, no external assets, no API keys.
- Progress (best score, theme) is stored in the browser's `localStorage`, so it's per-device/per-browser only.
