const cliArgs = require('command-line-args');
const cliUsage = require('command-line-usage');
const utils = require('./utils');
const getPlan = require("./get-plan")
const songs = require("./songs");
const presentation = require("./presentation");
const run = require('run-applescript')

const getServiceWeek = date => utils.closestServiceDate(date)

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
    type: date => getServiceWeek(date),
    defaultValue: utils.nextServiceDate(),
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
    defaultValue: false,
    typeLabel: '{dim false}',
    description: "Symlink Keynote file to the desktop."
  },
  {
    name: 'debug',
    alias: 'd',
    type: Boolean,
    typeLabel: '{dim false}',
    description: "Log applescript to the console and exit."
  }
]

const input = cliArgs(optionDefinitions)

let handleInput = async (input) => {
  let filepath = utils.getFilePath(input.week)
  let plan = await getPlan.byDate(input.week);
  let slides = songs.make(plan);
  let script = null;

  if (input.save) {
    script = presentation.create(slides, filepath)
  } else {
    script = presentation.create(slides)
  }

  if (input.applescript) {
    console.log(script)
  } else {
    await run(script)
  }
}

if (input.help) {
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
  handleInput(input)
}