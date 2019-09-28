import React, {Component} from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import styles from './styles';
import colors from '../../constants/colors';
import Back from '../../components/back';
import i18n from '../../utils/language';
import Server from '../../constants/server';
const {api_url} = Server;
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
export default class HelloWorldApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      isLoading: false,
    };
  }
  reset = () => {
    this.setState({...this.state, isLoading: true});
    axios({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      url: `${api_url}/Users/ForgetPassword?`,
      params: {
        mail: this.state.email,
      },
    })
      .then(responseJson => {
        console.log(responseJson.data);
        alert('check your account');
        this.props.navigation.navigate('Login');
        this.setState({...this.state, isLoading: false});
      })

      .catch(error => {
        this.setState({...this.state, isLoading: false});
        alert('wrong Mail');
      });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            flex: 0.6,
            backgroundColor: '#2e6cff',
            borderBottomLeftRadius: 100,
          }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={{
              flex: 0.1,
              height: 30,
              width: 30,
              backgroundColor: 'white',
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 2,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              left: 10,
              top: 10,
              elevation: 5,
            }}>
            <Ionicons
              onPress={() => this.props.navigation.goBack()}
              name="ios-arrow-back"
              size={24}
              color={colors.primary}
              style={{right: 1}}
            />
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../assets/win.png')}
              style={{width: 105, height: 80}}
              resizeMode="stretch"
            />
          </View>
        </View>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <TextInput
            style={styles.textinpute}
            placeholder={i18n.t('email')}
            autoCapitalize="none"
            placeholderTextColor={colors.Grey}
            onSubmitEditing={() => this._button && this.reset()}
            onChangeText={text => this.setState({email: text})}
          />
          <TouchableOpacity
            ref={ref => {
              this._button = ref;
            }}
            onPress={() => this.reset()}
            style={[styles.button, {marginTop: 20}]}>
            {this.state.fetching ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.textButton}>{i18n.t('resetPassword')}</Text>
            )}
          </TouchableOpacity>
        </View>
        {/* <TextInput
          style={styles.textinpute}
          placeholder={i18n.t("email")}
          autoCapitalize="none"
          placeholderTextColor={colors.primary}
          onChangeText={text => this.setState({ email: text })}
        />
        <TouchableOpacity onPress={() => this.reset()} style={styles.button}>
          {this.state.fetching ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.textButton}>{i18n.t("resetPassword")}</Text>
          )}
        </TouchableOpacity> */}
      </SafeAreaView>
    );
  }
}
