const cliArgs = require('command-line-args');
const cliUsage = require('command-line-usage');

const desc = {
  help: 'Display this usage guide.',
  week: "Date of the service you want to create Keynote. {dim Default: next Sunday.}",
  script: "Log the resulting applescript to the console rather than running it. \n{italic Mainly useful for debugging.}",
  save: "Save the Keynote file. {dim Default: false.}",
  link: "Symlink Keynote file to the desktop. {dim Default: false.}",
}

const optionDefinitions = [
  {
    name: 'help',
    alias: 'h',
    type: Boolean,
    typeLabel: '{dim false}',
    description: 'Display this usage guide.'
  },
  {
    name: 'week',
    alias: 'w',
    type: String,
    typeLabel: '{dim next sunday}',
    description: "Date of the service you want to create Keynote.",
  },
  {
    name: 'save',
    alias: 's',
    type: Boolean,
    defaultValue: true,
    typeLabel: '{dim false}',
    description: "Save the Keynote file. ",
  },
  {
    name: 'link',
    alias: 'l',
    type: Boolean,
    defaultValue: true,
    typeLabel: '{dim false}',
    description: "Symlink created Keynote file to the desktop."
  },
  {
    name: 'applescript',
    alias: 'a',
    type: Boolean,
    typeLabel: '{dim false}',
    description: "Log applescript to the console. {italic Mainly useful for debugging.}"
  }
]

const options = cliArgs(optionDefinitions)

if (options.help) {
  const usage = cliUsage([
    {
      header: 'Planning Center Service to Keynote',
      content: 'Easily create Apple Keynote files from a plan in your PCS account.'
    },
    {
      header: 'Options',
      optionList: optionDefinitions
    },
    {
      content: 'Project home: {underline https://github.com/der-bingle/planning-center}'
    }
  ])
  console.log(usage)
} else {
  console.log(options)
}