import React, { Component } from 'react';
import {
    View,
    Text,
    ImageBackground,
    ActivityIndicator
} from 'react-native';
import I18n from "../../utils/language";
import { Styles } from './Styles';
import {
    InputText,
    Button,
} from '../../components';
import { COLORS } from '../../stylings';
import { ServiceProvider } from '../../controllers';
import { retrieveIntroScreen, retrieveUser, saveUser } from '../../utils/Storage';
import AsyncStorage from '@react-native-community/async-storage';

const backgroundImage = require('../../assets/images/background.jpg');

class Loading extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            loading: false,
            fetchedLang: false,
        }
    }

    async componentWillMount() {
        //I18n.locale
        try {
            const value = await AsyncStorage.getItem('@lang')
            if (value !== null) {
                I18n.locale = value
                this.setState({ language: value }, this.checkAllConfigurations)
            } else {
                I18n.locale = 'en'
                this.setState({ language: 'en' }, this.checkAllConfigurations)
            }
            this.setState({ fetchedLang: true })
        } catch (e) {
            alert(e)
            this.setState({ fetchedLang: true }) // nyway fadl 7aga tani kda?fe voice
            I18n.locale = 'en'
            this.setState({ language: 'en' })
        }

    }

    checkAllConfigurations() {
        let { navigation } = this.props;

        retrieveIntroScreen((isIntroEntered) => {
            if (isIntroEntered) {
                retrieveUser((user) => {
                    if (user) {
                        ServiceProvider.getSharedInstance().isExpired({ userId: user.Id }, (res, err) => {
                            if (res) {
                                user.IsActive = false
                                saveUser(user, (res) => {
                                    if (res) {
                                        navigation.navigate('Tab', { user });
                                    }
                                })
                            } else {
                                navigation.navigate('Tab', { user });
                            }
                        });
                    } else {
                        navigation.navigate('Auth');
                    }
                })
            } else {
                navigation.navigate('Intro');
            }
        })
    }



    renderLoading() {
        return (
            <ActivityIndicator style={{ position: 'absolute', top: 60, right: 0, left: 0 }} size='large' color={COLORS.WHITE} />
        );
    }

    render() {
        return (
            <View style={Styles.mainContainer}>
                <ImageBackground
                    style={Styles.backgroundImage}
                    source={backgroundImage}>
                    {this.renderLoading()}
                </ImageBackground>
            </View>
        );
    }
}

export { Loading };
