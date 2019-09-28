import {
    WIN_API,
} from './constants';

class EndPoints {

    constructor() {
        this.EndPoints = {
            "login": {
                url: WIN_API.LOGIN,
                baseUrl: WIN_API.BASE_URL_USER,
                method: "POST",
                needsAuth: false,
                multiPart: false,
                hasRouteParams: false,
                routeParams: {},
                hasHeaders: false,
                headers: {}
            },
            "signup": {
                url: WIN_API.SIGNUP,
                baseUrl: WIN_API.BASE_URL_USER,
                method: "POST",
                needsAuth: false,
                multiPart: false,
                hasRouteParams: false,
                routeParams: {},
                hasHeaders: false,
                headers: {}
            },
            "activateAccount": {
                url: WIN_API.ACTIVATE_ACCOUNT,
                baseUrl: WIN_API.BASE_URL_USER,
                method: "POST",
                needsAuth: false,
                multiPart: false,
                hasRouteParams: false,
                routeParams: {},
                hasHeaders: false,
                headers: {}
            },
            "categories": {
                url: WIN_API.CATEGORIES,
                baseUrl: WIN_API.BASE_URL,
                method: "GET",
                needsAuth: false,
                multiPart: false,
                hasRouteParams: false,
                routeParams: {},
                hasHeaders: false,
                headers: {}
            },
            "brands": {
                url: WIN_API.BRANDS,
                baseUrl: WIN_API.BASE_URL,
                method: "GET",
                needsAuth: false,
                multiPart: false,
                hasRouteParams: false,
                routeParams: {},
                hasHeaders: false,
                headers: {}
            },
            "searchBrands": {
                url: WIN_API.SEARCH_BRANDS,
                baseUrl: WIN_API.BASE_URL,
                method: "GET",
                needsAuth: false,
                multiPart: false,
                hasRouteParams: false,
                routeParams: {},
                hasHeaders: false,
                headers: {}
            },
            "branches": {
                url: WIN_API.BRANCHES,
                baseUrl: WIN_API.BASE_URL,
                method: "GET",
                needsAuth: false,
                multiPart: false,
                hasRouteParams: false,
                routeParams: {},
                hasHeaders: false,
                headers: {}
            },
            "searchBranches": {
                url: WIN_API.SEARCH_BRANCHES,
                baseUrl: WIN_API.BASE_URL,
                method: "GET",
                needsAuth: false,
                multiPart: false,
                hasRouteParams: false,
                routeParams: {},
                hasHeaders: false,
                headers: {}
            },
            "offers": {
                url: WIN_API.OFFERS,
                baseUrl: WIN_API.BASE_URL,
                method: "GET",
                needsAuth: false,
                multiPart: false,
                hasRouteParams: false,
                routeParams: {},
                hasHeaders: false,
                headers: {}
            },
            "searchAll": {
                url: WIN_API.SEARCH_ALL,
                baseUrl: WIN_API.BASE_URL,
                method: "GET",
                needsAuth: false,
                multiPart: false,
                hasRouteParams: false,
                routeParams: {},
                hasHeaders: false,
                headers: {}
            },
            "makeOrder": {
                url: WIN_API.MAKE_ORDER,
                baseUrl: WIN_API.BASE_URL_SERVICE_PROVIDER,
                method: "POST",
                needsAuth: false,
                multiPart: false,
                hasRouteParams: false,
                routeParams: {},
                hasHeaders: false,
                headers: {}
            },
            "allOrders": {
                url: WIN_API.ALL_ORDERS,
                baseUrl: WIN_API.BASE_URL_SERVICE_PROVIDER,
                method: "GET",
                needsAuth: false,
                multiPart: false,
                hasRouteParams: false,
                routeParams: {},
                hasHeaders: false,
                headers: {}
            },
            "userOrder": {
                url: WIN_API.USER_ORDER,
                baseUrl: WIN_API.BASE_URL_SERVICE_PROVIDER,
                method: "GET",
                needsAuth: false,
                multiPart: false,
                hasRouteParams: false,
                routeParams: {},
                hasHeaders: false,
                headers: {}
            },
            "confirmOrder": {
                url: WIN_API.CONFIRM_ORDER,
                baseUrl: WIN_API.BASE_URL_SERVICE_PROVIDER,
                method: "POST",
                needsAuth: false,
                multiPart: false,
                hasRouteParams: false,
                routeParams: {},
                hasHeaders: false,
                headers: {}
            },
            "nearbyLocations": {
                url: WIN_API.NEARBY_LOCATIONS,
                baseUrl: WIN_API.BASE_URL,
                method: "GET",
                needsAuth: false,
                multiPart: false,
                hasRouteParams: false,
                routeParams: {},
                hasHeaders: false,
                headers: {}
            },
            "makeFav": {
                url: WIN_API.MAKE_FAV,
                baseUrl: WIN_API.BASE_URL,
                method: "POST",
                needsAuth: false,
                multiPart: false,
                hasRouteParams: false,
                routeParams: {},
                hasHeaders: false,
                headers: {}
            },
            "makeUnFav": {
                url: WIN_API.MAKE_UN_FAV,
                baseUrl: WIN_API.BASE_URL,
                method: "POST",
                needsAuth: false,
                multiPart: false,
                hasRouteParams: false,
                routeParams: {},
                hasHeaders: false,
                headers: {}
            },
            "getFav": {
                url: WIN_API.GET_FAV,
                baseUrl: WIN_API.BASE_URL,
                method: "GET",
                needsAuth: false,
                multiPart: false,
                hasRouteParams: false,
                routeParams: {},
                hasHeaders: false,
                headers: {}
            },
            "getProfileValues": {
                url: WIN_API.PROFILE_VALUES,
                baseUrl: WIN_API.BASE_URL_USER,
                method: "GET",
                needsAuth: false,
                multiPart: false,
                hasRouteParams: false,
                routeParams: {},
                hasHeaders: false,
                headers: {}
            },
            "isExpired": {
                url: WIN_API.IS_EXPIRED,
                baseUrl: WIN_API.BASE_URL_USER,
                method: "GET",
                needsAuth: false,
                multiPart: false,
                hasRouteParams: false,
                routeParams: {},
                hasHeaders: false,
                headers: {}
            },
            "getOrderHistory": {
                url: WIN_API.ORDER_HISTORY,
                baseUrl: WIN_API.BASE_URL_USER,
                method: "GET",
                needsAuth: false,
                multiPart: false,
                hasRouteParams: false,
                routeParams: {},
                hasHeaders: false,
                headers: {}
            },
            "getUserOrderDetails": {
                url: WIN_API.GET_ORDER_DETAILS,
                baseUrl: WIN_API.BASE_URL_SERVICE_PROVIDER,
                method: "GET",
                needsAuth: false,
                multiPart: false,
                hasRouteParams: false,
                routeParams: {},
                hasHeaders: false,
                headers: {}
            },
            "getDetailedOrderHistory": {
                url: WIN_API.GET_DETAILED_ORDER_HISTORY,
                baseUrl: WIN_API.BASE_URL_SERVICE_PROVIDER,
                method: "GET",
                needsAuth: false,
                multiPart: false,
                hasRouteParams: false,
                routeParams: {},
                hasHeaders: false,
                headers: {}
            },
            "cancelOrder":{
                url: WIN_API.CANCEL_ORDER,
                baseUrl: WIN_API.BASE_URL_SERVICE_PROVIDER,
                method: "POST",
                needsAuth: false,
                multiPart: false,
                hasRouteParams: false,
                routeParams: {},
                hasHeaders: false,
                headers: {}
            }
        }
    }

    getEndPointByKey(key) {
        return this.EndPoints[key];
    }
}

export const endPoints = new EndPoints();