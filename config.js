const Conf = require('conf');
const yaml = require('js-yaml');
const path = require('path')
const homedir = require('os').homedir();

let configPath = path.join(homedir, ".config", "planning-center")

const config = new Conf({
  fileExtension: 'yaml',
  serialize: yaml.safeDump,
  deserialize: yaml.safeLoad,
  projectSuffix: "",
  cwd: configPath
});

module.exports = config;