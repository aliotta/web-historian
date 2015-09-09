var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var httpHelper = require("./http-helpers.js");
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  console.log(req.url);
  filePath = path.join(__dirname, '/public/', req.url);
  console.log(filePath)
  // filenamePath = path.join(__dirname, )
  // path.exists('hi', function(exists) {
  //   if (exists)
  //     httpHelper(res, _assett_, _cb_)
  // })

  fs.stat(filePath, function(err, stat) {
      if (req.url === '/') {
        httpHelper.serveAsset(res, path.join(__dirname, '/public/index.html'), function() {console.log("CALLLBACK")})
      }
      else if(err == null) {
        httpHelper.serveAsset(res, filePath, function() {console.log("CALLLBACK")})
      } 
      else if(err.code == 'ENOENT') {
        console.log("404");
        res.writeHead(404);
        res.end();
      } else {
        console.log('Some other error: ', err.code);
      }
  });

  // res.end(archive.paths.list);
};
