chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    id: "quick-translate",
    title: "wanna translate?",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId === "quick-translate" && info.selectionText) {
    const query = encodeURIComponent(info.selectionText);
    const url = `https://translate.google.com/?sl=auto&tl=en&text=${query}&op=translate`;
    chrome.tabs.create({ url });
  }
});
