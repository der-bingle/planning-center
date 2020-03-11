const R           = require("ramda");
const path        = require("path");
const config      = require("./config")
const set         = require('date-fns/fp/set');
const format      = require('date-fns/fp/format');
const parseISO    = require('date-fns/fp/parseISO')
const addWeeks    = require('date-fns/fp/addWeeks');
const isSunday    = require('date-fns/fp/isSunday');
const startOfWeek = require('date-fns/fp/startOfWeek');

let now = new Date();
let dateToISOtz = format("R-MM-dd'T'H:mm:ss'Z'")
let dateToFilename = date => format("R-MM-dd", parseISO(date))
let toHumanDate = date => format("EEEE, MMMM d", parseISO(date))
// let dateToFilename = date => format("R-MM-dd", parseISO("2020-02-23T10:40:00Z"))

const serviceTime = (date) => {
  let time = config.get("serviceTime").split(":")
  let hours = parseInt(time[0]);
  let minutes = parseInt(time[1]);
  return set({
    hours,
    minutes,
    seconds: 00
  }, date)
};

let getThisSunday = R.pipe(
  startOfWeek,
  serviceTime,
  dateToISOtz
);

let getNextSunday = R.pipe(
  addWeeks(1),
  startOfWeek,
  serviceTime,
  dateToISOtz
);

let getNextServiceDate = () => {
  if (isSunday(now)) {
    return getThisSunday(now);
  } else {
    return getNextSunday(now)
  }
}

let getFilePath = (saveDir, date) => {
  let filename = dateToFilename(date) + ".key";
  return path.join(saveDir, filename)
}

module.exports.getFilePath = getFilePath;
module.exports.toHumanDate = toHumanDate;
module.exports.nextServiceDate = getNextServiceDate;
module.exports.closestServiceDate = (date) => getThisSunday(parseISO(date));
