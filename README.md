# Blind Eye UserScript

This UserScript "Blind Eye" automatically redacts predefined sensitive information on webpages, preventing unintended exposure of sensitive details.

## Description

When enabled, this script will:

- Instantly overlay the webpage with a translucent layer to obscure the page contents as soon as it starts loading.
- Redact sensitive information based on predefined patterns once the page has finished loading.

## Features

- Auto fetches IP, City and state to blacklist

## Installation

1. Install a userscript manager extension like Tampermonkey or Greasemonkey on your browser.
2. Create a new userscript and copy-paste the provided script.
3. Save the userscript.

## Authors

- [Opabinia](https://github.com/pentestfunctions)
- [Credit](https://github.com/opsec-bot)

## Customization

You can customize the information you want to hide by modifying the `sensitiveInfo` object in the script. The corresponding replacement strings can be customized in the `replacementStrings` object.

```javascript
const sensitiveInfo = {
    phoneNumbers: ['123-456-7890', '987-654-3210'],
    ipAddresses: [],
    emailAddresses: ['test@gmail.com', 'test@test.com'],
    usernames: ['jimi.did.it', 'THISSTRINGWILLBEEXCLUDEDIFYOUHAVEITINSTALLED'],
    names: ['John Doe', 'Jane Doe', 'John', 'Jane'],
    city: [],
    state: [],
};

const replacementStrings = {
    phoneNumbers: 'REDACTED@phone.com',
    ipAddresses: 'REDACTED@ip.com',
    emailAddresses: 'REDACTED@admin.com',
    usernames: 'REDACTED_USER',
    names: 'REDACTED_NAME',
    city: 'REDACTED_CITY',
    state: 'REDACTED_STATE',
};
```

## Usage

Once installed and active, the script will automatically run on all webpages (`*://*/*`), redacting sensitive information based on the predefined patterns. The page will be obscured by an overlay until the removal of the sensitive information is complete.

## Notes

- This script runs at `document-start`, ensuring the overlay is displayed as early as possible.
- The redaction and overlay removal occur after the `DOMContentLoaded` event to ensure the DOM is available for modification.