import React from 'react'
import {
    StyleSheet,
} from 'react-native';
import { COLORS, FONTSIZE } from '../../stylings';


export const Styles = StyleSheet.create({

    mainContainer: {
        flex: 1,
    },

    backgroundImage: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },

    logo: {
        marginTop: 50,
        height: 63,
        width: 80,
    },

    description: {
        paddingLeft: 15,
        paddingVertical: 30,
        color: COLORS.WHITE,
        fontSize: FONTSIZE.REGULAR,
        marginBottom: 30
    },

    image: {
        width: 200,
        height: 150,
        borderRadius: 10
    },

    skipText: {
        color: COLORS.WHITE,
        position: 'absolute',
        bottom: 10,
        right: 10,
        fontSize: FONTSIZE.LARGE
    }

})