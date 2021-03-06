'use strict';

var fs = require('fs'),
    path = require('path'),
    glob = require('glob'),
    _ = require('lodash'),
    minimatch = require("minimatch");

/**
 * WireSrc export functions to register grunt tasks
 * 
 * @param  {Object} grunt Grunt task manager instance
 * @return {[type]}       [description]
 */
function wiresrc(grunt) {

    grunt.registerMultiTask('srcInstall', 'Inject all local components in your HTML file.', function () {

        var files = {},
            sortedFiles = {},
            excludeList = [],
            appPath,
            prefixPath,
            config;

        this.requiresConfig(['srcInstall', this.target, 'src']);

        config = this.data;
        appPath = config.cwd+'/' || 'app/';
        prefixPath = config.prefixPath || '';

        Object.keys(config.scope).forEach(function (type) {
            config.scope[type].includes.forEach(function (pattern) {
                var paths = grunt.file.expand(path.join(appPath, pattern));
                paths.forEach(function (path) {
                    var excluded;
                    if (config.scope[type].excludes) {
                        config.scope[type].excludes.forEach(function (excludePattern) {
                            if (minimatch(path.substr(appPath.length), excludePattern)) {
                                excluded = true;
                                return;
                            }
                        });
                        if (excluded) {
                            return;
                        }
                    }
                    files[path] = prefixPath+path.substr(appPath.length);
                });
            });
        });

        console.info("Files to inject: ", _.values(files));

        require('wiresrc').inject(files, config);

    });

}

module.exports = wiresrc;
