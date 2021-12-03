const request = require("request");

const fetchMyIP = function(callback) {
  request("https://api.ipify.org?format=json", (error, response, body) => {
    if (error) {
      return callback(error, null);
    } else if (response.statusCode !== 200) {
      return callback(Error(`Status Code ${response.statusCode} when fetching IP. Response: ${body}`), null);
    }

    callback(null, JSON.parse(body).ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`http://ip-api.com/json/${ip}`, (error, response, body) => {
    if (error) {
      return callback(error, null);
    } else if (response.statusCode !== 200) {
      return callback(Error(`Status Code ${response.statusCode} when fetching IP. Response: ${body}`), null);
    }
    const data = JSON.parse(body);
    callback(null, {latitude: data.lat, longitude: data.lon});
  });
};

const fetchISSFlyOverTimes = function(latitude, longitude, callback) {
  request(`https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`, (error, response, body) => {
    if (error) {
      return callback(error, null);
    } else if (response.statusCode !== 200) {
      return callback(Error(`Status Code ${response.statusCode} when fetching IP. Response: ${body}`), null);
    }
    const data = JSON.parse(body);
    callback(null, data.response);
  });
};

const nextISSTimesForMyLocation = function(callback){
  fetchMyIP((error, ip) => {
    fetchCoordsByIP(ip, (error, data) => {
      fetchISSFlyOverTimes(data.latitude, data.longitude, (error, response) => {
        callback(error, response);
      });
    });
  });
}

module.exports = { nextISSTimesForMyLocation };