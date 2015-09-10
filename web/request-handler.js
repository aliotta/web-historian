var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var httpHelper = require("./http-helpers.js");
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  //console.log(req.url);
  filePath = path.join(__dirname, '/public/', req.url);
  console.log(filePath)
  // filenamePath = path.join(__dirname, )
  // path.exists('hi', function(exists) {
  //   if (exists)
  //     httpHelper(res, _assett_, _cb_)
  // })
  if(req.method === "POST"){
    var data = '';
    console.log(req);

    req.on('data', function (chunk){
        data += chunk;
    });

    req.on('end',function(){
      console.log("Our Data " + data + "end")
      httpHelper.postSite(res, data, function(){});
      // var obj = JSON.parse(data);
      //console.log(obj);
      });
  }

  var sitePath = path.join(__dirname, '../archives/sites/', req.url)
  if (req.method === "GET") {
    fs.stat(sitePath, function(err, stat) {
      if(err || stat.isDirectory()){
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
      } else {
        httpHelper.getSite(res, sitePath, function(){  
        });
      }
    });
  }  
    


  // res.end(archive.paths.list);
};
