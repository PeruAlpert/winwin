import React from 'react'
import {
    StyleSheet,
    Dimensions
} from 'react-native';
import { COLORS, FONTSIZE } from '../../stylings';

let { width, height } = Dimensions.get('window');


export const Styles = StyleSheet.create({

    mainContainer: {
        backgroundColor: COLORS.WHITE,
        alignSelf: 'stretch',
    },

    innerContainer: {
        backgroundColor: COLORS.WHITE,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10
    },

    image: {
        width: 70,
        height: 70,
        borderRadius: 10,

    },

    defaultContainer: {
        flexDirection: 'row',
        flex: 0.9
    },

    titleDescContainer: {
        flex: 1,
        marginLeft: 10
    },

    title: {
        fontSize: 15,
        fontWeight: 'bold'
    },

    description: {
        fontSize: 12,
        marginTop: 10
    },

    priceOuterContainer: {
        flexDirection: 'row',
        height: 20,
        borderColor: COLORS.BABY_BLUE,
        borderRadius: 20,
        borderWidth: 1,
        marginTop: 5,

    },

    priceInnerContainer: {
        justifyContent: 'center',
        alignItems: 'center',

    },

    newPrice: {
        flex: 0.55,
        backgroundColor: COLORS.BABY_BLUE,
        borderColor: COLORS.BABY_BLUE,
        borderRadius: 20,
        borderWidth: 1,
    },

    oldPrice: {
        flex: 0.45
    },

    pricesText: {
        fontSize: 12
    },

    line: {
        borderColor: COLORS.SILVER,
        borderBottomWidth: 0.7,
        marginRight: 20,
        marginLeft: 20
    },

    limitView: {
        backgroundColor: COLORS.RED,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 7,
        paddingHorizontal: 5,
        marginRight: 5
    },

    counterView: {
        alignSelf: 'flex-end',
        borderColor: COLORS.DARK_GREY,
        borderRadius: 7,
        borderWidth: 0.8,
        paddingHorizontal: 7,
        paddingVertical: 5,
        alignItems: 'center'
    },

    counterText: {
        fontSize: FONTSIZE.MEDIUM,
        color: COLORS.BABY_BLUE
    },

    numberOfRequestsText: {
        fontSize: FONTSIZE.REGULAR,
        color: COLORS.WHITE,
        backgroundColor: COLORS.BABY_BLUE,
        paddingHorizontal: 7,
        paddingVertical: 5,
        borderRadius: 5
    },

    favIcon: {
        alignSelf: 'center',
        paddingRight: 10
    }
})