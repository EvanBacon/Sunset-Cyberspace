/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * Note: This is a fork of the fb-specific transform.js
 *
 */
'use strict';

/**
 * [Expo] This transformer was based on React Native's transformer with the
 * following changes:
 *   - Makes the packager use react-native-lab's copy of react-native
 *   - Rewrites the paths of this module's dependencies so we load the
 *     dependencies from react-native-lab's copy of react-native, to simulate
 *     if we hadn't forked the transformer at all
 */

const fs = require('fs');
const path = require('path');

let moduleBasePath = '';
let isLinked = false;
const rootPath = path.resolve('.');
const nodeModulePath = path.join(rootPath, 'node_modules');
const reactNativeModulePath = path.join(nodeModulePath, 'react-native');
const stats = fs.lstatSync(reactNativeModulePath);
if (stats.isSymbolicLink()) {
  isLinked = true;
  moduleBasePath = path.join(reactNativeModulePath, 'node_modules') + path.sep;
}

const babel = require(moduleBasePath + 'babel-core');
const crypto = require('crypto');
const externalHelpersPlugin = require(moduleBasePath + 'babel-plugin-external-helpers');
const generate = require(moduleBasePath + 'babel-generator').default;
const inlineRequiresPlugin = require(moduleBasePath + 'babel-preset-fbjs/plugins/inline-requires');
const makeHMRConfig = require(moduleBasePath + 'babel-preset-react-native/configs/hmr');
const resolvePlugins = require(moduleBasePath + 'babel-preset-react-native/lib/resolvePlugins');

const { compactMapping } = require(moduleBasePath + 'metro-bundler/src/Bundler/source-map');

const cacheKeyParts = [
  fs.readFileSync(__filename),
  require(moduleBasePath + 'babel-plugin-external-helpers/package.json').version,
  require(moduleBasePath + 'babel-preset-fbjs/package.json').version,
  require(moduleBasePath + 'babel-preset-react-native/package.json').version,
];

const EXPO_REACT_NATIVE_PATH = isLinked
  ? path.join(process.env.EXPO_UNIVERSE_DIR, 'react-native-lab', 'react-native')
  : reactNativeModulePath;
if (!fs.existsSync(EXPO_REACT_NATIVE_PATH)) {
  throw new Error(
    `Expo copy of React Native could not be found. Are you sure it exists at: ${EXPO_REACT_NATIVE_PATH}?`
  );
}
let EXPO_REACT_PATH = isLinked
  ? path.join(EXPO_REACT_NATIVE_PATH, 'node_modules/react')
  : path.join(nodeModulePath, 'react');
if (!fs.existsSync(EXPO_REACT_PATH)) {
  throw new Error(
    `React Native's "react" peer could not be found. Are you sure it exists at: ${EXPO_REACT_PATH}?`
  );
}

/**
 * Return a memoized function that checks for the existence of a
 * project level .babelrc file, and if it doesn't exist, reads the
 * default RN babelrc file and uses that.
 */
const getBabelRC = (function() {
  let babelRC = null;

  return function _getBabelRC(projectRoot) {
    if (babelRC !== null) {
      return babelRC;
    }

    babelRC = { plugins: [] };

    // Let's look for the .babelrc in the project root.
    // In the future let's look into adding a command line option to specify
    // this location.
    let projectBabelRCPath;
    if (projectRoot) {
      projectBabelRCPath = path.resolve(projectRoot, '.babelrc');
    }

    // If a .babelrc file doesn't exist in the project,
    // use the Babel config provided with react-native.
    if (!projectBabelRCPath || !fs.existsSync(projectBabelRCPath)) {
      babelRC = {
        presets: [require('babel-preset-react-native')],
        plugins: [],
      };

      // Require the babel-preset's listed in the default babel config
      // $FlowFixMe: dynamic require can't be avoided
      babelRC.presets = babelRC.presets.map(preset => require('babel-preset-' + preset));
      babelRC.plugins = resolvePlugins(babelRC.plugins);
    } else {
      // if we find a .babelrc file we tell babel to use it
      babelRC.extends = projectBabelRCPath;
    }

    return babelRC;
  };
})();

/**
 * Given a filename and options, build a Babel
 * config object with the appropriate plugins.
 */
function buildBabelConfig(filename, options) {
  const babelRC = getBabelRC(options.projectRoot);

  const extraConfig = {
    // [Expo] We add the module resolver plugin (as a preset) to make sure
    // we're looking up peer deps (like react-native and react) in the
    // right place
    presets: [...(babelRC.presets || []), buildModuleResolverPreset()],
    // [Expo] When running in universe, we don't want to disable
    // babelRC lookup for dependencies
    babelrc: false,
    code: false,
    filename,
  };

  let config = Object.assign({}, babelRC, extraConfig);

  // Add extra plugins
  const extraPlugins = [externalHelpersPlugin];

  var inlineRequires = options.inlineRequires;
  var blacklist = typeof inlineRequires === 'object' ? inlineRequires.blacklist : null;
  if (inlineRequires && !(blacklist && filename in blacklist)) {
    extraPlugins.push(inlineRequiresPlugin);
  }

  config.plugins = extraPlugins.concat(config.plugins);

  if (options.dev && options.hot) {
    const hmrConfig = makeHMRConfig(options, filename);
    config = Object.assign({}, config, hmrConfig);
  }

  return Object.assign({}, babelRC, config);
}

function transform({ filename, options, src }) {
  options = options || { platform: '', projectRoot: '', inlineRequires: false };

  const OLD_BABEL_ENV = process.env.BABEL_ENV;
  process.env.BABEL_ENV = options.dev ? 'development' : 'production';

  try {
    const babelConfig = buildBabelConfig(filename, options);
    const { ast, ignored } = babel.transform(src, babelConfig);

    if (ignored) {
      return {
        ast: null,
        code: src,
        filename,
        map: null,
      };
    } else {
      const result = generate(
        ast,
        {
          comments: false,
          compact: false,
          filename,
          retainLines: !!options.retainLines,
          sourceFileName: filename,
          sourceMaps: true,
        },
        src
      );

      return {
        ast,
        code: result.code,
        filename,
        map: options.generateSourceMaps ? result.map : result.rawMappings.map(compactMapping),
      };
    }
  } catch (e) {
    console.error(e);
    throw e;
  } finally {
    process.env.BABEL_ENV = OLD_BABEL_ENV;
  }
}

/**
 * [Expo] Returns an Expo-internal Babel preset for aliasing react-native and
 * react imports
 */
function buildModuleResolverPreset() {
  return {
    plugins: [
      [
        require('babel-plugin-module-resolver').default,
        {
          alias: {
            react: EXPO_REACT_PATH,
            'react-native': EXPO_REACT_NATIVE_PATH,
          },
        },
      ],
    ],
  };
}

function getCacheKey() {
  var key = crypto.createHash('md5');
  cacheKeyParts.forEach(part => key.update(part));
  return key.digest('hex');
}

module.exports = {
  transform,
  getCacheKey,
};
