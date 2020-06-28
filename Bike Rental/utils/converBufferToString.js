var dataUri = require('datauri');
var path = require('path')
var dataURIChild = new dataUri();

module.exports = function(originalName, buffer){
    var extension = path.extname(originalName);
    return dataURIChild.format(buffer).content;
    
}