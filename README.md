# dwello-social

Images for Dwello's Instagram and Facebook posts, made by a weekly Claude scheduled task and queued as drafts in Metricool.

- `drafts/` – the HTML for each individual post (one folder deep so `../brand/logo.png` resolves)
- `templates/` – HTML templates: feed posts are 1080x1350 PNGs rendered with Playwright; reels (`reel-*.html`) are 1080x1920 animated pages
- `render_reel.py` – turns a reel template into a 15s MP4 plus a `-cover.jpg`: `python3 render_reel.py templates/reel-x.html posts/DATE-slug.mp4`
- `posts/` – finished images, named `YYYY-MM-DD-slug.png`
- `posts/log.md` – every post made, so formats and headlines don't repeat
- `brand/themes.css` – colour themes (t-navy, t-green, t-sun, t-blush, t-mint) and a `center` layout. Every template links it; pick one with `<body class="t-sun center">`. Rotate so no two posts in a row share a theme, alternating dark and light
- `brand/logo.png` – the Dwello logo (round badge, transparent corners); templates load it from `../brand/logo.png`, so keep post HTML files one folder deep (e.g. in `templates/`)
