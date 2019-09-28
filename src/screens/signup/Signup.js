import React, { Component } from 'react';
import {
    View,
    ActivityIndicator,
    ImageBackground,
    TouchableOpacity,
    Image,
    ScrollView,
} from 'react-native';
import I18n from "../../utils/language";
import { Styles } from './Styles';
import {
    InputText,
    Button,
} from '../../components';
import { Auth } from '../../controllers';
import { saveUser } from '../../utils';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../stylings';
import Toast from 'react-native-simple-toast';

const backgroundImage = require('../../assets/images/background.jpg');
const logoImage = require('../../assets/images/white_logo.png');

class Signup extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            loading: false,
            inputs: {
                usrName: { value: "", isValid: true, errorMessage: "" },
                email: { value: "", isValid: true, errorMessage: "" },
                phone: { value: "", isValid: true, errorMessage: "" },
                pass: { value: "", isValid: true, errorMessage: "" },
                confirmPass: { value: "", isValid: true, errorMessage: "" }
            }
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


    renderInputs() {
        let { usrName, email, phone, pass, confirmPass } = this.state.inputs;

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
                <View style={Styles.input}>
                    <InputText
                        placeholder={I18n.t("email")}
                        keyboardType={'email-address'}
                        underlineColorAndroid={!email.isValid ? COLORS.RED : COLORS.WHITE}
                        onChangeText={(newValue) => this.onValueChange('email', newValue)}
                        errorMessage={email.errorMessage}
                    />
                </View>
                <View style={Styles.input}>
                    <InputText
                        placeholder={I18n.t("phone")}
                        keyboardType={'numeric'}
                        underlineColorAndroid={!phone.isValid ? COLORS.RED : COLORS.WHITE}
                        onChangeText={(newValue) => this.onValueChange('phone', newValue)}
                        errorMessage={phone.errorMessage}
                    />
                </View>
                <View style={Styles.input}>
                    <InputText
                        placeholder={I18n.t("password")}
                        secureTextEntry={true}
                        underlineColorAndroid={!pass.isValid ? COLORS.RED : COLORS.WHITE}
                        onChangeText={(newValue) => this.onValueChange('pass', newValue)}
                        errorMessage={pass.errorMessage}
                    />
                </View>
                <View style={Styles.input}>
                    <InputText
                        placeholder={I18n.t("confirm")}
                        secureTextEntry={true}
                        underlineColorAndroid={!confirmPass.isValid ? COLORS.RED : COLORS.WHITE}
                        onChangeText={(newValue) => this.onValueChange('confirmPass', newValue)}
                        errorMessage={confirmPass.errorMessage}
                    />
                </View>

            </View>
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

    isValidScreen() {
        let { usrName, email, phone, pass, confirmPass } = this.state.inputs;
        let tempInputs = this.state.inputs;
        let isValidScreen = true;

        if (usrName.value == "") {
            tempInputs['usrName'].isValid = false;
            tempInputs['usrName'].errorMessage = I18n.t("required");
            this.setState({ inputs: tempInputs });
            isValidScreen = false;
        }
        if (email.value == "") {
            tempInputs['email'].isValid = false;
            tempInputs['email'].errorMessage = I18n.t("required");
            this.setState({ inputs: tempInputs });
            isValidScreen = false;
        } else if (!email.value.includes('@') || !email.value.includes('.')) {
            tempInputs['email'].isValid = false;
            tempInputs['email'].errorMessage = "*Invalid Email Address";
            this.setState({ inputs: tempInputs });
            isValidScreen = false;
        }
        if (phone.value == "") {
            tempInputs['phone'].isValid = false;
            tempInputs['phone'].errorMessage = I18n.t("required");
            this.setState({ inputs: tempInputs });
            isValidScreen = false;
        } else if (phone.value.length != 11) {
            tempInputs['phone'].isValid = false;
            tempInputs['phone'].errorMessage = "*Invalid Phone Number";
            this.setState({ inputs: tempInputs });
            isValidScreen = false;
        }
        if (pass.value == "") {
            tempInputs['pass'].isValid = false;
            tempInputs['pass'].errorMessage = I18n.t("required");
            this.setState({ inputs: tempInputs });
            isValidScreen = false;
        }
        if (confirmPass.value == "") {
            tempInputs['confirmPass'].isValid = false;
            tempInputs['confirmPass'].errorMessage = I18n.t("required");
            this.setState({ inputs: tempInputs });
            isValidScreen = false;
        }
        if (pass.value != confirmPass.value) {
            tempInputs['confirmPass'].isValid = false;
            tempInputs['confirmPass'].errorMessage = "*Confirm Password Doesn't match Password";
            this.setState({ inputs: tempInputs });
            isValidScreen = false;
        }

        return isValidScreen;
    }

    onPressSignUp() {
        this.setState({ loading: true });

        let { usrName, email, phone, pass } = this.state.inputs;
        let isValidScreen = this.isValidScreen();

        if (isValidScreen) {
            Auth.getSharedInstance().signUp({ usrName: usrName.value, email: email.value, phone: phone.value, pass: pass.value }, (res, err) => {
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
                    this.setState({ loading: false });
                }
            })
        } else {
            this.setState({ loading: false });
        }
    }

    renderButton() {
        let { loading } = this.state;

        return (
            <Button isDisabled={loading} buttonStyle={Styles.button} onPress={() => this.onPressSignUp()} >
                {loading ?
                    <ActivityIndicator size='large' color={COLORS.BABY_BLUE} />
                    :
                    <Icon name="ios-arrow-round-forward" size={45} color={COLORS.BABY_BLUE} />
                }
            </Button>
        )
    }

    renderBackButton() {
        let { navigation } = this.props;

        return (
            <TouchableOpacity style={Styles.backButtonContainer} onPress={() => navigation.goBack()}>
                <Icon name='ios-arrow-back' size={25} color={COLORS.WHITE} />
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style={Styles.mainContainer}>
                <ImageBackground
                    style={Styles.backgroundImage}
                    source={backgroundImage}>
                    {this.renderBackButton()}
                    {this.renderLogo()}
                    <ScrollView style={Styles.input}>
                        {this.renderInputs()}
                        {this.renderButton()}
                    </ScrollView>

                </ImageBackground>
            </View>
        );
    }
}

export { Signup };


