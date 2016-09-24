# hot-callback-loader
Webpack loader that wraps a module in a callback that executes whenever the module hot updates. It is meant to reduce the amount of boilerplate to write when you want a module to hot update. 

## Installation
`npm install hot-callback-loader --save-dev`

## Usage
```javascript
// import using es6 syntax
import hotMyModule from 'hot-callback!./path/to/my-module';
// OR use commonjs syntax
const hotMyModule = require('hot-callback!./path/to/my-module');

let MyModule;
hotMyModule(function(newMyModule) {
  // this callback will execute initially and every time the module updates
  MyModule = newMyModule;
});

// the above callback is executed synchronously, so we can use MyModule now
MyModule.doStuff();
```

### Getting a specific export
Often the object you want to load is exported as a default export of your module. To avoid
having to manually type 'newMyModule.default' every time in the hot callback, you can 
set the loader to always pass a specific export.

```javascript
// import using es6 syntax
import hotRoutes from 'hot-callback?export=default!./routes';

hotRoutes(server.updateRoutes.bind(server));
```
