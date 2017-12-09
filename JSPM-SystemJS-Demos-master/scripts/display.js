var $ = require("jquery");

var wikiSearch = require("./search");
var summaryModal = require("./summaryModal");

wikiSearch("JavaScript").then(function(result) {
  if (result && result.query && result.query.search) {
    var html = result.query.search.map(function(item) {
      var encodedSnippetText = escape(item.snippet);
      return `
              <tr>
                <td>
                  <a href="http://en.wikipedia.org/wiki/${item.title}" target="_blank">${item.title}</a>
                </td>
                <td class="snippet">${item.snippet}</td>
                <td><button class="btn btn-link" data-snippet-text="${encodedSnippetText}">View Full Snippet</button></td>
              </tr>`
    });

    $("#articles tbody")
      .html(html)
      .find("button").click(function() {
        var snippetText = $(this).data("snippetText");
        summaryModal.showSummaryModal(snippetText);
      });

  }
});
