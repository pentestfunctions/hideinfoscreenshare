# Redact Sensitive Information Tampermonkey Script

This Tampermonkey script redacts predefined sensitive information, such as phone numbers, IP addresses, and email addresses, from any webpage you visit. This can be useful for maintaining privacy while screen-sharing.

## Installation

1. Install the [Tampermonkey](https://www.tampermonkey.net/) extension for your browser.
2. Open the Tampermonkey Dashboard.
3. Click on the "+" tab to create a new script.
4. Copy and paste the script from hideinfo.js into the editor.
5. Replace the predefined variables in the `toRedact` object with the actual values you want to redact.
6. Save the script by clicking the disk icon or pressing Ctrl + S.

## Usage

Once installed, the script will automatically run on any webpage you visit and redact the specified information.

## Customization

You can customize the redacted strings in the `redacted` object to anything you like.

## Possible Future Improvements

1. **Dynamic Content Handling:**
   - Improve the script to handle websites that load content dynamically using JavaScript.
   - Monitor DOM changes and redact newly added sensitive information in real-time. (Chat windows, change before page load/during rather than after)

2. **User Interface:**
   - Develop a user interface to allow users to easily add, remove, or modify the sensitive information to redact without modifying the script.

3. **Regular Expression Matching:**
   - Instead of looking for exact matches, use regular expressions to redact any match of a certain pattern, like any phone number or email address.

4. **Storage:**
   - Use a secure method to store sensitive information outside the script, such as leveraging browser storage APIs with encryption, to prevent exposure of the sensitive information.

5. **Multiple Redacted Strings:**
   - Allow users to set different redacted strings for different types of information instead of using a single redacted string for all.

6. **Performance Optimization:**
   - Optimize the script for better performance, especially on websites with large amounts of text, by using more efficient text replacement methods.

7. **Exclusion List:**
   - Allow users to specify websites where the script should not run, to prevent interference with the normal functioning of those websites.

8. **Notification:**
   - Notify users when sensitive information has been redacted on a webpage.

9. **Testing:**
   - Develop a robust testing methodology to ensure the script works correctly on various websites and does not break them.

10. **Documentation:**
    - Improve documentation, including detailed installation and usage instructions, customization options, and troubleshooting tips.

## Disclaimer

This script may interfere with the normal functioning of some websites, especially those that use JavaScript to dynamically load content. Be cautious with the information you put in the script and ensure that you are not violating any laws or policies related to privacy and data protection.
