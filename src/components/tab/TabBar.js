import React, { Component } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, AppRegistry, Image } from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import { Styles } from './Styles';
import { COLORS } from '../../stylings';
import Icon from 'react-native-vector-icons/Ionicons';

const imageMap = {
  'Main': require('../../assets/images/Home.png'),
  'Orders': require('../../assets/images/Orders.png'),
  'Profile': require('../../assets/images/Account.png'),
  'Notification': require('../../assets/images/Notification.png')
}

class TabBar extends Component {
  constructor(props, context) {
    super(props, context);
  }

  renderIcon({ route, index, focused, tintColor }) {
    let iconStyle = (index == 2) ? Styles.basketIcon : Styles.icon;

    if (index == 1) {
      return (
        <Icon
          name="md-heart"
          size={25}
          color={focused ? COLORS.RED : COLORS.LIGHT_GREY} />
      )
    } else {
      return (
        <Image source={imageMap[route.key]} style={[iconStyle, focused ? { tintColor: COLORS.BABY_BLUE } : null]} />
      );
    }
  }

  render() {

    const {
      navigation,
      activeTintColor,
      inactiveTintColor,
      jumpToIndex
    } = this.props;

    const {
      routes
    } = navigation.state;

    let { user } = this.props.navigation.state.params;

    return (
      <View style={Styles.tabbar}>

        {routes && routes.map((route, index) => {
          const focused = index === navigation.state.index;
          const tintColor = focused ? activeTintColor : inactiveTintColor;
          const routeName = route.key;
          console.log('routes', routes)

          if (!(user.IsBranch && (index == 1 || index == 2 || index == 4))) {
            return (
              <TouchableWithoutFeedback
                key={route.key}
                style={Styles.tab}
                //onLongPress={() => index == 2 ? EventRegister.emit('toggleOfferModal') : navigation.navigate(routeName)}
                onPress={() => (index == 2) ? EventRegister.emit('toggleOfferModal', { key: routes[this.props.navigation.state.index].key }) : navigation.navigate(routeName)}
              >
                <View style={Styles.tab}>
                  {this.renderIcon({
                    route,
                    index,
                    focused,
                    tintColor
                  })}
                </View>
              </TouchableWithoutFeedback>
            );
          }
        })}

      </View>
    );
  }
}

export { TabBar };