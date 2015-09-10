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

exports.setMime = function(res, mime) {
  res.writeHead(200, {'Content-Type' : mime})
};

exports.serveAsset = function(res, asset, callback) {
  var mimeType = mimeTypes[path.extname(asset).split(".")[1]]
  res.writeHead(200, {'Content-Type' : mimeType})
  var fileStream = fs.createReadStream(asset);
 
  fileStream.pipe(res);
};

exports.getSite = function(res, sitePath, callback) {
  console.log("Site Name " + sitePath)

  fs.readFile(sitePath, function(err, data){
    if(err){
      console.log("Error")
      res.writeHead(404)
      res.end();
    } else{
      res.end(data.toString());
    }
  })
}

exports.postSite = function(res, url, callback){
  archive.isUrlInList(url, function(is) {
    if (is) {
      archive.isUrlArchived(url, function(is) {
        if (is) {
          res.end(url);
        }
        else {
          res.end('redirect.html');
        }
      })
    }
    else {
      fs.appendFile(archive.paths.list, url + "\n", function (err) {
        if(err){
          res.end("FAIL");
          console.log("failed to append data")
        } else {
          res.writeHead(302);
          res.end('redirect.html')
          // res.end("success");
          console.log("Successful Append")
        }
      });
    }
  })
}