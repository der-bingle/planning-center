const plan = require("./this-week.json");
const run    = require('run-applescript')
const lyrics = require("./lyrics");
const presentation = require("./presentation");
const songs = require("./songs");
let songList = plan.included;


let script = `
${presentation.create}
${songs.make(songList)}
${presentation.end}
`
// console.log(script);
let main = async () => {
  await run(script)
}
main()