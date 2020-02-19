const R = require("ramda")
const script = require('./script');
const makeSlides = require("./slides");
const getLyrics = require("./lyrics");
const getSequence = require("./sequence");

let newLineJoin = R.join("\n\n");

let addBlank = R.append(script.newSlide("Blank"))

let makeOneSong = (song) => {
  let lyrics = getLyrics(song)
  let sequence = getSequence(song)

  let addSection = (script, section) => {
    let sectionSlides = lyrics.get(section)
    let newScript = sectionSlides.map(slide => makeSlides.lyrics(slide))
    return R.concat(script, newScript)
  };

  let make = R.pipe(
    R.reduce(addSection, []),
    addBlank,
    newLineJoin
  );
  return make(sequence)
}

let makeSongs = list => newLineJoin(list.map(song => makeOneSong(song)));

module.exports.make = makeSongs
module.exports.makeOne = makeOneSong