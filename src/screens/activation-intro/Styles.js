import React from 'react'
import {
    StyleSheet,
} from 'react-native';
import { COLORS, FONTSIZE } from '../../stylings';


export const Styles = StyleSheet.create({

    mainContainer: {
        flex: 1
    },

    image: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    button: {
        flexDirection: 'row',
        backgroundColor: COLORS.TRANSPARENT,
        alignSelf: 'stretch',
        height: 53,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.WHITE,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10
    },

    btnText: {
        fontSize: FONTSIZE.LARGE,
        color: COLORS.WHITE
    }

})