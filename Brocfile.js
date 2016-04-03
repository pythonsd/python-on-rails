var uglifyJavaScript = require('broccoli-uglify-js');
var mergeTrees = require('broccoli-merge-trees');
var findBowerTrees = require('broccoli-bower');
var env = require('broccoli-env').getEnv();

var sourceTrees = findBowerTrees();

var tree = new mergeTrees(sourceTrees, { overwrite: true });

if (env === 'production') {
  // minify js
  appJs = uglifyJavaScript(tree, {
    // mangle: false,
    // compress: false
  });
}

var publicFiles = 'public';

module.exports = tree;
