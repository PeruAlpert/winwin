import React from 'react'
import {
    StyleSheet,
} from 'react-native';
import { COLORS, FONTSIZE } from '../../stylings';


export const Styles = StyleSheet.create({

    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.WHITE
    },

    imageBackgroundContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 15
    },

    loadingContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },

    itemContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 15
    },

    itemRoundContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
        borderRadius: 50
    },

    itemActiveIcon: {
        width: 85,
        height: 85,
        backgroundColor: COLORS.BABY_BLUE
    },

    itemInactiveIcon: {
        width: 60,
        height: 60,
        backgroundColor: COLORS.SILVER
    },

    itemActiveText: {
        fontSize: 16,
        fontWeight: 'bold'
    },

    itemInactiveText: {
        fontSize: 12,
        fontWeight: 'normal'
    },

    aboutUsContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    aboutUsImage: {
        width: 80,
        height: 80,
        marginBottom: 10
    },

    aboutUsSocialMediaContainer: {
        flexDirection: 'row'
    },

    logoutBtn: {
        alignSelf: 'stretch',
        height: 25,
        marginRight: 100,
        marginLeft: 100,
        borderRadius: 20,
        backgroundColor: COLORS.BABY_BLUE,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },

    logoutText: {
        color: COLORS.WHITE,
        fontWeight: 'bold',
        fontSize: FONTSIZE.MEDIUM
    },

    profileContainer: {
        flex: 1,
        marginTop: 100,
        alignItems: 'center'
    },

    profileRowContainer: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        marginRight: 25,
        marginLeft: 25,
        marginBottom: 25
    },

    profileRowText: {
        fontWeight: 'bold',
        fontSize: FONTSIZE.LARGE
    }
})