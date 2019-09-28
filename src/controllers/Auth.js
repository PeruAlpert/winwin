import { api } from '../api/api';

export class Auth {

    static shared_instance;

    constructor() { }

    static getSharedInstance() {
        if (!Auth.shared_instance) {
            Auth.shared_instance = new Auth();
        }
        return Auth.shared_instance;
    }

    login(params, callBack) {
        api._request('login', null, params)
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

    signUp(params, callBack) {
        api._request('signup', null, params)
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

    activateAccount(params, callBack) {
        api._request('activateAccount', null, params)
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