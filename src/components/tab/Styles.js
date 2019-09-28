import React from 'react'
import {
    StyleSheet,
} from 'react-native';
import { COLORS } from '../../stylings';



export const Styles = StyleSheet.create({
    icon: {
        width: 20,
        height: 20
    },
    basketIcon:{
        width: 60,
        height: 60
    },
    tabbar: {
        height: 70,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tab: {
        alignSelf: 'stretch',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    }
})