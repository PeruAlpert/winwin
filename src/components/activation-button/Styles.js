import React from 'react'
import {
    StyleSheet,
    Dimensions
} from 'react-native';
import { COLORS, FONTSIZE } from '../../stylings';


export const Styles = StyleSheet.create({

    mainContainer: {
        width: 50,
        height: 50,
        position: 'absolute',
        zIndex: 1,
        marginRight: 5,
        padding: 15,
        borderRadius: 50,
        right: 0,
        top: '32%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.BABY_BLUE
    }
})