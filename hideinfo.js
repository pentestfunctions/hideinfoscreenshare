// ==UserScript==
// @name         Blind eye
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Remove sensitive information on websites and prevent leakages!
// @author       Robot
// @match        *://*/*
// @grant        GM_xmlhttpRequest
// @run-at       document-start
// ==/UserScript==

(function () {
  "use strict";

  const whitelistedSites = ["duckduckgo.com"]; // add domains here to whitelist

  if (whitelistedSites.includes(window.location.hostname)) {
    return;
  }

  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100vw";
  overlay.style.height = "100vh";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
  overlay.style.backdropFilter = "blur(10px)";
  overlay.style.zIndex = "1000000";
  overlay.innerHTML =
    '<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: #383A40; padding: 20px; border-radius: 20px; text-align: center;">' +
    '<div class="spinner-box" style="margin-bottom: 20px;">' +
    '<div style="margin: 0 auto; width: 40px; height: 40px; position: relative;">' +
    '<div style="box-sizing: border-box; display: block; position: absolute; width: 32px; height: 32px; margin: 4px; border: 4px solid #000; border-radius: 50%; animation: spinner 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite; border-color: #fff transparent transparent transparent;"></div>' +
    "</div>" +
    "</div>" +
    '<p style="color: #fff; font-size: 18px;">Removing leaked information</p>' +
    "</div>";
  document.documentElement.appendChild(overlay);

  const style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML =
    "@keyframes spinner {0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); }}";
  document.head.appendChild(style);

  const sensitiveInfo = {
    phoneNumbers: ["123-456-7890", "987-654-3210"],
    ipAddresses: [],
    emailAddresses: ["test@gmail.com", "test@test.com"],
    usernames: ["jimi.did.it", "THISSTRINGWILLBEEXCLUDEDIFYOUHAVEITINSTALLED"],
    names: ["John Doe", "Jane Doe", "John", "Jane"],
    city: [],
    state: [],
  };

  const replacementStrings = {
    phoneNumbers: "REDACTED@phone.com",
    ipAddresses: "REDACTED@ip.com",
    emailAddresses: "REDACTED@admin.com",
    usernames: "REDACTED_USER",
    names: "REDACTED_NAME",
    city: "REDACTED_CITY",
    state: "REDACTED_STATE",
  };

  function redactText(text) {
    let redactedText = text;
    Object.keys(sensitiveInfo).forEach((category) => {
      sensitiveInfo[category].forEach((item) => {
        const regex = new RegExp(item, "gi");
        redactedText = redactedText.replace(
          regex,
          replacementStrings[category]
        );
      });
    });
    return redactedText;
  }

  function fetchLocationFromIP(ip) {
    return new Promise((resolve, reject) => {
      fetch(`https://ipapi.co/${ip}/json/`)
        .then((response) => response.json())
        .then((data) => {
          const city = data.city;
          const state = data.region;
          if (city && state) {
            sensitiveInfo.city.push(city);
            sensitiveInfo.state.push(state);
            resolve();
          } else {
            reject("City or state not found");
          }
        })
        .catch((error) => reject(error));
    });
  }

  function getPublicIP() {
    return new Promise((resolve, reject) => {
      fetch("https://api64.ipify.org?format=json")
        .then((response) => response.json())
        .then((data) => {
          const publicIP = data.ip;
          if (publicIP) {
            sensitiveInfo.ipAddresses.push(publicIP);
            fetchLocationFromIP(publicIP)
              .then(() => {
                redactNode(document.body);
                document.documentElement.removeChild(overlay);
                resolve(publicIP);
              })
              .catch((error) => reject(error));
          } else {
            reject("No public IP found");
          }
        })
        .catch((error) => reject(error));
    });
  }

  function redactNode(node) {
    const selection = window.getSelection();
    const range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;

    if (node.nodeType === Node.TEXT_NODE) {
      node.nodeValue = redactText(node.nodeValue);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      if (node.tagName === "INPUT" || node.tagName === "TEXTAREA") {
        node.value = redactText(node.value);
      }
      for (const child of node.childNodes) {
        redactNode(child);
      }
    }

    if (range) {
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }

  window.addEventListener("load", () => {
    getPublicIP().catch((error) => {
      console.error("Error fetching or redacting IP:", error);
      redactNode(document.body);
      document.documentElement.removeChild(overlay);
    });
  });
})();
