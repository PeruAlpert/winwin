import React, { Component } from 'react';
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Linking
} from 'react-native';
import { COLORS } from '../../stylings';
import { Styles } from './Styles';
import Icon from 'react-native-vector-icons/Ionicons';
import Communications from 'react-native-communications';

const backgroundImage = require('../../assets/images/background.jpg');
import I18n from "../../utils/language";
class ActivationIntro extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            header: null
        };
    }

    dial(url) {
        Communications.phonecall('01141313114', false)
        // Linking.canOpenURL(url).then(supported => {
        //     if (!supported) {
        //         console.log('Not Supported Url: ', url);
        //     } else {
        //         return Linking.openURL(url);
        //     }
        // }).catch(err => console.log('Error', err))
    }

    render() {
        let { navigation } = this.props;

        return (
            <View style={Styles.mainContainer}>
                <ImageBackground style={Styles.image} source={backgroundImage}>
                    <TouchableOpacity style={Styles.button} onPress={() => this.dial('tel:01141313114')}>
                        <Icon style={{ right: 20 }} name={"ios-call"} size={25} color={COLORS.WHITE} />
                        <Text style={Styles.btnText}>{I18n.t("orderNow")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Styles.button} onPress={() => navigation.navigate('Activation', { headerTitle: I18n.t("aCTIVATEYOURACCOUNT") })}>
                        <Icon style={{ right: 20 }} name={"ios-qr-scanner"} size={25} color={COLORS.WHITE} />
                        <Text style={Styles.btnText}>{I18n.t("activeNow")}</Text>
                    </TouchableOpacity>
                </ImageBackground>
            </View>
        );
    }
}

export { ActivationIntro };