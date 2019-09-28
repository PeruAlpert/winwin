import { api } from '../api/api';

export class Brands {
    static shared_instance;

    constructor() { }

    static getSharedInstance() {
        if (!Brands.shared_instance) {
            Brands.shared_instance = new Brands();
        }
        return Brands.shared_instance;
    }

    getBrands(params, callBack) {
        api._request('brands', null, params)
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

    searchBrands(params, callBack) {
        api._request('searchBrands', null, params)
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