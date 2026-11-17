# Architecture

Browser-local login-wall prototype (no build step, no backend).

- `index.html` – markup for the article page, inline login wall, desktop popup and mobile bottom sheet.
- `prototype.css` – styling; login becomes a bottom sheet at widths <= 720px.
- `prototype.js` – state, i18n strings (English/Kannada), simulated mobile/email OTP and Google flows.
- `assets/` – images and logos.

## Recent change
- Marketing-consent checkbox copy changed to "Receive information on our products and ways to support and enjoy our journalism." (EN + KN strings in `prototype.js`, fallback text in `index.html`). Terms line no longer mentions offer updates, so it matches the checkbox. Copy only; no structural change.
