const R = require("ramda")

let newMap = list => new Map(list);

const capitalize = R.replace(/^./, R.toUpper);

let cleanup = R.pipe(
  R.replace(/\s+-\s+/gm, ""),   // ↓ Remove spacing for chords (from "a - maz - ing" to "amazing")
  R.replace(/\s?›\s?/gm, "\n"), // ↓ Add new lines at delimiter (›)
  R.split(/\s?»\s?/gm),         // ↓ Split array on new slide delimeter (»)
  R.map(R.split("\n")),         // ↓ Split into array of lines
  R.map(R.map(R.trim)),         // ↓ Trim every line
  R.map(R.map(capitalize)),     // ↓ Capitalize every line
  R.map(R.join("\n")),          // ↓ Split into array of lines
);

let cleanupLyrics = (part) => [part[0], cleanup(part[1])];

let splitLyrics = R.pipe(
  R.split(/^([A-Z]+\s?\d?)\s?$/gm), // ↓ Split on all caps lines (ChordPro style, 'VERSE 1')
  R.drop(1),                        // ↓ Drop the first split since it's blank
  R.map(R.trim),                    // ↓ Trim all
  R.splitEvery(2),                  // ↓ Prepare array to make map (["VERSE 1", "V1 lyrics"])
  R.map(cleanupLyrics),             // ↓ Trim all
  newMap                            // ↓ Return map of lyrics with the key being the section title. 
);

let getSequence = (song) => correctSequence(song.sequence)
let getLyrics = (song) => splitLyrics(song.rawLyrics)

module.exports = getLyrics;