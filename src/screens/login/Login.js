import React, { Component } from 'react';
import {
    View,
    Text,
    ImageBackground,
    Image,
    ActivityIndicator,
    TouchableOpacity,
    Alert
} from 'react-native';
import I18n from "../../utils/language";// dia
import { Styles } from './Styles';
import AsyncStorage from '@react-native-community/async-storage';
import {
    InputText,
    Button,
} from '../../components';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../stylings';
import { Auth } from '../../controllers';
import { saveUser } from '../../utils';
import Toast from 'react-native-simple-toast';
import RNRestart from 'react-native-restart';

const backgroundImage = require('../../assets/images/background.jpg');
const logoImage = require('../../assets/images/white_logo.png');

class Login extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            language: 'en',
            loading: false,
            fetchedLang: false,
            inputs: {
                usrName: { value: "", isValid: true, errorMessage: "" },
                pass: { value: "", isValid: true, errorMessage: "" },
            }
        }
    }
    async componentWillMount() {
        //I18n.locale
        try {
            const value = await AsyncStorage.getItem('@lang')
            if (value !== null) {
                I18n.locale = value
                this.setState({ language: value })
            } else {
                I18n.locale = 'en'
                this.setState({ language: 'en' })
            }
            this.setState({ fetchedLang: true })
        } catch (e) {
            this.setState({ fetchedLang: true })
            I18n.locale = 'en'
            this.setState({ language: 'en' })
        }
    }

    renderLogo() {
        return (
            <Image
                resizeMode='contain'
                style={Styles.logo}
                source={logoImage} />
        )
    }

    onValueChange(key, newValue) {
        let { inputs } = this.state;
        let tempInputs = inputs;

        tempInputs[key].value = newValue;

        if (newValue == "") {
            tempInputs[key].isValid = false;
            tempInputs[key].errorMessage = I18n.t("required");
        } else {
            tempInputs[key].isValid = true;
            tempInputs[key].errorMessage = "";
        }

        this.setState({ inputs: tempInputs });
    }


    renderInputs() {
        let { usrName, pass } = this.state.inputs;

        return (
            <View style={Styles.inputContanier}>
                <View style={Styles.input}>
                    <InputText
                        placeholder={I18n.t("username")}
                        underlineColorAndroid={!usrName.isValid ? COLORS.RED : COLORS.WHITE}
                        onChangeText={(newValue) => this.onValueChange('usrName', newValue)}
                        errorMessage={usrName.errorMessage}
                    />
                </View>
                <InputText
                    placeholder={I18n.t("password")}
                    secureTextEntry={true}
                    underlineColorAndroid={!pass.isValid ? COLORS.RED : COLORS.WHITE}
                    onChangeText={(newValue) => this.onValueChange('pass', newValue)}
                    errorMessage={pass.errorMessage}
                />
            </View>
        )
    }

    isValidScreen() {
        let { usrName, pass } = this.state.inputs;
        let tempInputs = this.state.inputs;
        let isValidScreen = true;

        if (usrName.value == "") {
            tempInputs['usrName'].isValid = false;
            tempInputs['usrName'].errorMessage = I18n.t("required");
            this.setState({ inputs: tempInputs });
            isValidScreen = false;
        }
        if (pass.value == "") {
            tempInputs['pass'].isValid = false;
            tempInputs['pass'].errorMessage = I18n.t("required");
            this.setState({ inputs: tempInputs });
            isValidScreen = false;
        }

        return isValidScreen;
    }

    onPressLogin() {
        this.setState({ loading: true });

        let { usrName, pass } = this.state.inputs;
        let isValidScreen = this.isValidScreen();

        if (isValidScreen) {
            Auth.getSharedInstance().login({ usrName: usrName.value, pass: pass.value }, (res, err) => {
                if (!err) {
                    if (res.Message != undefined) {
                        Toast.show(res.Message, Toast.LONG);
                        this.setState({ loading: false });
                    } else {
                        saveUser(res, (isUserStored) => {
                            if (isUserStored) {
                                this.props.navigation.navigate('Tab', { user: res });
                            } else {
                                Toast.show("Can't store user to storage", Toast.SHORT);
                                this.setState({ loading: false });
                            }
                        });
                    }
                } else {
                    this.setState({ loading: false })
                }
            })
        } else {
            this.setState({ loading: false })
        }

    }

    renderButton() {
        let { loading } = this.state;

        return (
            <Button isDisabled={loading} buttonStyle={Styles.button} onPress={() => this.onPressLogin()} >
                {loading ?
                    <ActivityIndicator size='large' color={COLORS.BABY_BLUE} />
                    :
                    <Icon name="ios-arrow-round-forward" size={45} color={COLORS.BABY_BLUE} />
                }
            </Button>
        )
    }


    handleLanguage = async () => {
        if (this.state.language == 'en') {
            try {
                await AsyncStorage.setItem('@lang', 'ar')
                RNRestart.Restart();
            } catch (e) {
                // saving error
            }
        } else {
            try {
                await AsyncStorage.setItem('@lang', 'en')
                RNRestart.Restart();
            } catch (e) {
                // saving error
            }
        }
        this.setState({ language: this.state.language == 'ar' ? 'en' : 'ar' })
    }

    render() {
        let { navigation } = this.props;
        if (this.state.fetchedLang) {
            return (
                <View style={Styles.mainContainer}>
                    <ImageBackground
                        style={Styles.backgroundImage}
                        source={backgroundImage}>
                        {this.renderLogo()}
                        {this.renderInputs()}
                        {this.renderButton()}
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Signup')}
                            style={Styles.signUpContainer}
                        >
                            <Text style={Styles.signUp}>{I18n.t("signUp")}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.handleLanguage}>
                            <Text style={{ color: 'white', padding: 20, textDecorationLine: 'underline', fontSize: 20 }}>{this.state.language == 'en' ? 'العربيه' : 'English'}</Text>
                        </TouchableOpacity>

                    </ImageBackground>
                </View>
            );
        } else {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator />
                </View>
            )
        }
    }
}

export { Login };
