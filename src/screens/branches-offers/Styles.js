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

    loadingContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.TRANSPARENT,
        //position: 'absolute'
    },

    leftIcon: {
        width: 10,
        height: 20
    },

    noResultContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }

})