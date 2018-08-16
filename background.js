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
    url: url
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
