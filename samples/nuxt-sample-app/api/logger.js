import configCatClient, { SAMPLE_KEY } from './config-cat.helper';

export default async(req, res, next) => {
  // req is the Node.js http request object
  const feature2 = await configCatClient.getValueAsync(SAMPLE_KEY, false)
    console.log(SAMPLE_KEY + ": " + feature2);

    res.send(SAMPLE_KEY + " -> " + feature2);
}
