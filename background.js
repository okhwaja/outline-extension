let currentTabIndex = undefined;

function updateCurrentTab() {
  return new Promise((resolve, reject) => {
    const query = {
      active: true,
      currentWindow: true
    }
    browser.tabs.query(query)
      .then((tabs) => {
        if (tabs.length > 0) {
          currentTabIndex = tabs[0].index
          resolve()
        } else {
            reject()
        }
      })
  })
}

function openPage(e) {
  findCurrentUrl(e)
    .then(findOutlineUrl)
    .then(openOutlineUrl)
    .catch(function(err) {
      console.err('Dang, your request failed', err)
    });
}

function openOutlineUrl(url) {
  return browser.tabs.create({
    url: url,
    index: currentTabIndex + 1
  });
}

function findCurrentUrl(event) {
  return Promise.resolve(event.url);
}

function findOutlineUrl(currentUrl) {
  return Promise.resolve(`https://outline.com/${currentUrl}`)

  // harder way...
  // var myRequest = new Request(`https://outlineapi.com/parse_article?source_url=${currentUrl}`);
  // return fetch(myRequest).then(function(response) {
  //   return response.json();
  // }).then(function(res) {
  //   return `https://outline.com/${res.data.short_code}`;
  // });
}

browser.browserAction.onClicked.addListener(openPage);

browser.contextMenus.create({
  id: "open-link-in-outline",
  title: "Open Link in Outline",
  contexts: ["link"]
});

browser.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "open-link-in-outline") {
      updateCurrentTab()
          .then(() =>findOutlineUrl(info.linkUrl))
      .then(openOutlineUrl)
      .catch(function(err) {
        console.err('Dang, your request failed', err)
      });
  }
});
