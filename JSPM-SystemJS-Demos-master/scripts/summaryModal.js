import $ from "bootstrap";

export function showSummaryModal(text) {
  var modalWindow = $("#snippetModal");

  modalWindow.find(".modal-body")
    .html(unescape(text));
  modalWindow.modal("show");
}
