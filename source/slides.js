const R = require("ramda")
const indent = require('indent-string');
const script = require('./script');

const makeLyricSlide = (lines) => [
  script.newSlide("Lyrics"),
  script.tellSlide,
  script.setTitleText(lines),
  script.endTell,
].join("\n")
//   return `
//       set the newSlide to make new slide with properties {base slide:master slide "Lyrics"}
//         tell newSlide
//           set the object text of the default title item to "${slide}"
//         end tell`;
// })

module.exports.lyrics = makeLyricSlide