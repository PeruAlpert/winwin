import React, { Component } from 'react';
import {
    View,
    Text,
} from 'react-native';
import { COLORS } from '../../stylings';
import I18n from "../../utils/language";

class Notification extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: COLORS.WHITE, justifyContent: 'center', alignItems: 'center' }}>
                <Text>{I18n.t("notification")}</Text>
            </View>
        );
    }
}

export { Notification };
