# High Determination

A motivational content and articles publishing web app.

## Structure

```
├── index.html          # Homepage — hero, featured articles, topics, newsletter
├── articles.html       # Articles listing with topic filters and search
├── article.html        # Article detail page (loaded dynamically via ?id=)
├── css/
│   └── style.css       # All styles — dark theme with gold accents
└── js/
    ├── articles-data.js  # Article content and daily quotes data
    └── main.js           # UI logic — rendering, filtering, routing
```

## Features

- **Homepage** with hero section, rotating daily quote, featured articles, topic browser, and newsletter signup
- **Articles listing** with topic filter buttons and live search
- **Article detail** pages rendered from a shared data file, with related articles
- **Responsive** design — works on mobile, tablet, and desktop
- **No build step** — pure HTML, CSS, and vanilla JavaScript

## Running Locally

Open `index.html` in your browser, or serve the directory with any static file server:

```bash
npx serve .
# or
python3 -m http.server 8080
```
