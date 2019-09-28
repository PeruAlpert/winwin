import React, {Component} from 'react';
import {Dimensions, SafeAreaView} from 'react-native';
import styles from './styles';
import Colors from '../../constants/colors';
import i18n from '../../utils/language';
const {width, height} = Dimensions.get('window');
import {
  createMaterialTopTabNavigator,
  createAppContainer,
} from 'react-navigation';
import Upcomming from './tabs/upcoming';
import History from './tabs/history';
const Tabs = createAppContainer(
  createMaterialTopTabNavigator(
    {
      Upcomming: {
        screen: Upcomming,
        navigationOptions: {title: i18n.t('upcoming')},
      },
      History: {
        screen: History,
        navigationOptions: {title: i18n.t('history')},
      },
    },
    {
      initialRouteName: 'Upcomming',
      swipeEnabled: true,
      animationEnabled: true,
      tabBarOptions: {
        activeTintColor: Colors.primary,
        showIcon: false,
        upperCaseLabel: false,
        indicatorStyle: {backgroundColor: Colors.primary},
        inactiveTintColor: Colors.Grey,
        scrollEnabled: true,
        allowFontScaling: true,
        tabStyle: {
          height: 55,
          width: width * 0.5,
          backgroundColor: Colors.skyBlue,
        },
        labelStyle: {fontSize: 20},
        style: {backgroundColor: Colors.white},
      },
    },
  ),
);
export default class HelloWorldApp extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Tabs />
      </SafeAreaView>
    );
  }
}
