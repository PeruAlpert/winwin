import React from 'react'
import {
    StyleSheet,
} from 'react-native';
import { COLORS, FontSize } from '../../stylings';


export const Styles = StyleSheet.create({

    mainContainer: {
        width: '90%',
        backgroundColor: COLORS.TRANSPARENT
    },

    hideButton: {
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end',
        backgroundColor: COLORS.WHITE,
        paddingTop: 5,
        borderRadius: 10,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0
    },

    list: {
        flex: 1,
        backgroundColor: COLORS.WHITE,
        padding: 5,
        paddingRight: 0,
        paddingTop: 0,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.WHITE,
        borderTopRightRadius: 0
    },

    showBtn: {
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: COLORS.WHITE,
        paddingTop: 5,
        paddingRight: 15,
        borderRadius: 10,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0
    },

    loadingContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.WHITE,
        //position: 'absolute'
    },
})