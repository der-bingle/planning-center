const R = require("ramda");
const script = require('./script');

let newLineJoin = R.join("\n\n");

let create = (songsScript, filepath) => {
	let base = [
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
];

if (filepath) {
	return newLineJoin(R.insert(10, script.saveDoc(filepath), base))
} else {
	return newLineJoin(base)
}

};

module.exports.create = create;