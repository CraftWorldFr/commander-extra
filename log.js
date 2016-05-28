var fs = require('fs');
var path = require('path');
var colors = require('colors');
var utils = require('./utils');

module.exports = (function () {
    function _log(level, message) {
        message = message || '';

        switch (level) {
            case 'd':
                message = message.cyan;
                level = 'DEBUG';
                break;
            case 'w':
                message = message.yellow;
                level = 'WARNING';
                break;
            case 'e':
                message = message.red;
                level = 'ERROR';
                break;
            case 'i':
                level = 'INFO';
        }

        if (level != 'DEBUG' || utils.debugMode) {
            console.log(message);
        }
    }

    return {
        i: function(message) {
            _log('i', message);
        },
        d: function(message) {
            _log('d', message);
        },
        w: function(message) {
            _log('w', message);
        },
        e: function(message) {
            _log('e', message);
        }
    };
})();
