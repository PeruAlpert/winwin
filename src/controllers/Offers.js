import { api } from '../api/api';

export class Offers {
    static shared_instance;

    constructor() { }

    static getSharedInstance() {
        if (!Offers.shared_instance) {
            Offers.shared_instance = new Offers();
        }
        return Offers.shared_instance;
    }

    getOffers(params, callBack) {
        api._request('offers', null, params)
            .then((res) => {
                if (res.length) {
                    callBack(res, false);
                } else {
                    callBack(null, true);
                }
            })
            .catch((error) => {
                callBack(null, true);
            })
    }

    getFavourite(params,callBack){
        api._request('getFav', null, params)
        .then((res) => {
            if (res) {
                callBack(res, false);
            } else {
                callBack(null, true);
            }
        })
        .catch((error) => {
            callBack(null, true);
        })   
    }

    toggleFavourite(key,params, callBack) {
        api._request(key, null, params)
            .then((res) => {
                if (res) {
                    callBack(res, false);
                } else {
                    callBack(null, true);
                }
            })
            .catch((error) => {
                callBack(null, true);
            })
    }
}