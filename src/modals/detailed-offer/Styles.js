import React from 'react'
import {
    StyleSheet,
} from 'react-native';

import { COLORS, FONTSIZE } from '../../stylings';


export const Styles = StyleSheet.create({

    mainContainer: {
        backgroundColor: "rgba(0,0,0,0.4)",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    offerContainer: {
        backgroundColor: 'white',
        alignItems: 'center',
        height: '68%',
        width: '90%',
        borderRadius: 20,
        paddingTop: 20,
        padding: 10
    }
});