// ==UserScript==
// @name         Redact Sensitive Information
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Redact predefined sensitive information on webpages
// @author       You
// @match        *://*/*
// @grant        none
// @run-at       document-start
// ==/UserScript==


(function() {
    'use strict';

    // Create an overlay element
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.backgroundColor = 'gray'; // Non-transparent gray
    overlay.style.zIndex = '1000000'; // High z-index to cover everything
    overlay.innerHTML = '<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center;">' +
                        '<div class="spinner" style="margin: 20px auto; width: 40px; height: 40px; position: relative;">' +
                        '<div style="box-sizing: border-box; display: block; position: absolute; width: 32px; height: 32px; margin: 8px; border: 8px solid #fff; border-radius: 50%; animation: spinner 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite; border-color: #000 transparent transparent transparent;"></div>' +
                        '</div>' +
                        '<p style="color: #fff; font-size: 18px;">Redacting...</p>' +
                        '</div>';
    document.body.appendChild(overlay); // Append overlay immediately when the script runs

    // Define the spinner animation
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '@keyframes spinner {0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); }}';
    document.getElementsByTagName('head')[0].appendChild(style);

    // Define the sensitive information to redact
    const toRedact = {
        phoneNumbers: ['REDACTED@phone.com', 'REDACTED@phone.com'],
        ipAddresses: ['REDACTED@ip.com', 'REDACTED@ip.com'],
        emailAddresses: ['REDACTED@admin.com', 'REDACTED@admin.com'],
        usernames: ['REDACTED_USER', 'REDACTED_USER'],
        names: ['REDACTED_NAME', 'REDACTED_NAME', 'REDACTED_NAME', 'REDACTED_NAME']
    };

    // Define the redacted strings
    const redacted = {
        phoneNumbers: 'REDACTED@phone.com',
        ipAddresses: 'REDACTED@ip.com',
        emailAddresses: 'REDACTED@admin.com',
        usernames: 'REDACTED_USER',
        names: 'REDACTED_NAME'
    };

    function redactText(text) {
        let redactedText = text;
        Object.keys(toRedact).forEach(category => {
            toRedact[category].forEach(item => {
                const regex = new RegExp(item, 'gi'); // Case insensitive matching
                redactedText = redactedText.replace(regex, redacted[category]);
            });
        });
        return redactedText;
    }

    function redactNode(node) {
        // Preserve user selection
        const selection = window.getSelection();
        const range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;

        if (node.nodeType === Node.TEXT_NODE) {
            node.nodeValue = redactText(node.nodeValue);
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            if (node.tagName === 'INPUT' || node.tagName === 'TEXTAREA') {
                node.value = redactText(node.value);
            }
            for (const child of node.childNodes) {
                redactNode(child);
            }
        }

        // Restore user selection
        if (range) {
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }

    // Run the redactNode function when the webpage has finished loading
    window.addEventListener('load', () => {
        redactNode(document.body);
        document.body.removeChild(overlay); // Remove overlay after initial redaction

        // Watch for changes in the DOM and apply redaction as necessary
        new MutationObserver(() => redactNode(document.body))
            .observe(document.body, {childList: true, subtree: true});
    });
})();
