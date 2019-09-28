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

    inputContanier: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginVertical: 10,

    },
    input: {
        width: '100%', marginVertical: 20
    },
    logo: {
        marginTop: 50,
        height: 63,
        width: 80,
        marginVertical: 20,
    },

    loginSignupContanier: {
        width: 80,
        height: 30,
        borderRadius: 100,
        borderWidth: 1.5,
        borderColor: COLORS.WHITE,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },

    loginSignupText: {
        fontSize: FONTSIZE.MEDIUM,
        color: COLORS.WHITE,
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

    signUpContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: COLORS.BABY_BLUE,
        marginTop: 20,
        paddingHorizontal: 23,
        paddingVertical: 8,

    },

    signUp: {
        fontSize: FONTSIZE.REGULAR,
        color: COLORS.WHITE,
        borderColor: COLORS.WHITE,
        borderBottomWidth: 1
    }
})