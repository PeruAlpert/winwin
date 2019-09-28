import React, { components } from 'react';
import { createStackNavigator, createBottomTabNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
import {
    Main,
    Login,
    Signup,
    QrScanner,
    BranchesAndOffers,
    Favorite,
    Profile,
    Notification,
    Activation,
    ActivationIntro,
    Intro,
    Loading
} from '../screens';
import { TabBar } from '../components';

//level 3

const BrandNavigator = createStackNavigator({
    Main: { screen: Main },
    Branches: { screen: BranchesAndOffers },
    Offers: { screen: BranchesAndOffers },
    Activation: { screen: Activation, navigationOptions: { header: null } },
    ActivationIntro: { screen: ActivationIntro }
}, {
        initialRouteName: 'Main',
        headerMode: 'screen'
    })

const FavoriteNavigator = createStackNavigator({
    Favorite: { screen: Favorite }
}, {
        headerMode: 'none'
    })

// const OrdersNavigator = createStackNavigator({
//     orders: { screen: Activation }
// }, {
//         headerMode: 'screen'
//     })

const NotificationNavigator = createStackNavigator({
    notification: { screen: Notification }
}, {
        headerMode: 'none'
    })

const ProfileNavigator = createStackNavigator({
    Profile: { screen: Profile }
}, {
        headerMode: 'none'
    })

//level 2
const CustomTabNavigator = createBottomTabNavigator({
    Main: {
        screen: BrandNavigator,
    },
    Favorite: {
        screen: FavoriteNavigator,
    },
    Orders: {
        screen: BrandNavigator,
    },
    Profile: {
        screen: ProfileNavigator,
    },
    Notification: {
        screen: NotificationNavigator,
    }

}, {
        tabBarComponent: TabBar,
        initialRouteName: 'Main',
        headerMode: 'screen',
        tabBarPosition: 'bottom',
        swipeEnabled: false,
        animationEnabled: false
    })

const AuthStackNavigator = createStackNavigator({
    Login: { screen: Login },
    Signup: { screen: Signup },
    Main: { screen: BrandNavigator, },
},
    {
        headerMode: 'none',
        initialRouteName: 'Login',
    })


//level 1
const MainStackNavigator = createSwitchNavigator({
    Loading: { screen: Loading },
    Intro: { screen: Intro },
    Auth: { screen: AuthStackNavigator },
    Tab: { screen: CustomTabNavigator }
},
    {
        initialRouteName: 'Loading',
        headerMode: 'none'
    }
);

export default createAppContainer(MainStackNavigator);