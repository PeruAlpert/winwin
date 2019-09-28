import React, { Component } from 'react';
import {
    TouchableOpacity,
    View
} from 'react-native';
import { Styles } from './Styles';
import { COLORS } from '../../stylings';
import Icon from 'react-native-vector-icons/Ionicons';


class ActivationButton extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
        }
    }

    render() {
        let { navigation } = this.props;

        return (
            <TouchableOpacity onPress={() => navigation.navigate('ActivationIntro')} style={Styles.mainContainer}>
                <Icon name={"ios-qr-scanner"} size={25} color={COLORS.WHITE} />
            </TouchableOpacity>
        );
    }
}

export { ActivationButton };


