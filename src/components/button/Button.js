import React, { Component } from 'react';
import {
    TouchableOpacity,
    Text
} from 'react-native';
import { Styles } from './Styles';

class Button extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        let { buttonStyle, onPress, isDisabled } = this.props;

        return (
            <TouchableOpacity disabled={isDisabled} style={buttonStyle} onPress={() => onPress()}>
                {this.props.children}
            </TouchableOpacity>
        );
    }
}

export { Button };
