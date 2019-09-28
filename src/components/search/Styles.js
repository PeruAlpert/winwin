import React from 'react'
import {
    StyleSheet,
} from 'react-native';
import { COLORS } from '../../stylings';



export const Styles = StyleSheet.create({

    mainContainer: {
        justifyContent: 'space-between',
        borderColor: COLORS.LIGHT_GREY,
        borderWidth: 0.2,
        borderRadius: 20,
        marginLeft: 20,
        marginRight: 20,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: COLORS.WHITE,
        alignItems: 'center',
        flexDirection: 'row',
        shadowOffset: { width: 5, height: 5 },
        shadowColor: COLORS.DARK_GREY,
        shadowOpacity: 0.2,
        elevation: 3
    },
    search: {
        color: COLORS.DARK_GREY,
        width: '85%'
    },
    searchIconContainer: {
        flex: 1,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchIcon: {
        height: 15,
        width: 15
    }
})