var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var utils = require('./utils');

module.exports = (function () {
    function _log(level, message) {
        message = message || '';

        switch (level) {
            case 'd':
                message = chalk.cyan(message);
                level = 'DEBUG';
                break;
            case 'w':
                message = chalk.yellow(message);
                level = 'WARNING';
                break;
            case 'e':
                message = chalk.red(message);
                level = 'ERROR';
                break;
            case 's':
                message = chalk.green(message);
                level = 'SUCCESS';
                break;
            case 'i':
                level = 'INFO';
        }

        if (level != 'DEBUG' || !utils.debugMode) {
            console.log(message);
        } else if (utils.debugMode) {
            console.log('[' + level + '] ' + message);
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
        },
        s: function(message) {
            _log('s', message);
        }
    };
})();
