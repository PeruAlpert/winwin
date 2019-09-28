import React, { Component } from 'react';
import {
    View,
    TextInput,
    Text
} from 'react-native';
import { Styles } from './Styles';
import { COLORS } from '../../stylings';

class InputText extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            color: COLORS.WHITE
        }
    }

    render() {

        let {
            placeholder,
            keyboardType,
            secureTextEntry,
            underlineColorAndroid,
            placeholderTextColor,
            onChangeText,
            value,
            errorMessage,
            style
        } = this.props;

        return (
            <View style={Styles.mainContainer}>
                <TextInput
                    value={value}
                    underlineColorAndroid={underlineColorAndroid ? underlineColorAndroid : this.state.color}
                    placeholderTextColor={placeholderTextColor ? placeholderTextColor : COLORS.WHITE}
                    selectionColor={COLORS.WHITE}
                    autoCorrect={false}
                    onBlur={() => { this.setState({ color: COLORS.WHITE }) }}
                    onFocus={() => { this.setState({ color: COLORS.BABY_BLUE }) }}
                    onChangeText={(newValue) => onChangeText(newValue)}
                    style={style ? style : Styles.input}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry}
                    placeholder={placeholder} />
                {errorMessage ?
                    <Text style={Styles.errorText}>{errorMessage}</Text>
                    : null
                }
            </View>
        );
    }
}

export { InputText };


