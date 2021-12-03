// index.js
const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  for (let obj of passTimes){
    const time = new Date(0);
    time.setUTCSeconds(obj.risetime);
    console.log(`Next pass at ${time} for ${obj.duration} seconds!`);
  };
});