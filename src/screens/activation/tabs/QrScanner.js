import React, { Component } from 'react';
import { Text, View, ActivityIndicator, Dimensions, ImageBackground, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { InputText, Button, Header } from '../../../components';
import { Auth, ServiceProvider } from '../../../controllers';
import { retrieveUser, saveUser } from '../../../utils';
import { QrScanner } from '../../qr-scanner/QrScanner';
import { COLORS } from '../../../stylings';
import Toast from 'react-native-simple-toast';
import { Styles } from './../Styles';
import RNRestart from 'react-native-restart';
const backgroundImage = require('../../../assets/images/background.jpg');
import I18n from "../../../utils/language";
const DURATION = 10000;
export default class HelloWorldApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            qrResult: "",
            loading: false
        }
    }
    static navigationOptions = ({ navigation }) => {
        return {
            header: null
        };
    }
    handleIndexChange = index => this.setState({ index });
    onChangeQrCode(qrResult) {
        this.setState({
            qrResult
        })
    }
    interval;

    activateAccount(qrResult) {
        let { navigation } = this.props;

        this.setState({ loading: true });

        retrieveUser((user) => {
            if (user) {
                // SP get User Orders
                if (user.IsBranch) {
                    ServiceProvider.getSharedInstance().getUserOrder({ qrResult, branchId: user.Id }, (res, err) => {

                        console.log(branchId)
                        if (!err) {
                            if (res.Message != undefined) {
                                Toast.show(res.Message, Toast.LONG);
                                this.setState({ loading: false });
                            } else {
                                this.props.navigation.state.params.toggleSPOfferModal();
                                this.setState({ loading: false });
                                res.length <= 0 ? Toast.show('User has no offers', Toast.SHORT) : null;
                                navigation.navigate('Main', { userOrders: res });
                            }
                        } else {
                            Toast.show('Failed To Get user orders', Toast.LONG);
                            this.setState({ loading: false });
                        }
                    });
                    // User Activation
                } else {
                    Auth.getSharedInstance().activateAccount({ qrResult, userID: user.Id }, (res, err) => {
                        if (!err) {
                            if (res.Message != undefined) {
                                Toast.show(res.Message, Toast.LONG);
                                this.setState({ loading: false });
                            } else {
                                Toast.show('Account Activated Successfully', Toast.LONG);
                                let tempUser = user;
                                tempUser.IsActive = true;

                                saveUser(tempUser, (isUserSaved) => {
                                    if (isUserSaved) {
                                        navigation.navigate('Main', { user: tempUser });
                                    } else {
                                        console.log('Cannot Save User To LocalStorage');
                                    }
                                    this.setState({ loading: false });
                                    RNRestart.Restart();
                                });
                            }
                        } else {
                            Toast.show('Failed To Activate Account', Toast.LONG);
                            this.setState({ loading: false });
                        }
                    });
                }

            } else {
                console.log('Error Cannot Retrieve User');
                this.setState({ loading: false });
            }
        })

    }

    render() {
        let { loading } = this.state;
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ImageBackground style={Styles.image} source={backgroundImage}>
                    <InputText
                        placeholder={I18n.t("ativationcode")}
                        placeholderTextColor={COLORS.WHITE}
                        onChangeText={(newQrResult) => this.onChangeQrCode(newQrResult)}
                    />
                    <Button
                        isDisabled={loading}
                        onPress={() => this.activateAccount(this.state.qrResult)}
                        buttonStyle={Styles.button} >
                        {loading ?
                            <ActivityIndicator size='large' color={COLORS.BABY_BLUE} />
                            :
                            <Icon name="ios-arrow-round-forward" size={45} color={COLORS.BABY_BLUE} />
                        }
                    </Button>
                </ImageBackground>
            </View>
        );
    }
}