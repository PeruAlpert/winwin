import { api } from '../api/api';

export class Categories {
    static shared_instance;
    
    constructor() { }

    static getSharedInstance() {
        if (!Categories.shared_instance) {
            Categories.shared_instance = new Categories();
        }
        return Categories.shared_instance;
    }

    getCategories(callBack) {
        api._request('categories')
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
}