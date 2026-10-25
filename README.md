# dwello-social

Images for Dwello's Instagram and Facebook posts, made by a weekly Claude scheduled task and queued as drafts in Metricool.

- `templates/` – HTML post templates (1080x1350, rendered with Playwright)
- `posts/` – finished images, named `YYYY-MM-DD-slug.png`
- `posts/log.md` – every post made, so formats and headlines don't repeat
- `brand/logo.png` – the Dwello logo (round badge, transparent corners); templates load it from `../brand/logo.png`, so keep post HTML files one folder deep (e.g. in `templates/`)
