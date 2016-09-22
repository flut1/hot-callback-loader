var loaderUtils = require("loader-utils");

module.exports = function() {};
module.exports.pitch = function(remainingRequest) {
	this.cacheable && this.cacheable();

	var options = loaderUtils.parseQuery(this.query);
	var useExport = options.export ? '.' + options.export : '';

	var moduleRequest = loaderUtils.stringifyRequest(this, remainingRequest);
	var modulePath = loaderUtils.stringifyRequest(this, this.resourcePath);
	var result = [
		"var moduleInstance = require(" + moduleRequest + ");",
		"var moduleId = require.resolve(" + moduleRequest + ");",
		"module.exports = function(cb) {",
		"  cb(moduleInstance" + useExport + ");",
		"  if(module.hot) {",
		"    module.hot.accept([moduleId], function() {",
		"      console.log('Hot updating "+modulePath+"');",
		"      moduleInstance = require(" + moduleRequest + ");",
		"      cb(moduleInstance" + useExport + ");",
		"    });",
		"  }",
		"}"
	];
	return result.join("\n");
};
