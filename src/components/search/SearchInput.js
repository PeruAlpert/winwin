import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Image,
} from 'react-native';
import { Styles } from './Styles';
import { COLORS } from '../../stylings';
import { InputText } from '../'

const search = require('../../assets/images/Search.png');
const filter = require('../../assets/images/Menu.png');

class SearchInput extends Component {

    constructor(props, context) {
        super(props, context);
    }


    render() {
        let { value, placeholderText, onPress, onChangeText, hasFilter, onPressFilter } = this.props;

        return (
            <View style={Styles.mainContainer}>
                {hasFilter ?
                    <TouchableOpacity style={[Styles.searchIconContainer, { paddingHorizontal: 5 }]} onPress={() => onPressFilter()}>
                        <Image style={Styles.searchIcon} source={filter} />
                    </TouchableOpacity>
                    : null
                }
                <TextInput
                    value={value}
                    placeholder={placeholderText ? placeholderText : ''}
                    underlineColorAndroid={COLORS.TRANSPARENT}
                    placeholderTextColor={COLORS.DARK_GREY}
                    onChangeText={(newQuery) => onChangeText(newQuery)}
                    style={Styles.search} />
                <TouchableOpacity style={Styles.searchIconContainer} onPress={() => onPress()}>
                    <Image style={Styles.searchIcon} source={search} />
                </TouchableOpacity>
            </View>
        );
    }
}

export { SearchInput };


