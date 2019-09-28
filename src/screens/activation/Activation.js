import React, { Component } from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    Dimensions,
    ImageBackground
} from 'react-native';
import { Header } from '../../components';
import { COLORS } from '../../stylings';
import { Styles } from './Styles';
const leftIcon = require('../../assets/images/Back.png');
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation'
import I18n from "../../utils/language";
import QrScanner from './tabs/QrScanner'
import QrManual from './tabs/QrManual'

const Tabs = createAppContainer(
    createMaterialTopTabNavigator({
        QrScanner: { screen: QrManual, navigationOptions: { title: I18n.t('qRSCANNER') } },
        QrManual: { screen: QrScanner, navigationOptions: { title: I18n.t('qRMANUAL') } }
    }, {
            initialRouteName: 'QrManual',
            swipeEnabled: true,
            tabBarOptions: {

                activeTintColor: COLORS.BABY_BLUE,
                inactiveTintColor: COLORS.BLACK,
                style: { backgroundColor: COLORS.WHITE }
            }
        })
)
class Activation extends Component {
    constructor(props) {
        super(props);
        this.state = {


        }
    }

    render() {
        let { navigation } = this.props;
        let headerTitle = navigation.getParam('headerTitle');

        return (
            <View style={{ flex: 1 }}>
                <Header
                    title={headerTitle}
                    leftIcon={leftIcon}
                    leftIconStyle={Styles.leftIcon}
                    leftIconOnPress={() => this.props.navigation.goBack()}
                />
                {
                    <Tabs />
                }
            </View>
        );
    }
}

export { Activation };