import React from 'react'
import {
    StyleSheet,
    Dimensions
} from 'react-native';
import { COLORS, FONTSIZE } from '../../stylings';


export const Styles = StyleSheet.create({

    mainContainer: {
        width: '100%',
        alignItems: 'center'
    },

    input: {
        width: '80%',
        color: COLORS.WHITE,
        fontSize: FONTSIZE.REGULAR,
        marginTop: 5
    },

    errorText: {
        paddingLeft: 5,
        width: '80%',
        color: COLORS.RED,
        fontSize: FONTSIZE.SMALL
    }
})