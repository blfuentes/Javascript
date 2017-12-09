define(["jquery"], function($) {
  function searchOnWikipedia(searchString) {
    return $.ajax({
      url: `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${searchString}&format=json`,
      jsonp: "callback",
      dataType: "jsonp"
    });
  }

  return searchOnWikipedia;
});
