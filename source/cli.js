const cliArgs = require('command-line-args');

const desc = {
  week: "The date of the service you want to create Keynote for ('2020-02-16'). Defaults to next Sunday.",
  script: "Log the applescript to the console rather than running it. Mainly useful for debugging.",
  save: "BOOLEAN, whether to save the Keynote file. Default false.",
  link: "BOOLEAN, symlink Keynote file to the desktop. Default false.",
}

const optionDefinitions = [
  { name: 'week', alias: 'w', type: String, description: desc.week },
  { name: 'script', type: Boolean , description: desc.script},
  { name: 'save', alias: 's', type: Boolean, defaultValue: true, description: desc.save },
  { name: 'link', alias: 'l', type: Boolean, defaultValue: true, description: desc.link },
]

const options = commandLineArgs(optionDefinitions)