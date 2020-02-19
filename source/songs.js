const R = require("ramda")
const script = require('./script');
const makeSlides = require("./slides");
const getLyrics = require("./lyrics");
const getSequence = require("./sequence");

let newLineJoin = R.join("\n\n");

let addBlank = R.append(script.newSlide("Blank"))

const l = [1, -1, 1, 3, 4, -4, -4, -5, 5, 3, 3];
R.dropRepeatsWith(R.eqBy(Math.abs), l);


let makeOneSong = (song) => {
  let lyrics = getLyrics(song)
  let sequence = getSequence(song)
  
  let isEqual = (part1, part2) => {
    let part1Lyrics = lyrics.get(part1);
    if (part1 === part2 && part1Lyrics.length === 1) {
      return true
    } else {
      return false
    }
  }
 
  let dedupSequence = R.dropRepeatsWith(isEqual, sequence);
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
  return make(dedupSequence)
}

let makeSongs = list => newLineJoin(list.map(song => makeOneSong(song)));

module.exports.make = makeSongs
module.exports.makeOne = makeOneSong