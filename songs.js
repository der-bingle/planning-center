const plan = require("./plan-items.json");
const makeSlide = require("./slides");
const lyrics = require("./lyrics");

let makeOneSong = (song) => {
  let lyric = lyrics.get(song)
  let order = lyrics.order(song)

  let script = order.map(part => {
    let lines = lyric.get(part)
    return makeSlide.lyrics(lines)
  });
  
  return script.join("\n")
}

let makeSongs = list => list.map(song => makeOneSong(song)).join("\n");

module.exports.make = makeSongs