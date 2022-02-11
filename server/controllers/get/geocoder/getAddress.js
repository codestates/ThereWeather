require("dotenv").config();
const axios = require("axios");

module.exports = async function (xLocation, yLocation) {
  try {
    return axios({
      method: "get",
      url: `http://api.vworld.kr/req/address?service=address&request=getAddress&version=2.0&crs=epsg:4326&point=${yLocation},${xLocation}&format=json&type=both&zipcode=false&simple=true&key=${process.env.GEOCODER_AUTH_KEY}`,
    })
      .then((res) => {
        console.log("get_address", res.data.response.result);
        let addressObj = {};
        if (!res.data.response.result[1]) {
          addressObj = res.data.response.result[0].structure;
        } else {
          addressObj = res.data.response.result[1].structure;
        }

        return addressObj;
      })
      .catch((err) => {
        return "bad request";
      });
  } catch {
    return "bad request";
  }
};
