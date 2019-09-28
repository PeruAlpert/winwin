import React from 'react'
import {
    StyleSheet,
} from 'react-native';
import { COLORS, FONTSIZE } from '../../stylings';


export const Styles = StyleSheet.create({
    leftIcon: {
        width: 10,
        height: 20
    },

    image: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    button: {
        width: 110,
        height: 45,
        backgroundColor: COLORS.WHITE,
        borderRadius: 20,
        marginTop: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },

    tab: {
        backgroundColor: COLORS.WHITE,
        height: 45
    }
})