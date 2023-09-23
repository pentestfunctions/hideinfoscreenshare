// ==UserScript==
// @name         Redact Sensitive Information
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Redact predefined sensitive information on webpages
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Define the sensitive information to redact
    const toRedact = {
        phoneNumbers: [
            '123-456-7890',
            '987-654-3210'
            // Add more phone numbers as needed
        ],
        ipAddresses: [
            '192.168.1.1',
            '10.0.0.1'
            // Add more IP addresses as needed
        ],
        emailAddresses: [
            'example@example.com',
            'test@test.com'
            // Add more email addresses as needed
        ]
    };

    // Define the redacted strings
    const redacted = {
        phoneNumber: 'REDACTED@phone.com',
        ipAddress: 'REDACTED@ip.com',
        emailAddress: 'REDACTED@admin.com'
    };

    // Replace the sensitive information with the redacted strings
    function redactInformation() {
        let bodyText = document.body.innerHTML;

        toRedact.phoneNumbers.forEach((phoneNumber) => {
            const regex = new RegExp(phoneNumber, 'g');
            bodyText = bodyText.replace(regex, redacted.phoneNumber);
        });

        toRedact.ipAddresses.forEach((ipAddress) => {
            const regex = new RegExp(ipAddress, 'g');
            bodyText = bodyText.replace(regex, redacted.ipAddress);
        });

        toRedact.emailAddresses.forEach((emailAddress) => {
            const regex = new RegExp(emailAddress, 'g');
            bodyText = bodyText.replace(regex, redacted.emailAddress);
        });

        document.body.innerHTML = bodyText;
    }

    // Run the redactInformation function when the webpage has finished loading
    window.addEventListener('load', redactInformation);
})();
