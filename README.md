# 🚀 Page Pilot — Smart Browser Toolkit

**Page Pilot** is a multifunctional browser extension that combines productivity, customization, and AI-powered features in one sleek tool. Built for both **Chrome** and **Firefox**, Page Pilot enhances your browsing experience with:

- 🌓 Dark Mode Toggle  
- 📊 Word Counter  
- 🎯 Focus Mode  
- 📸 Screenshot Capture  
- 🧠 AI Chat Assistant (powered by OpenRouter)  
- 🧹 Tab Grouping & Ungrouping  
- 🌐 Translator (Coming Soon)

---

## 🧰 Tech Stack

- **JavaScript** — Core logic and extension functionality
- **HTML/CSS** — Popup UI and styling
- **Chrome Extensions API**
- **Firefox WebExtensions API (via Manifest v2)**
- **OpenRouter API** — AI chatbot integration

---

## 📦 Features Breakdown

| Feature            | Description                                                                 |
|-------------------|-----------------------------------------------------------------------------|
| **Dark Mode**      | Inverts the page colors for eye comfort during night reading                |
| **Word Counter**   | Counts visible words on the current webpage                                |
| **Focus Mode**     | Removes ads, sidebars, headers/footers to enhance focus                     |
| **Screenshot Tool**| Captures and downloads the visible portion of the tab as a PNG              |
| **Tab Grouping**   | Groups tabs by domain automatically and colors them                         |
| **AI Assistant**   | Chat with an assistant using [OpenRouter](https://openrouter.ai/) API       |
| **Translator**     | *(Coming Soon)* Translate selected text instantly                          |

---

## 🧪 How to Install

### 🔗 For Chrome

1. Open `chrome://extensions`
2. Enable **Developer Mode**
3. Click **“Load Unpacked”**
4. Select the folder containing your extension (must include `manifest.json`)

---

### 🦊 For Firefox

#### ⚙️ Temporary Install (for development)
1. Open `about:debugging#/runtime/this-firefox`
2. Click **“Load Temporary Add-on”**
3. Select any file from your extension folder (e.g., `manifest.json`)

⚠️ This will uninstall on browser restart. To keep it:

#### 🧾 Permanent Install (Signed)
1. Zip your extension files
2. Go to [addons.mozilla.org/developers](https://addons.mozilla.org/developers)
3. Log in → Submit a new add-on
4. Upload your `.zip` to get a signed `.xpi` file
5. Drag and drop the `.xpi` into Firefox or install manually

---

## 🔐 API Key Note

For the AI chat assistant to work:
- Replace `OR_KEY` in `popup.js` with your personal key from [OpenRouter](https://openrouter.ai/)

```js
const OR_KEY = "sk-or-...";
