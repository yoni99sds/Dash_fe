module.exports = {
  // ... other webpack configurations ...
  resolve: {
    fallback: {
      "path": require.resolve("path-browserify"),
      "fs": false
    }
  }
  

};
