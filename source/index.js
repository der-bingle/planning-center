const run = require('run-applescript')

const util = require("./utils");
const link = require("./link")
const getPlan = require("./plan")
const songs = require("./songs");
const presentation = require("./presentation");

const main = async (id, opts) => {
  try {
    let filePath = util.getFilePath(opts.saveDir, opts.date)
    let plan = await getPlan(id, opts);
    let slides = songs.make(plan);
    let script = await presentation.create(slides, filePath);

    if (opts.debug) {
      return console.log(script)
    } else {
      await run(script)

      if (opts.link) {
        link(filePath);
      }
      return filePath
    };
  } catch (error) {
    throw (error)
  }
}

module.exports = main;