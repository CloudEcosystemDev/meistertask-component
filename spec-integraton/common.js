require('dotenv').config();
const sinon = require('sinon');
// const axios = require('axios');
const bunyan = require('bunyan');

const log = bunyan.createLogger({ name: 'myapp' });
//
// const secretID = process.env.SECRET_ID;
// const bearerToken = process.env.BEARER_TOKEN;
// const secretUrl = process.env.SECRET_URL;

const getContext = () => ({
  emit: sinon.spy(),
  logger: log,
});
const getAccessToken = async () => {
  return process.env.ACCESS_TOKEN;
  // const secret = await axios.get(`${secretUrl}${secretID}`, {
  //   headers: {
  //     Authorization: `Bearer ${bearerToken}`,
  //   },
  // });
  // return secret.data.data.value.accessToken;
};

module.exports = { getContext, getAccessToken };
