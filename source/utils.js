const R           = require("ramda");
const config      = require("./config")
const set         = require('date-fns/fp/set');
const format      = require('date-fns/fp/format');
const addWeeks    = require('date-fns/fp/addWeeks');
const isSunday    = require('date-fns/fp/isSunday');
const startOfWeek = require('date-fns/fp/startOfWeek');

let now = new Date();
let dateToString = format("R-MM-dd'T'H:mm:ss'Z'")

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
  dateToString
);

let getNextSunday = R.pipe(
  addWeeks(1),
  startOfWeek,
  serviceTime,
  dateToString
);

let getNextServiceDate = () => {
  if (isSunday(now)) {
    return getThisSunday(now);
  } else {
    return getNextSunday(now)
  }
}

module.exports.nextServiceDate = getNextServiceDate;