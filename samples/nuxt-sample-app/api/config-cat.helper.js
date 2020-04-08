const SDKKEY = "PKDVCLf-Hq-h-kCzMp-L7Q/HhOWfwVtZ0mb30i9wi17GQ";

import * as configcat from 'configcat-node';

var logger = configcat.createConsoleLogger(3);

const configCatClient = configcat.createClientWithAutoPoll(SDKKEY, { logger: logger, pollIntervalSeconds: 2 });

export default configCatClient;
export const SAMPLE_KEY = "isAwesomeFeatureEnabled";
