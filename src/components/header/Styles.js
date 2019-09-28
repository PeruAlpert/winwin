import React from 'react'
import {
    StyleSheet,
    Dimensions
} from 'react-native';
import { COLORS, FONTSIZE } from '../../stylings';
let { width, height } = Dimensions.get('window');



export const Styles = StyleSheet.create({

    mainContainer: {
        height: 90,
        width: '100%',
        justifyContent: 'center'
    },

    headerContainer: {
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    iconsContainer: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },

    titleContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        width: width - 130
    },

    title: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: FONTSIZE.REGULAR,
        color: COLORS.BLACK,
    },


})