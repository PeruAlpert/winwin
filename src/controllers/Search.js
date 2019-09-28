import { api } from '../api/api';

export class Search {
    static shared_instance;
    
    constructor() { }

    static getSharedInstance() {
        if (!Search.shared_instance) {
            Search.shared_instance = new Search();
        }
        return Search.shared_instance;
    }

   
    searchAll(params, callBack) {
        api._request('searchAll', null, params)
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