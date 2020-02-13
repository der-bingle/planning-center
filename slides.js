const makeLyricSlide = (lyrics) => `
    set the newSlide to make new slide with properties {base slide:master slide "Lyrics"}
      tell newSlide
        set the object text of the default title item to "${lyrics}"
      end tell`;

module.exports.lyrics = makeLyricSlide