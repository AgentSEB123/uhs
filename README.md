# Union High School — independent student project

A responsive red-and-black school website concept using HTML, CSS, JavaScript, and a dependency-free Node.js development server. This is not the official school website and is not endorsed by Union High School or Sampson County Schools.

## Develop and build

Requires Node.js 20.11 or later. No package installation is necessary.

```sh
npm start
npm run build
SITE_ROOT=.site npm start
```

The server listens on port 3000 (`PORT` overrides it). The build exports only the public site into `.site/`. Both `/` and `/uhs/` work locally. All deployed asset paths are relative so the site works at a GitHub Pages project URL.

## Verified school content

The official [UHS homepage](https://www.sampson.k12.nc.us/o/uhs) and its public news/calendar feeds were retrieved on **November 3, 2026**. Source URLs, direct service links, article dates, image provenance, and normalized event dates are recorded in [data/sources.json](data/sources.json).

- School address, phone, fax, motto, Spartan identity, and crisis support numbers match the official homepage.
- ClassLink, DESTINY, dining, enrollment, NCEDCloud, SchoolCash Online, transcripts, tech help, Parent Portal, calendars, policy, and survey links point to the services listed by the school. NCEDCloud uses its HTTPS endpoint.
- The November–December 2026 event schedule comes from the school's public calendar, with explicit years and Eastern times. It is a checked snapshot, not a live feed; confirm schedule changes with the school.
- News excerpts link to individual official articles. Older posts retain their dates. The district job fair is labeled as a 2025 event even though the feed's article publication timestamp is January 2026.
- District figures remain clearly labeled as district-wide, not Union-only statistics.
- The Spartan logo and JROTC image are from the official school site and article. They remain the property of their respective owners and are used here for this educational project. Their source URLs are recorded in the source manifest.

## UI and accessibility

Locally hosted Barlow Condensed and DM Sans, authentic school imagery, consistent line icons, direct resource links, responsive navigation, multiword search with empty states, keyboard-accessible audience tabs, event filters, visible keyboard focus, and reduced-motion support.

The earlier design upgrade used [Unslop for Codex](https://github.com/ometere123/unslop-codex/tree/main/skills/unslop), an unofficial adaptation of **Unslop by Damir Sokolovsky** ([@heydamir](https://x.com/heydamir)), originally at [heydamir/unslop](https://github.com/heydamir/unslop), licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Its methodology informed the design; no endorsement is implied. Font licenses are retained in `assets/fonts`.

## GitHub Pages

Live site: https://agentseb123.github.io/uhs/

GitHub reports the active Pages source as **main / (root)**. All page assets use relative paths and the source is already static, so GitHub serves the site without a framework build. `.nojekyll` disables unnecessary Jekyll processing. Future source pushes to `main` update this site through GitHub Pages.

`npm run build` also exports a minimal static copy into `.site/`. A matching `gh-pages` branch was pushed as an alternative deployment artifact; it is not the currently active Pages source. Local screenshots and generated build files are ignored.

## Validation

Browser checks run against the exact static build at `/uhs/`, including local font/image loading, direct service URLs, all selected calendar dates, search and empty results, dialog Escape dismissal, internal navigation, audience tabs and arrow keys, event filtering/reset, mobile navigation, primary-button contrast, and horizontal overflow at 360, 390, 768, 1024, and 1440 pixels. Screenshots are saved locally under `artifacts/pages-desktop.png` and `artifacts/pages-mobile.png`.
