const R = require("ramda");
const got = require("got");
const config = require("./config")
const utils = require("./utils")
;

let gotOpts = {
  // hostname: "api.planningcenteronline.com",
  username: config.get("appId"),
  password: config.get("secret"),
  responseType: "json",
  resolveBodyOnly: true
}

let getIdByDate = (date, plans) => {

  let dateMatches = date => R.pipe(
    R.prop("attributes"),
    R.propEq("sort_date", date)
  );

  let getPlanId = R.pipe(
    R.prop("data"),
    R.find(dateMatches),
    R.prop("id"),
  );

  return getPlanId(plans)
}

let serviceTypeID = config.get("serviceTypeID")

let getPlanID = async (date) => {
  gotOpts.url = `https://api.planningcenteronline.com/services/v2/service_types/${serviceTypeID}/plans`
  gotOpts.searchParams = { filter: "future" }
  let plans = await got(gotOpts);
  return getIdByDate(date, plans);
}

let getPlanItems = async (planID) => {
  gotOpts.url = `https://api.planningcenteronline.com/services/v2/service_types/${serviceTypeID}/plans/${planID}/items`
  gotOpts.searchParams = { include: "arrangement" }
  let plan = await got(gotOpts);
  return plan.included.map(mapSongs);
}

let mapSongs = song => ({
  sequence: song.attributes.sequence,
  rawLyrics: song.attributes.lyrics
})

let getPlanByDate = async (date) => {
  // ↓ Find plan where date === attributes.sort_date
  let planID = await getPlanID(date);
  // ↓ Get plan items w/ arrangements included
  return getPlanItems(planID);
}

const getNextPlan = () => getPlanByDate(utils.nextServiceDate)

exports.byDate = getPlanByDate;
exports.next = getNextPlan;