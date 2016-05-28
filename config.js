'use strict';

var fs = require('fs');
var path = require('path');
var log = require('./log');
var fse = require('fs-extra');
var utils = require('./utils');

/**
 * The config file is a simple key=value list
 */
class Config {
    constructor(configDir, defaultConfig) {
        this.directory = path.join(utils.home, '.' + configDir);
        this.file = path.join(this.directory, 'config');
        this.defaultConfig = defaultConfig;

        this.createFile();
    }

    // This will create the config file if needed
    createFile() {
        try {
            fse.ensureDirSync(this.directory);
        } catch(e) {
            if ( e.code != 'EEXIST' ) throw e;
        }

        if (!utils.fileExists(this.file)) {
            fs.writeFileSync(this.file, this.serialize(this.defaultConfig));
            log.d('Created the default config file in ' + this.file);
        }
    }

    loadConfigFromFile(raw) {
        this.createFile();

        var fileContent = fs.readFileSync(this.file, 'utf8');

        if (fileContent === false) {
            log.e('An error occured when creating the default config file');
            process.exit();
        }

        if (raw) {
            return fileContent;
        }

        return this.unserialize(fileContent);
    }

    saveConfigToFile(conf) {
        fs.writeFileSync(this.file, this.serialize(conf));
    }

    get(key, defaultValue) {
        var config = this.loadConfigFromFile();

        if (typeof config[key] == 'undefined') {
            return defaultValue;
        }

        return config[key];
    }

    set(key, value) {
        var config = this.loadConfigFromFile();

        config[key] = value;

        this.saveConfigToFile(config);
    }

    all(raw) {
        if (raw) {
            return this.loadConfigFromFile(true);
        }

        return this.loadConfigFromFile();
    }

    has(key) {
        var config = this.loadConfigFromFile();

        return typeof config[key] != 'undefined';
    }

    serialize(conf) {
        var tmp = [];

        for (var key in conf) {
            if (conf.hasOwnProperty(key)) {
                tmp.push(key + '=' + conf[key]);
            }
        }

        return tmp.join("\n");
    }

    unserialize(conf) {
        var values = conf.split("\n");

        var out = {};

        // A config line looks like this:
        // example.of.key=some value
        for (var i = 0; i < values.length; i++) {
            if (values[i].length == 0) {
                continue;
            }

            values[i] = values[i].split('=');

            out[values[i][0]] = values[i][1] || '';
        }

        return out;
    }
}

module.exports = Config;
