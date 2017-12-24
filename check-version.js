#!/usr/bin/env node
'use strict';

var _semver = require('semver');

var _semver2 = _interopRequireDefault(_semver);

var _package = require('./package');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var version = _package.engines.node;
if (!_semver2.default.satisfies(process.version, version)) {
  var warn = 'Required node version ' + version + ' ';
  warn += 'not satisfied with current version ' + process.version + '.';
  console.log(warn);
  process.exit(1);
}

