import { api } from '../api/api';

export class ServiceProvider {
    static shared_instance;

    constructor() { }

    static getSharedInstance() {
        if (!ServiceProvider.shared_instance) {
            ServiceProvider.shared_instance = new ServiceProvider();
        }
        return ServiceProvider.shared_instance;
    }

    nearbyLocations(params, callBack) {
        api._request('nearbyLocations', null, params)
            .then((res) => {
                callBack(res);
            })
            .catch((error) => {
                callBack(null, error);
            });
    }


    makeOrder(params, body, callBack) {
        api._request('makeOrder', body, params)
            .then((res) => {
                callBack(res);
            })
            .catch((error) => {
                callBack(null, error);
            });
    }

    getAllOrders(params, callBack) {
        api._request('allOrders', null, params)
            .then((res) => {
                callBack(res);
            })
            .catch((error) => {
                callBack(null, error);
            });
    }

    getUserOrder(params, callBack) {
        api._request('userOrder', null, params)
            .then((res) => {
                callBack(res);
            })
            .catch((error) => {
                callBack(null, error);
            });
    }

    getDetailedOrderHistory(params, callBack) {
        api._request('getDetailedOrderHistory', null, params)
            .then((res) => {
                callBack(res);
            })
            .catch((error) => {
                callBack(null, error);
            });
    }

    cancelOrder(params, callBack) {
        api._request('cancelOrder', null, params)
            .then((res) => {
                callBack(res);
            })
            .catch((error) => {
                callBack(null, error);
            });
    }

    getUserOrderHistory(params, callBack) {
        api._request('getOrderHistory', null, params)
            .then((res) => {
                callBack(res);
            })
            .catch((error) => {
                callBack(null, error);
            });
    }

    getUserOrderDetails(params, callBack) {
        api._request('getUserOrderDetails', null, params)
            .then((res) => {
                callBack(res);
            })
            .catch((error) => {
                callBack(null, error);
            });
    }

    confirmOrder(body, callBack) {
        api._request('confirmOrder', body)
            .then((res) => {
                callBack(res);
            })
            .catch((error) => {
                callBack(null, error);
            });
    }


    getProfileValues(params, callBack) {
        api._request('getProfileValues', null, params)
            .then((res) => {
                callBack(res);
            })
            .catch((error) => {
                callBack(null, error);
            });
    }

    isExpired(params, callBack) {
        api._request('isExpired', null, params)
            .then((res) => {
                callBack(res);
            })
            .catch((error) => {
                callBack(null, error);
            });
    }
}