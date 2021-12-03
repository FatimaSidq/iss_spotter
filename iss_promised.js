const request = require("request-promise-native");

const fetchMyIP = function() {
  return request("https://api.ipify.org?format=json");
};

const fetchCoordsByIP = function(ip) {
  return request(`http://ip-api.com/json/${JSON.parse(ip).ip}`);
};

const fetchISSFlyOverTimes = function(body) {
  body = JSON.parse(body);
  return request(`https://iss-pass.herokuapp.com/json/?lat=${body.lat}&lon=${body.lon}`);
};

const nextISSTimesForMyLocation = function(){
  fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((response) => {
      for (let obj of JSON.parse(response).response){
        const time = new Date(0);
        time.setUTCSeconds(obj.risetime);
        console.log(`Next pass at ${time} for ${obj.duration} seconds!`);
      }
    })
    .catch((error) => {
      console.log(error.message)
    });
}

module.exports = { nextISSTimesForMyLocation };