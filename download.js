var archive = require('./helpers/archive-helpers.js')

archive.readListOfUrls(function(urls) {
  archive.downloadUrls(urls);
})
