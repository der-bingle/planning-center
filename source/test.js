const config = require("./config")
const getPlan = require("./get-plan")
const songs = require("./songs");
const presentation = require("./presentation");
const run = require('run-applescript')
const clipboard = require("clipboardy")

const test = async () => {
  let plan = await getPlan.next();
  let songScript = songs.make(plan)
  let script = presentation.create(songScript, '/Users/imac/Desktop/2020-02-23.key')
  return run(script);
}

test()
.catch(error => console.error(error))