import configCatClient from './config-cat.helper';

export default async(req, res, next) => {
  // req is the Node.js http request object
  const keys = await configCatClient.getAllKeysAsync();
  console.log("keys: " + keys);
  res.send("keys: '" + keys + "'");

}
