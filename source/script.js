
module.exports = {
  tellKeynote: `tell application "Keynote"`,
  activate: `activate`,
  try: `try`,
  newDoc: (theme) => `set thisDocument to make new document with properties { document theme: theme "${theme}" }`,
  newSlide: (master) => `set the newSlide to make new slide with properties {base slide:master slide "${master}"}`,
  tellDoc: `tell thisDocument`,
  tellCurrentSlide: `tell the current slide`,
  tellSlide: `tell newSlide`,
  setTitleText: (text) => `set the object text of the default title item to "${text}"`, 
  endTry: `end try`,
  onError: `on error errorMessage number errorNumber`,
  endTell: `end tell`,
};