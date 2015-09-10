var fs = require('fs');
var path = require('path');
var _ = require('underscore');

var spawn = require('child_process').spawn;
function shspawn(command) {
  spawn('sh', ['-c', command], { stdio: 'inherit' });
} 
/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(cb) {
  cb(fs.readFileSync(exports.paths.list).toString().split('\n'))
};

exports.isUrlInList = function(url, cb) {

  exports.readListOfUrls(function(urls){
    cb(urls.indexOf(url) > -1);
  })
};

exports.addUrlToList = function(url, cb) {
  fs.appendFile(exports.paths.list, url + "\n", function(){
    cb();
  })
};

exports.isUrlArchived = function(url, cb) {
 cb(fs.readdirSync(exports.paths.archivedSites).indexOf(url) > -1)
};

exports.downloadUrls = function(urls) {
  //takes an array of urls
  
  for (var i = 0; i < urls.length; i++) {
    shspawn('curl ' + urls[i] + ' > ' + path.join(exports.paths.archivedSites, urls[i]));
  }
};
