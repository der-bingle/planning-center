const R = require("ramda")


let newMap = list => new Map(list);

let splitLyrics = R.pipe(
  R.split(/^([A-Z]+\s?\d?)\s?$/gm),
  R.drop(1),
  R.map(R.trim),
  R.map(R.replace(/\s+-\s+/gm, "")),
  R.splitEvery(2),
  newMap
);

let noLyricParts = [
  "Instrumental",
  "Instrumental 1",
  "Instrumental 2",
  "Instrumental 3",
  "Instrumental 4",
  "Intro",
  "Outro",
  "Vamp",
  "Tag 1",
  "Tag 2",
  "Tag 3",
  "Breakdown",
  "Interlude 1",
  "Interlude 2",
  "Interlude 3",
  "Interlude 4",
  "Ending"
]

let correctOrder = R.pipe(
  R.reject(R.includes(R.__, noLyricParts)),
  R.map(R.toUpper)
);



let getOrder = (song) => correctOrder(song.attributes.sequence)
let getLyrics = (song) => splitLyrics(song.attributes.lyrics)

module.exports.get = getLyrics;
module.exports.order = getOrder;