# D20 Tavern

Mobile-first fantasy utility for Dungeons & Dragons, Baldur's Gate, and other tabletop or RPG sessions.

## Overview

D20 Tavern is a lightweight front-end project focused on quick table decisions:

- Solo `d20` rolls
- Multiplayer roll comparison
- Tie detection
- Short session history
- Responsive mobile-first UI
- Built-in language switching for `es`, `en`, and `pt-BR`

The project is intentionally simple right now so it can grow into a broader suite of RPG utilities.

## Features

### Current

- Roll a single `d20`
- Add multiple players and compare results
- Highlight critical rolls and fumbles
- Keep a short in-session roll log
- Switch interface language without reloading

### Planned

- More dice: `d4`, `d6`, `d8`, `d10`, `d12`, `d100`
- Initiative tracker
- HP and effect trackers
- Random decision tools

## Tech Stack

- `HTML`
- `CSS`
- `JavaScript`
- Google Fonts

No framework or build step is required.

## Getting Started

1. Clone the repository.
2. Open `index.html` in your browser.

This structure is already compatible with static hosting such as GitHub Pages.

## Project Structure

```text
.
|-- index.html
|-- styles.css
|-- app.js
`-- README.md
```

## Internationalization

The interface currently supports:

- Spanish (`es`)
- English (`en`)
- Portuguese Brazil (`pt-BR`)

Translations are handled directly in `app.js`, including:

- Static interface copy
- Dynamic result messages
- History entries
- Player labels and placeholders
- Document title and meta description

## Public Repository Notes

If you plan to keep this repository public on GitHub, strong next steps would be:

- Add a screenshot or short GIF to the README
- Publish the site with GitHub Pages
- Add an open source license
- Add a favicon and social preview image
- Split translations into separate files if the project grows

## License

No license has been added yet.

If you want the repository to be reusable by others, the next recommended step is adding a license such as `MIT`.
