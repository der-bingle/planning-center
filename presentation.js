const run    = require('run-applescript')
const script = require('./script');

let create = songsScript => [
	script.tellKeynote,
	script.activate,
	script.try,
	script.newDoc("Third Baptist"),
	script.tellDoc,
	songsScript,
	script.endTell,
	script.onError,
	script.endTry,
	script.endTell
].join("\n");

// let createPresentation = `property thisThemeName: "Third Baptist"

// tell application "Keynote"
// activate
// try
// 		--GET THE THEME NAMES
// set the themeNames to the name of every theme

// --CHECK FOR THEME
// if thisThemeName is not in the themeNames then
// error "The theme “" & thisThemeName & "” is not installed on this computer."
// end if
		
// 		--MAKE NEW PRESENTATION
// set thisDocument to ¬
// make new document with properties ¬
// { document theme: theme thisThemeName, width: 1024, height: 768 }
// tell thisDocument`

// let endScript = `end tell
// 	on error errorMessage number errorNumber
// 		if errorNumber is not -128 then
// 			display alert ("ERROR " & errorNumber) message errorMessage
// 		end if
// 	end try
// end tell`;

// let main = async () => {
//   await run(createScript).catch(error => console.log(error))
//   console.log("Keynote created!")
// }

// main()

module.exports.create = create;
// module.exports.end = endScript;