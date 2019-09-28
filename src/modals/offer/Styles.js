import React from 'react'
import {
    StyleSheet,
} from 'react-native';

import { COLORS ,FONTSIZE } from '../../stylings';


export const Styles = StyleSheet.create({

    mainContainer: {
        backgroundColor: "rgba(0,0,0,0.4)",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    offerContainer: {
        backgroundColor: 'white',
        justifyContent: 'center',
        height: '60%',
        width: '90%',
        borderRadius: 20,
        padding: 10
        //alignItems: 'center'
    },
    confirmCancelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop:10
    },
    confirmButton: {
        backgroundColor: COLORS.BABY_BLUE,
        borderRadius: 20,
        height: 35,
        width: '45%',
        justifyContent: 'center'
    },
    cancelButton: {
        backgroundColor: COLORS.WHITE,
        borderRadius: 20,
        borderWidth:2,
        borderColor:COLORS.BABY_BLUE,
        height: 35,
        width: '48%',
        justifyContent: 'center'
    },
    CloseButton: {
        backgroundColor: COLORS.WHITE,
        borderRadius: 20,
        borderWidth:2,
        borderColor:COLORS.BABY_BLUE,
        height: 35,
        width: '48%',
        marginTop:30,
        alignItems:'center',
        justifyContent:'center'
    },
    confirmText: {
        color: COLORS.WHITE,
        alignSelf: 'center',
        fontSize:FONTSIZE.REGULAR
    },
    cancelText: {
        color: COLORS.BABY_BLUE,
        alignSelf: 'center',
        fontSize:FONTSIZE.REGULAR        
    },
    
})