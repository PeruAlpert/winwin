import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
const {width, height} = Dimensions.get('window');
import {EDIT_USER} from '../../store/CONSTANTS';
import {DatePicker} from 'native-base';
import styles from './styles';
import colors from '../../constants/colors';
import Back from '../../components/back';
import Server from '../../constants/server';
const {api_url} = Server;
import i18n from '../../utils/language';
import {connect} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
class HelloWorldApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      nameWrong: '',
      email: '',
      emailWrong: '',
      phone: '',
      phoneWrong: '',
      password: '',
      passwordWrong: '',
      rePassword: '',
      rePasswordWrong: '',
      year: null,
      month: null,
      day: null,
      date: '',
      fetching: false,
      chosenDate: new Date(),
    };
    this.setDate = this.setDate.bind(this);
  }
  login = () => {
    if (
      this.state.name.length < 4 ||
      this.state.email.length < 4 ||
      this.state.phone.length < 4 ||
      this.state.password.length < 4 ||
      this.state.password != this.state.rePassword
    ) {
      if (this.state.name.length < 4)
        this.setState({nameWrong: i18n.t('nameValidate')});
      else this.setState({nameWrong: ''});

      if (this.state.email.length < 4)
        this.setState({emailWrong: i18n.t('emailValidate')});
      else this.setState({emailWrong: ''});
      if (this.state.phone.length < 4)
        this.setState({phoneWrong: i18n.t('phoneValidate')});
      else this.setState({phoneWrong: ''});
      if (this.state.password.length < 4)
        this.setState({passwordWrong: i18n.t('passValidate')});
      else this.setState({passwordWrong: ''});
      if (this.state.rePassword === this.state.password)
        this.setState({rePasswordWrong: ''});
      else this.setState({rePasswordWrong: i18n.t('confirmValidate')});
    } else {
      this.setState({fetching: true});

      fetch(`${api_url}/Users/Register`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          UserName: this.state.name,
          Email: this.state.email,
          Phone: this.state.phone,
          Birthday: this.state.date,
          Password: this.state.password,
          IsActive: false,
        }),
      })
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson);
          this.props.regMethod(responseJson);
          this.setState({fetching: false});
          this.props.navigation.navigate('MainMenu');
        })
        .catch(error => {
          this.setState({fetching: false});
          alert('try again');
        });
    }
  };
  componentDidMount() {
    var that = this;
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth(); //Current Month
    var year = new Date().getFullYear(); //Current Year
    that.setState({
      year: year,
      month: month,
      day: date,
    });
  }
  setDate(newDate) {
    this.setState({date: newDate.toString().substr(4, 12)});
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Back
          onPress={() => this.props.navigation.goBack()}
          title={i18n.t('signUp')}
          styles={{
            marginBottom: 0,
            borderBottomWidth: 0,
            flex: 0.1,
            alignItems: 'center',
            backgroundColor: '#f1f0ee',
          }}
        />
        <View
          style={{
            flex: 1,
            marginVertical: 20,
            justifyContent: 'space-between',
          }}>
          <TextInput
            style={styles.textinpute}
            placeholder={i18n.t('username')}
            autoCapitalize="none"
            placeholderTextColor={colors.Grey}
            onSubmitEditing={() => this._inpute && this._inpute.focus()}
            onChangeText={text => this.setState({name: text})}
          />
          <View
            style={{
              width: width * 0.8,
              height: 25,
              marginHorizontal: width * 0.1,
              justifyContent: 'center',
            }}>
            {this.state.nameWrong != '' ? (
              <Text style={styles.wrong}>{this.state.nameWrong}</Text>
            ) : null}
          </View>

          <TextInput
            style={styles.textinpute}
            placeholder={i18n.t('email')}
            autoCapitalize="none"
            placeholderTextColor={colors.Grey}
            ref={ref => {
              this._inpute = ref;
            }}
            onSubmitEditing={() => this.date}
            onChangeText={text => this.setState({email: text})}
          />
          <View
            style={{
              width: width * 0.8,
              height: 25,
              marginHorizontal: width * 0.1,
              justifyContent: 'center',
            }}>
            {this.state.emailWrong != '' ? (
              <Text style={styles.wrong}>{this.state.emailWrong}</Text>
            ) : null}
          </View>
          <View style={styles.dateView}>
            <DatePicker
              ref={ref => {
                this.date = ref;
              }}
              defaultDate={new Date(2000, 4, 4)}
              minimumDate={new Date(1960, 1, 1)}
              maximumDate={
                new Date(this.state.year, this.state.month, this.state.day)
              }
              locale={'en'}
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={false}
              animationType={'fade'}
              androidMode={'default'}
              placeHolderText={i18n.t('birthday')}
              placeHolderTextStyle={{marginTop: 5, color: colors.Grey}}
              textStyle={{color: 'black', marginTop: 5}}
              onDateChange={this.setDate}
              disabled={false}
            />
          </View>
          <View
            style={{
              width: width * 0.8,
              height: 25,
              marginHorizontal: width * 0.1,
              justifyContent: 'center',
            }}></View>
          <TextInput
            style={styles.textinpute}
            placeholder={i18n.t('phone')}
            autoCapitalize="none"
            placeholderTextColor={colors.Grey}
            onSubmitEditing={() => this.pass && this.pass.focus()}
            onChangeText={text => this.setState({phone: text})}
            keyboardType="numeric"
          />
          <View
            style={{
              width: width * 0.8,
              height: 25,
              marginHorizontal: width * 0.1,
              justifyContent: 'center',
            }}>
            {this.state.phoneWrong != '' ? (
              <Text style={styles.wrong}>{this.state.phoneWrong}</Text>
            ) : null}
          </View>
          <TextInput
            style={[
              styles.textinpute,
              {textAlign: i18n.locale == 'ar' ? 'right' : null},
            ]}
            placeholder={i18n.t('password')}
            autoCapitalize="none"
            placeholderTextColor={colors.Grey}
            onSubmitEditing={() => this.cpass && this.cpass.focus()}
            ref={ref => {
              this.pass = ref;
            }}
            onChangeText={text => this.setState({password: text})}
            secureTextEntry={true}
          />
          <View
            style={{
              width: width * 0.8,
              height: 25,
              marginHorizontal: width * 0.1,
              justifyContent: 'center',
            }}>
            {this.state.passwordWrong != '' ? (
              <Text style={styles.wrong}>{this.state.passwordWrong}</Text>
            ) : null}
          </View>
          <TextInput
            style={[
              styles.textinpute,
              {textAlign: i18n.locale == 'ar' ? 'right' : null},
            ]}
            placeholder={i18n.t('confirm')}
            autoCapitalize="none"
            placeholderTextColor={colors.Grey}
            onSubmitEditing={() => this.button && this.login()}
            ref={ref => {
              this.cpass = ref;
            }}
            onChangeText={text => this.setState({rePassword: text})}
            secureTextEntry={true}
          />
          <View
            style={{
              width: width * 0.8,
              height: 25,
              marginHorizontal: width * 0.1,
              justifyContent: 'center',
            }}>
            {this.state.rePasswordWrong != '' ? (
              <Text style={styles.wrong}>{this.state.rePasswordWrong}</Text>
            ) : null}
          </View>
        </View>
        <View
          style={{
            flex: 0.4,
            backgroundColor: '#2e6cff',
            borderTopRightRadius: 100,
          }}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <TouchableOpacity
              ref={ref => {
                this.button = ref;
              }}
              onPress={this.login}
              style={styles.button}>
              {this.state.fetching ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.textButton}>{i18n.t('create')}</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
        {/* <Back
          onPress={() => this.props.navigation.navigate("Login")}
          title={i18n.t("signUp")}
        />
        <ScrollView style={styles.flex}>
          <TextInput
            style={styles.textinpute}
            placeholder={i18n.t("username")}
            autoCapitalize="none"
            placeholderTextColor={colors.primary}
            onSubmitEditing={() => this._inpute && this._inpute.focus()}
            onChangeText={text => this.setState({ name: text })}
          />
          {this.state.nameWrong != "" ? (
            <Text style={styles.wrong}>{this.state.nameWrong}</Text>
          ) : null}

          <TextInput
            style={styles.textinpute}
            placeholder={i18n.t("email")}
            autoCapitalize="none"
            placeholderTextColor={colors.primary}
            ref={ref => {
              this._inpute = ref;
            }}
            onSubmitEditing={() => this.date}
            onChangeText={text => this.setState({ email: text })}
          />
          {this.state.emailWrong != "" ? (
            <Text style={styles.wrong}>{this.state.emailWrong}</Text>
          ) : null}

          <View style={styles.dateView}>
            <DatePicker
              ref={ref => {
                this.date = ref;
              }}
              defaultDate={new Date(2000, 4, 4)}
              minimumDate={new Date(1960, 1, 1)}
              maximumDate={
                new Date(this.state.year, this.state.month, this.state.day)
              }
              locale={"en"}
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={false}
              animationType={"fade"}
              androidMode={"default"}
              placeHolderText={i18n.t("birthday")}
              textStyle={{ color: "black" }}
              placeHolderTextStyle={{ color: colors.primary }}
              onDateChange={this.setDate}
              disabled={false}
            />
          </View>
          <TextInput
            style={styles.textinpute}
            placeholder={i18n.t("phone")}
            autoCapitalize="none"
            placeholderTextColor={colors.primary}
            onSubmitEditing={() => this.pass && this.pass.focus()}
            onChangeText={text => this.setState({ phone: text })}
            keyboardType="numeric"
          />
          {this.state.phoneWrong != "" ? (
            <Text style={styles.wrong}>{this.state.phoneWrong}</Text>
          ) : null}

          <TextInput
            style={[
              styles.textinpute,
              { textAlign: i18n.locale == "ar" ? "right" : null }
            ]}
            placeholder={i18n.t("password")}
            autoCapitalize="none"
            placeholderTextColor={colors.primary}
            onSubmitEditing={() => this.cpass && this.cpass.focus()}
            ref={ref => {
              this.pass = ref;
            }}
            onChangeText={text => this.setState({ password: text })}
            secureTextEntry={true}
          />
          {this.state.passwordWrong != "" ? (
            <Text style={styles.wrong}>{this.state.passwordWrong}</Text>
          ) : null}

          <TextInput
            style={[
              styles.textinpute,
              { textAlign: i18n.locale == "ar" ? "right" : null }
            ]}
            placeholder={i18n.t("confirm")}
            autoCapitalize="none"
            placeholderTextColor={colors.primary}
            onSubmitEditing={() => this.button && this.login()}
            ref={ref => {
              this.cpass = ref;
            }}
            onChangeText={text => this.setState({ rePassword: text })}
            secureTextEntry={true}
          />
          {this.state.rePasswordWrong != "" ? (
            <Text style={styles.wrong}>{this.state.rePasswordWrong}</Text>
          ) : null}

          <TouchableOpacity
            ref={ref => {
              this.button = ref;
            }}
            onPress={this.login}
            style={styles.button}
          >
            {this.state.fetching ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.textButton}>{i18n.t("signUp")}</Text>
            )}
          </TouchableOpacity>
        </ScrollView> */}
      </SafeAreaView>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    regMethod: user => {
      console.log('done');
      console.log(user);
      dispatch({type: EDIT_USER, value: user});
    },
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(HelloWorldApp);
