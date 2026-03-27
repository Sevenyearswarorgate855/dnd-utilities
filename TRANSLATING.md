# Translating D20 Tavern

Thanks for helping make D20 Tavern more accessible to more players.

## Where Translations Live

All UI strings currently live in `translations.js`.

Each language uses the same set of keys.

## Current Languages

- `es`
- `en`
- `pt-BR`
- `fr`
- `de`
- `it`

## Adding a New Language

1. Copy one existing language block in `translations.js`
2. Add the new language code as the object key
3. Translate every string in that block
4. Add a matching `<option>` in `index.html`
5. Test the site with `?lang=<your-code>`

## Rules

- Keep the same translation keys across languages
- Preserve placeholders and function parameters
- Keep button labels short enough for mobile screens
- Prefer natural wording over literal translation

## Dynamic Strings

Some keys are functions because they interpolate values, for example:

- roll results
- winner messages
- tie messages
- player placeholders

Do not remove the parameters from those entries.

## Testing

Before opening a pull request:

- Switch to the new language in the UI
- Test with the language query string in the URL
- Check the mobile layout
- Verify solo roll, multiplayer results, and history messages
