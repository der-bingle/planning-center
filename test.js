// const config = require("./config")
const getPlan = require("./get-plan")
const songs = require("./songs");
const presentation = require("./presentation");
const run = require('run-applescript')
const clipboard = require("clipboardy")
let testSong = {
  sequence: [
    'Intro',
    'Verse 1', 'Chorus',
    'Verse 2', 'Chorus',
    'Verse 4', 'Chorus',
    'Chorus'
  ],
  rawLyrics: 'VERSE 1\n' +
    'Have you been to Jesus › for the cleansing power\n' +
    'Are you washed in the blood of the Lamb? »\n' +
    'Are you fully trusting › in His grace this hour?\n' +
    'Are you washed in the blood of the Lamb\n' +
    '\n' +
    'CHORUS\n' +
    'Are you washed in the blood?\n' +
    'In the soul-cleansing blood of the Lamb?\n' +
    'Are your garments spotless? › Are they white as snow\n' +
    'Are you washed in the blood of the Lamb\n' +
    '\n' +
    'VERSE 2\n' +
    "Are you walking daily › by the Sav - ior's side\n" +
    'Are you washed in the blood of the Lamb? »\n' +
    'Do you rest each moment › in the Crucified\n' +
    'Are you washed in the blood of the Lamb\n' +
    '\n' +
    'VERSE 3\n' +
    'When the Bridegroom cometh › will your robes be white\n' +
    'Are you washed in the blood of the Lamb? »\n' +
    'Will your soul be ready › for the mansions bright\n' +
    'And be washed in the blood of the Lamb\n' +
    '\n' +
    'VERSE 4\n' +
    'Lay a - side the garments › that are stained with sin\n' +
    'And be washed in the blood of the Lamb »\n' +
    "There's a fountain flowing › for the soul unclean\n" +
    'O be washed in the blood of the Lamb'
};

const test = async () => {
  let plan = await getPlan.next();

  // let songsScript = songs.makeOne(testSong)
  let songScript = songs.make(plan)
  let script = presentation.create(songScript)
  let result = await run(script);
  console.log(result);
  
  // console.dir(script, { depth: null });

  // console.dir(songScript, { depth: null });
}

test().catch(error => console.log(error))