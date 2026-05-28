# Tip Calculator

A clean, live-updating tip calculator and bill splitter built with vanilla HTML, CSS, and JavaScript.

# How to Run Locally

No build step, no dependencies, no install required.

**Option 1 — Open directly in browser:**

1. Download or clone this repository
2. Open `index.html` in any modern browser

That's it.

**Option 2 — Serve with a local server**

If you have Node.js installed:

```bash
npx serve .
```
Then open `http://localhost:3000` in your browser.

Or with Python:

```bash
# Python 3
python -m http.server 8080
```

Then open `http://localhost:8080`.

**Files needed (keep them in the same folder):**

index.html
style.css
script.js


## Features

- Live calculation: results update as you type, no button click needed
- Preset tip buttons (10%, 15%, 20%, 25%) with a custom % input
- Inline validation with graceful error messages
- Bill split across any number of people
- Rounding policy: per-person amounts always round **up** to the nearest rupees (Rs 0.01) so the group never underpays
- Reset button returns everything to a clean state
- Responsive layout