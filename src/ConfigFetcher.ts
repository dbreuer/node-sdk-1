import ky from 'ky-universal';
import { IConfigFetcher } from "configcat-common";
import { ProjectConfig } from "configcat-common/lib/ConfigServiceBase";
import { OptionsBase } from "configcat-common/lib/ConfigCatClientOptions";

export class HttpConfigFetcher implements IConfigFetcher {

    fetchLogic(options: OptionsBase, lastProjectConfig: ProjectConfig, callback: (newProjectConfig: ProjectConfig) => void): void {

        ky.get(options.getUrl(), {
            headers: {
                "User-Agent": "ConfigCat-JS/" + options.clientVersion,
                "X-ConfigCat-UserAgent": "ConfigCat-JS/" + options.clientVersion,
                "If-None-Match": lastProjectConfig ? lastProjectConfig.HttpETag : null
            }
        }).then((response) => {
            if (response && response.status === 304) {
                callback(new ProjectConfig(new Date().getTime(), JSON.stringify(lastProjectConfig.ConfigJSON), response.headers.get('etag')));
            } else if (response && response.status === 200) {
                response.json().then((body) => {
                    callback(new ProjectConfig(new Date().getTime(), JSON.stringify(body), response.headers.get('etag')));
                }).catch((reason) => {
                    options.logger.log("ConfigCat HTTPResponse body parsing error. Reason: " + reason);
                    callback(lastProjectConfig);
                });
            } else {
                options.logger.log("ConfigCat HTTPRequest error - " + (response && response.status) + ". Error: " + response.statusText);
                callback(lastProjectConfig);
            }
        }).catch((reason) => {
            options.logger.log("ConfigCat HTTPRequest error. Reason: " + reason);
            callback(lastProjectConfig);
        });
    }
}

export default IConfigFetcher;
