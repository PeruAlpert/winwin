import React from 'react'
import {
    StyleSheet,
    Dimensions,
    Platform
} from 'react-native';
import { COLORS, FONTSIZE } from '../../stylings';

let { width, height } = Dimensions.get('window')

export const Styles = StyleSheet.create({

    mainContainer: {
        flex: 1
    },

    loadingFailMap: {
        zIndex: -1,
        height: '100%',
        width: '100%',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 45,
        right: 0,
        left: 0
    },

    userContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    serviceProviderContainer: {
        flex: 1,
        backgroundColor: COLORS.WHITE
    },

    spScanContainer: {
        backgroundColor: COLORS.WHITE,
        padding: 10
    },

    spScanBtn: {
        height: 25,
        borderRadius: 20,
        backgroundColor: COLORS.BABY_BLUE,
        justifyContent: 'center',
        alignItems: 'center'
    },

    spBtnText: {
        fontWeight: 'bold',
        fontSize: FONTSIZE.MEDIUM,
        color: COLORS.WHITE
    },

    loadingContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.WHITE,
        justifyContent: 'center',
        alignItems: 'center'
    },

    categoriesContainer: {
        height: '50%',
        width: '95%',
        marginTop: 15
    },

    categoryInnerContainer: {
        flexDirection: 'row',
        backgroundColor: COLORS.TRANSPARENT,
        alignItems: 'center'
    }

})