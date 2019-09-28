import { endPoints } from './endpoints';


class API {

    constructor() {
        this.token = null;
    }

    async _request(key, body = null, extraParams = {}, extraHeaders = {}) {
        let endpoint = endPoints.getEndPointByKey(key);

        let url = this._buildUrl(endpoint.url, endpoint.baseUrl, endpoint.routeParams, extraParams);
        let requestEndpoint = {
            method: endpoint.method,
            headers: this._setHeaders(endpoint, extraHeaders)
        }

        if (body && endpoint.multiPart == false) {
            endpoint['body'] = JSON.stringify(body);
            requestEndpoint.body = endpoint.body;
        } else {
            requestEndpoint.body = endpoint.body;
        }

        try {
            let response = await fetch(
                url,
                requestEndpoint
            );
            console.log('endpoint', endpoint);
            console.log('request response ===> ', response);
            return response.json();
        } catch (e) {
            console.log('Errors', e);
        }
    }

    _setHeaders(endpoint, extraHeaders) {
        let headers = {
            'Content-Type': 'application/json'
        };
        if (endpoint.multiPart == true) {
            headers['Content-Type'] = 'multipart/form-data';
        } else if (endpoint.hasHeaders == true) {
            headers = extraHeaders;
        }

        if (endpoint.needsAuth == true) {
            headers['Authorization'] = `bearer userTokenHere`;
            return headers;
        } else {
            return headers;
        }
    }

    _buildUrl(path, baseUrl, routeParams, extraParams) {
        let allParams = null;
        if (routeParams) {
            Object.assign(routeParams, extraParams);
        }

        let url = `${baseUrl}${path}`;
        if (routeParams) {
            url = this._addRouteParams(url, routeParams);
        }

        return url;
    }

    _addRouteParams(url, routeParams) {
        let keys = url.match(/!\w+/gi);
        console.log('KEYS', keys);
        if (keys) {
            keys.forEach(key => {
                keyName = key.replace('!', '');
                url = url.replace(key, routeParams[keyName]);
            })
        }
        return url;
    }

}

export const api = new API();