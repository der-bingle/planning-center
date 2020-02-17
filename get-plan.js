const startOfWeek = require('date-fns/fp/startOfWeek');
const addWeeks = require('date-fns/fp/addWeeks');
const isSunday = require('date-fns/fp/isSunday');
const formatISO = require('date-fns/fp/formatISO');
const format = require('date-fns/fp/format');
const set = require('date-fns/fp/set');

const setTime = set({
  hours: 10,
  minutes: 40,
  seconds: 00
})

let isoFormat = format("R-MM-dd'T'H:mm:ss'Z'")
// let nextSunday = 
let getSunday = () => {
  // let today = setTime(new Date());
  let today = setTime(new Date(2020, 02, 18));
  if (isSunday(today)) {
   return isoFormat(today); 
  } else {
    return isoFormat(setTime(startOfWeek(addWeeks(today, 1))))
  }
}
let string = 'YYYY-MM-DDTHH:MM:SSZ'
let example = "2020-02-23T10:40:00Z";

console.log(getSunday());
