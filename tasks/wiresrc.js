'use strict';

var bowerConfig = require('bower-config');
var fs = require('fs');
var path = require('path');
var glob = require('glob');
var _ = require('lodash');
var console = require('winston');
var minimatch = require("minimatch");

function wiresrc(grunt) {

    grunt.registerMultiTask('srcInstall', 'Inject all local components in your HTML file.', function () {

        var files = {},
            sortedFiles = {},
            excludeList = [],
            appPath,
            config;

        this.requiresConfig(['srcInstall', this.target, 'src']);

        config = this.data;

        appPath = path.resolve(grunt.config.get('config').app);

        Object.keys(config.scope).forEach(function (type) {
            // console.info(config.scope[type]);
            config.scope[type].includes.forEach(function (pattern) {
                var paths = grunt.file.expand(path.join(appPath, pattern));
                paths.forEach(function (path) {
                    var excluded;
                    if (config.scope[type].excludes) {
                        config.scope[type].excludes.forEach(function (excludePattern) {
                            // console.info(path.substr(appPath.length), "/" + excludePattern);
                            if (minimatch(path.substr(appPath.length), "/" + excludePattern)) {
                                excluded = true;
                                return;
                            }
                        });
                        if (excluded) {
                            return;
                        }
                    }
                    files[path] = path.substr(appPath.length);
                });
            });
        });

        console.info("Files ot inject : ", _.values(files));

        require('wiresrc').inject(files, config);

    });

}

module.exports = wiresrc;