document.addEventListener('DOMContentLoaded', () => {
  const OR_KEY = "your_api_key";

  // === AI Chat ===
  const orSendBtn = document.getElementById('orSendBtn');
  if (orSendBtn) {
    orSendBtn.addEventListener('click', async () => {
      const promptInput = document.getElementById('orPrompt');
      const prompt = promptInput.value.trim();
      const chatWindow = document.getElementById('orChatWindow');

      if (!prompt) return;

      // User message bubble
      const userBubble = document.createElement('div');
      userBubble.className = 'chat-bubble user-msg';
      userBubble.textContent = prompt;
      chatWindow.appendChild(userBubble);

      promptInput.value = '';
      chatWindow.scrollTop = chatWindow.scrollHeight;

      // Bot loading bubble
      const botBubble = document.createElement('div');
      botBubble.className = 'chat-bubble bot-msg';
      botBubble.textContent = 'Thinking...';
      chatWindow.appendChild(botBubble);
      chatWindow.scrollTop = chatWindow.scrollHeight;

      try {
        const resp = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${OR_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: "mistralai/mistral-7b-instruct:free",
            messages: [
              { role: "system", content: "You are a helpful assistant." },
              { role: "user", content: prompt }
            ]
          })
        });

        const data = await resp.json();
        const msg = data.choices?.[0]?.message?.content || "No response.";
        botBubble.textContent = msg;
      } catch (err) {
        console.error(err);
        botBubble.textContent = "Error fetching response.";
      }

      chatWindow.scrollTop = chatWindow.scrollHeight;
    });
  }

  // === Dark Mode ===
  const darkToggle = document.getElementById('darkModeToggle');
  if (darkToggle) {
    darkToggle.addEventListener('change', () => {
      chrome.tabs.executeScript({ code: '(' + toggleDarkMode.toString() + ')();' });
    });
  }

  // === Word Count ===
  const wordToggle = document.getElementById('wordCountToggle');
  if (wordToggle) {
    wordToggle.addEventListener('change', (e) => {
      if (e.target.checked) {
        chrome.tabs.executeScript({ code: '(' + countWords.toString() + ')();' }, (results) => {
          const count = results?.[0] ?? 0;
          document.getElementById('result').textContent = `Words: ${count}`;
        });
      } else {
        document.getElementById('result').textContent = '';
      }
    });
  }

  // === Focus Mode ===
  const focusToggle = document.getElementById('focusToggle');
  if (focusToggle) {
    focusToggle.addEventListener('change', () => {
      chrome.tabs.executeScript({ code: '(' + toggleFocusMode.toString() + ')();' });
    });
  }

  // === Group Tabs ===
  const groupTabsBtn = document.getElementById('groupTabsBtn');
  if (groupTabsBtn) {
    groupTabsBtn.addEventListener('click', () => {
      chrome.tabs.query({}, (tabs) => {
        const domainGroups = {};

        tabs.forEach((tab) => {
          try {
            const url = new URL(tab.url);
            const domain = url.hostname;
            if (!domainGroups[domain]) {
              domainGroups[domain] = [];
            }
            domainGroups[domain].push(tab.id);
          } catch (err) {
            console.warn(`Skipping invalid tab: ${tab.url}`);
          }
        });

        const groupColors = [
          "blue", "red", "yellow", "green", "pink", "purple", "orange", "cyan"
        ];

        Object.keys(domainGroups).forEach((domain, index) => {
          chrome.tabs.group({ tabIds: domainGroups[domain] }, (groupId) => {
            chrome.tabGroups.update(groupId, {
              title: domain,
              color: groupColors[index % groupColors.length]
            });
          });
        });
      });
    });
  }

  // === Ungroup Tabs ===
  const ungroupTabsBtn = document.getElementById('ungroupTabsBtn');
  if (ungroupTabsBtn) {
    ungroupTabsBtn.addEventListener('click', () => {
      chrome.tabs.query({}, (tabs) => {
        const groupedTabIds = tabs.filter(tab => tab.groupId !== -1).map(tab => tab.id);

        if (groupedTabIds.length > 0) {
          chrome.tabs.ungroup(groupedTabIds, () => {
            console.log("Tabs ungrouped.");
          });
        } else {
          console.log("No grouped tabs to ungroup.");
        }
      });
    });
  }

  // === Screenshot ===
  const screenshotBtn = document.getElementById('screenshotBtn');
  if (screenshotBtn) {
    screenshotBtn.addEventListener('click', () => {
      chrome.tabs.captureVisibleTab(null, { format: 'png' }, (dataUrl) => {
        if (chrome.runtime.lastError) {
          alert("Screenshot Error: " + chrome.runtime.lastError.message);
          console.error("Screenshot failed:", chrome.runtime.lastError.message);
          return;
        }

        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = 'screenshot.png';
        a.click();

        const preview = document.getElementById('screenshotPreview');
        if (preview) {
          preview.src = dataUrl;
          preview.style.display = 'block';
        }
      });
    });
  }

  // === Injected Functions ===
  function toggleDarkMode() {
    const styleId = 'injected-dark-mode-style';
    let style = document.getElementById(styleId);
    if (style) {
      style.remove();
    } else {
      style = document.createElement('style');
      style.id = styleId;
      style.innerHTML = `
        html {
          filter: invert(1) hue-rotate(180deg);
          background: #111 !important;
        }
        img, video {
          filter: invert(1) hue-rotate(180deg) !important;
        }
      `;
      document.head.appendChild(style);
    }
  }

  function countWords() {
    const bodyText = document.body.innerText || '';
    const words = bodyText.match(/\b\w+\b/g);
    return words ? words.length : 0;
  }

  function toggleFocusMode() {
    const id = 'focus-mode-style';
    let style = document.getElementById(id);
    if (style) {
      style.remove();
    } else {
      style = document.createElement('style');
      style.id = id;
      style.innerHTML = `
        header, footer, nav, aside, [class*="sidebar"], [id*="sidebar"], [class*="ads"], [id*="ads"] {
          display: none !important;
        }
        main, article {
          max-width: 800px;
          margin: auto;
          font-size: 1.1em;
          line-height: 1.6;
        }
        body {
          background: #f4f4f4 !important;
          color: #222 !important;
        }
      `;
      document.head.appendChild(style);
    }
  }
});
