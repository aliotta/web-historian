var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

var mimeTypes = {
  "html": "text/html",
  "jpeg": "image/jpeg",
  "jpg": "image/jpeg",
  "png": "image/png",
  "js": "text/javascript",
  "css": "text/css",
};

exports.serveAsset = function(res, asset, callback) {
  console.log("ASSET PATH")
  console.log(asset)
  var mimeType = mimeTypes[path.extname(asset).split(".")[1]]
  res.writeHead(200, {'Content-Type' : mimeType})
  var fileStream = fs.createReadStream(asset);
  // var contents = fs.readFileSync(asset).toString();
  // console.log("CONTENTS BELOW");
  // console.log(contents);
  fileStream.pipe(res);
};
