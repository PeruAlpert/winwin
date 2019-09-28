import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    Image,
} from 'react-native';
import { Styles } from './Styles';
import { COLORS } from '../../stylings';

const headerBackground = require('../../assets/images/Restaurants_Header.png');

class Header extends Component {

    constructor(props, context) {
        super(props, context);
    }


    render() {
        let {
            rightIcon,
            leftIcon,
            title,
            leftIconStyle,
            rightIconStyle,
            leftIconOnPress,
            rightIconOnPress
        } = this.props;

        return (
            <ImageBackground style={Styles.mainContainer} source={headerBackground}>
                <View style={Styles.headerContainer}>
                    <TouchableOpacity style={Styles.iconsContainer} onPress={() => leftIconOnPress()}>
                        <Image style={leftIconStyle} source={leftIcon}></Image>
                    </TouchableOpacity>
                    <View style={Styles.titleContainer}>
                        <Text numberOfLines={2} style={Styles.title}>{title}</Text>
                    </View>
                    <TouchableOpacity style={Styles.iconsContainer} onPress={rightIconOnPress ? rightIconOnPress() : null}>
                        {rightIcon}
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        );
    }
}

export { Header };


