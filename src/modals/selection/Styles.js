import React from 'react'
import {
    StyleSheet,
} from 'react-native';
import { COLORS } from '../../stylings';



export const Styles = StyleSheet.create({

    mainContainer: {
        backgroundColor: "rgba(0,0,0,0.4)",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    innerContainer: {
        width: '80%'
    },

    closeIcon: {
        alignSelf: 'flex-start'
    },

    itemContainer: {
        borderBottomWidth: 0
    },

    itemTitle: {
        fontSize: 17,
        color: COLORS.BLACK
    },

    flatListContainer: {
        backgroundColor: COLORS.WHITE,
        padding: 10,
        borderRadius: 10
    }
})