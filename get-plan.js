const R = require("ramda");
const got = require("got");
const set = require('date-fns/fp/set');
const config = require("./config")
const format = require('date-fns/fp/format');
const addWeeks = require('date-fns/fp/addWeeks');
const isSunday = require('date-fns/fp/isSunday');
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

let getNextSunday = R.pipe(
  addWeeks(1),
  startOfWeek,
  serviceTime,
  dateToString
);

let getNextServiceDate = () => {
  if (isSunday(now)) {
    return isoFormat(now);
  } else {
    return getNextSunday(now)
  }
}
let nextServiceDate = getNextServiceDate();

let gotOpts = {
  // hostname: "api.planningcenteronline.com",
  username: config.get("appId"),
  password: config.get("secret"),
  responseType: "json",
  resolveBodyOnly: true
}

let isNextService = R.pipe(
  R.prop("attributes"),
  R.propEq("sort_date", nextServiceDate)
);

let getPlanId = R.pipe(
  R.prop("data"),
  R.find(isNextService),
  R.prop("id"),
  // R.prop("links"),
  // R.prop("self"),
);

let serviceTypeID = config.get("serviceTypeID")

let getNextPlanID = async () => {
  gotOpts.url = `https://api.planningcenteronline.com/services/v2/service_types/${serviceTypeID}/plans`
  gotOpts.searchParams = {filter: "future"}
  let planList = await got(gotOpts);
  // console.log(got)
  return getPlanId(planList);
}

let getNextPlan = async (planID) => {
  gotOpts.url = `https://api.planningcenteronline.com/services/v2/service_types/${serviceTypeID}/plans/${planID}/items`
  gotOpts.searchParams = {include: "arrangement"}
  let plan = await got(gotOpts);
  return plan.included.map(mapSongs);
}

let mapSongs = song => ({
  order: song.attributes.sequence,
  rawLyrics: song.attributes.lyrics
})

let main = async () => {
  let planID = await getNextPlanID();
  // console.log(planID)
  let plan = await getNextPlan(planID);
  console.log(JSON.stringify(plan, null, 2))
}

main().catch(error => console.log(error))