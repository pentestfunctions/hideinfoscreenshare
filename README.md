# Redact Sensitive Information UserScript

This UserScript redacts predefined sensitive information on webpages, ensuring that sensitive data is anonymized or hidden from view by replacing specific text patterns with redacted strings.

## Features

- **Overlay Display**: Shows a loading overlay while redacting sensitive information.
- **Configurable Redaction**: Easily customize the sensitive information to be redacted and their replacement strings.
- **Efficient and Secure**: Optimized for performance and includes security measures to prevent potential XSS attacks.
- **Modular Design**: Code is organized into reusable functions for maintainability and extensibility.

## Installation

1. Install a UserScript manager:
   - [Tampermonkey](https://www.tampermonkey.net/)
   - [Greasemonkey](https://www.greasespot.net/)
   - [Violentmonkey](https://violentmonkey.github.io/)

2. Click the link below to install the Redact Sensitive Information UserScript. Your UserScript manager should prompt you to install the script automatically.

[Install Redact Sensitive Information UserScript](https://github.com/mop9/Redactor/blob/main/hideinfo.js)

## Usage

Once installed, the UserScript will automatically run on every webpage you visit, redacting predefined sensitive information. A loading overlay will briefly appear while the script processes the page.

### Customization

The script comes with predefined settings for redacting phone numbers, IP addresses, email addresses, usernames, and names. You can customize these settings by editing the `toRedact` and `redacted` objects within the script.

### Example Customization

If you need to redact additional information or change the redacted strings, you can do so by modifying the script:

1. Open your UserScript manager (e.g., Tampermonkey).
2. Find and edit the "Redact Sensitive Information" script.
3. Modify the `toRedact` and `redacted` objects to include your specific needs.

## Contribution

Contributions to improve the script are welcome. Please feel free to fork the repository and submit pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

### Note

Ensure that your UserScript manager is enabled and properly configured to run the script on the desired websites. If you encounter any issues, refer to the documentation of your UserScript manager for troubleshooting tips.
