import { api } from '../api/api';

export class Branches {
    static shared_instance;

    constructor() { }

    static getSharedInstance() {
        if (!Branches.shared_instance) {
            Branches.shared_instance = new Branches();
        }
        return Branches.shared_instance;
    }

    getBranches(params, callBack) {
        api._request('branches', null, params)
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

    searchBranches(params, callBack) {
        api._request('searchBranches', null, params)
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