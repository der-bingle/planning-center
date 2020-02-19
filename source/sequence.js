const R = require("ramda")

let instrumentalSections = [
  "Intro",
  "Instrumental",
  "Instrumental 1",
  "Instrumental 2",
  "Instrumental 3",
  "Instrumental 4",
  "Vamp",
  "Breakdown",
  "Interlude",
  "Interlude 1",
  "Interlude 2",
  "Interlude 3",
  "Interlude 4",
  "Tag",
  "Tag 1",
  "Tag 2",
  "Tag 3",
  "Outro",
  "Ending"
]

let lyricSequence = R.pipe(
  // ↓ Get the sequence from song object
  R.prop("sequence"),
  // ↓ Remove instrumental sections
  R.reject(R.includes(R.__, instrumentalSections)),
  // ↓ Make all sections uppercase to match ChordPro format
  R.map(R.toUpper)
);

module.exports = lyricSequence;