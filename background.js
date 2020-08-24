function openPage(e) {
  findCurrentUrl(e)
    .then(findOutlineUrl)
    .then(openOutlineUrl)
    .catch(function(err) {
      console.err('Dang, your request failed', err)
    });
}

function currentTab() {
  return Promise.resolve().then(function() {
    const query = {
      active: true,
      currentWindow: true
    }
    return browser.tabs.query(query)
  }).then(function(tabs) {
    if (tabs.length > 0) {
      return tabs[0].index
    }

    throw "No Active Tabs"
  })
}

function openOutlineUrl(url) {
  return currentTab().then(function(currentTabIndex) {
    return browser.tabs.create({
      url: url,
      index: currentTabIndex + 1
    })
  })
}

function findCurrentUrl(event) {
  return Promise.resolve(event.url);
}

async function findOutlineUrl(currentUrl) {
  const request = await fetch(`https://tinyurl.com/api-create.php?url=${currentUrl}`)

  const shortUrl = await request.text();
  return `https://outline.com/${shortUrl}`
}

browser.browserAction.onClicked.addListener(openPage);

browser.contextMenus.create({
  id: "open-in-outline",
  title: "Open in Outline",
  contexts: ["link"]
});

browser.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "open-in-outline") {
      findOutlineUrl(info.linkUrl)
      .then(openOutlineUrl)
      .catch(function(err) {
        console.err('Dang, your request failed', err)
      });
  }
});
