const run    = require('run-applescript')
const script = require('./script');

let create = songsScript => [
	script.tellKeynote,
	script.activate,
	script.try,
	script.newDoc("Third Baptist"),
	script.tellDoc,
	songsScript,
	script.deleteFirstSlide,
	script.endTell,
	script.onError,
	script.endTry,
	script.endTell
].join("\n");

module.exports.create = create;