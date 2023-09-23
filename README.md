# Redact Sensitive Information UserScript

This UserScript automatically redacts predefined sensitive information on webpages, preventing unintended exposure of sensitive details.

## Description
When enabled, this script will:
- Instantly overlay the webpage with a non-transparent gray layer to obscure the page contents as soon as it starts loading.
- Redact sensitive information based on predefined patterns once the page has finished loading.
- Remove the overlay, revealing the redacted webpage.

## Installation
1. Install a userscript manager extension like Tampermonkey or Greasemonkey on your browser.
2. Create a new userscript and copy-paste the provided script.
3. Save the userscript.

## Customization
You can customize the information to redact by modifying the `toRedact` object in the script. The corresponding redacted strings can be customized in the `redacted` object.

```javascript
const toRedact = {
    phoneNumbers: ['REDACTED@phone.com', 'REDACTED@phone.com'],
    // ... other categories ...
};

const redacted = {
    phoneNumbers: 'REDACTED@phone.com',
    // ... other categories ...
};
```

## Usage
Once installed and active, the script will automatically run on all webpages (`*://*/*`), redacting sensitive information based on the predefined patterns. The page will be obscured by an overlay until the redaction is complete.

## Notes
- This script runs at `document-start`, ensuring the overlay is displayed as early as possible.
- The redaction and overlay removal occur after the `DOMContentLoaded` event to ensure the DOM is available for modification.
- The script also observes the DOM for any changes and applies redaction to newly added elements.


