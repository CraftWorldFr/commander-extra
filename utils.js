var fs = require('fs');
var os = require('os');
var path = require('path');

module.exports = {
    fileExists: function(path) {
        try {
            return fs.statSync(path).isFile();
        } catch (e) {
            return false;
        }
    },

    directoryExists: function(path) {
        try {
            return fs.statSync(path).isDirectory();
        } catch (e) {
            return false;
        }
    },

    home: os.homedir(),

    debugMode: process.argv.indexOf('--debug') >= 0 || process.argv.indexOf('-d') >= 0
};
