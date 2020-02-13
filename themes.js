const run    = require('run-applescript')
const columns = require('cli-columns')
const indent = require('indent-string')
 
let getThemes = `
tell application "Keynote"
    set the availableThemes to the name of every theme
end tell`
 
let main = async () => {
  let themes = await run(getThemes).then(result => result.split(', '))
  console.log(indent(columns(themes, {padding: 6}), 3))
}

main()