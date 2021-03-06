var fs = require('fs');
var path = require('path');
var log = require('./log');
var chalk = require('chalk');
var Command = require('commander').Command;
var Config = require('./config');

function commanderExtra(options) {
    var program = new Command(options.name || 'cli');
    require('./loader')(program, options.commandsDir);

    // Initialize cli options
    program
        .version(options.version || '')
        .usage('<command> [options]')
        .option('-d, --debug', 'show debug info');

    // Setup logging
    program.log = log;

    // Setup config file if used
    if (options.hasConfig) {
        program.config = new Config(options.name);
    }

    program.handleError = function handleError(err, exitCode) {
        if (err) {
            if (err.message) {
                program.log.e(err.message);
            } else {
                program.log.e(err);
            }
        }

        process.exit(exitCode || 1);
    };

    program.on('*', function() {
        console.log();
        console.log(chalk.red('  Unknown Command: ') + program.args.join(' '));
        program.help();
    });

    // Process Commands
    program.parse(process.argv);

    if (process.argv.length <= 2) {
        if (typeof options.beforeHelp == 'function') {
            options.beforeHelp();
        }

        program.outputHelp();
    }
}

module.exports = commanderExtra;
