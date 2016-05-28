# commander-extra

A wrapper around [commander.js](https://www.npmjs.com/package/commander)

This wrapper allows you to use commander with an organized folder structure and some helpers.

## Installation

```shell
$ [sudo] npm i commander-extra --save
```

## Usage

Create a file that will be the entry point of your command:

```javascript
var path = require('path');
var commander = require('commander-extra');
var pkg = require(path.join(__dirname, 'package.json'));

var program = commander({
    name: 'my-tool',
    version: pkg.version,
    commandsDir: path.join(__dirname, 'commands'),
    beforeHelp: function() {
        // This will be called before displaying help so you can add anything
    },
    // If this is true then a config file will be created in ~/.my-tool/config
    hasConfig: true
});
```

Then, to create your first command, create a folder `commands` and add a javascript file:

```javascript
module.exports = function makeEvent(program) {
    'use strict';

    program
        .command('hello <mandatory> [optional]')
        .description('Command description')
        .action(function(mandatory, optional, command) {
            program.log.i('Normal output');
            program.log.e('Error');
            program.log.w('Warning');

            // This is only shown if the option -h or --help is used
            program.log.d('Debug info');

            // These need the hasConfig option to be true
            program.config.get('some.config');
            program.config.set('some.config', 'Some value');
            program.config.has('some.config');
        });
};
```

You can then test your command by doing:

```shell
$ node my-tool.js hello john smith
```

## Licence

The MIT License (MIT)

Copyright (c) 2016 Nathan Boiron

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
