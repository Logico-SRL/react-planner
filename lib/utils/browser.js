'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.browserDownload = browserDownload;
exports.browserUpload = browserUpload;
function browserDownload(json) {
  var fileOutputLink = document.createElement('a');

  var filename = 'output' + Date.now() + '.json';
  if (typeof window != 'undefined') filename = window.prompt('Insert output filename', filename);
  if (!filename) return;

  var output = JSON.stringify(json);
  var data = new Blob([output], { type: 'text/plain' });
  var url = typeof window != 'undefined' ? window.URL.createObjectURL(data) : '';
  fileOutputLink.setAttribute('download', filename);
  fileOutputLink.href = url;
  fileOutputLink.style.display = 'none';
  document.body.appendChild(fileOutputLink);
  fileOutputLink.click();
  document.body.removeChild(fileOutputLink);
}

function browserUpload() {
  return new Promise(function (resolve, reject) {

    var fileInput = document.createElement('input');
    fileInput.type = 'file';

    fileInput.addEventListener('change', function (event) {
      var file = event.target.files[0];
      var reader = new FileReader();
      reader.addEventListener('load', function (fileEvent) {
        var loadedData = fileEvent.target.result;
        resolve(loadedData);
      });
      reader.readAsText(file);
    });

    fileInput.click();
  });
}