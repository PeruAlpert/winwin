import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking,
  Platform,
  Dimensions,
} from 'react-native';
import styles from './styles';
const {width, height} = Dimensions.get('window');
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import i18n from '../../utils/language';
import colors from '../../constants/colors';
import {connect} from 'react-redux';
import {EDIT_USER, CHANGE_LANG} from '../../store/CONSTANTS';

class HelloWorldApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      language: 'en',
      expire: '',
    };
  }
  componentDidMount() {
    if (this.props.user) {
      this.setState({language: this.props.user.language});
    }
    if (this.props.user.isActive == true) {
      this.setState({expire: this.props.user.expireDate});
    }
  }
  handleLanguage = async () => {
    if (this.state.language == 'en') {
      this.setState({language: 'ar'});
      this.props.changeMethod('ar');
      //console.log(this.state.language)
      i18n.locale = 'ar';
    } else {
      this.setState({language: 'en'});
      this.props.changeMethod('en');
      i18n.locale = 'en';
    }
  };
  handleLogout = () => {
    this.props.logoutMethod();
    this.props.navigation.navigate('Login');
  };
  _pressCall = () => {
    const url = 'tel:01141313114';
    Linking.openURL(url);
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={[styles.setting, {color: colors.primary}]}>Setting</Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('UserProfile')}
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              marginHorizontal: 20,
              marginVertical: 30,
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View style={styles.circle}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 30,
                    fontWeight: 'bold',
                    textTransform: 'capitalize',
                  }}>
                  {this.props.user.userName == null
                    ? null
                    : this.props.user.userName[0]}
                </Text>
              </View>
              <View style={{marginHorizontal: 15}}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 18,
                    marginBottom: 5,
                    textTransform: 'capitalize',
                    color: colors.primary,
                  }}>
                  {this.props.user.userName}
                </Text>
                <Text style={{fontSize: 12}}>{this.props.user.email}</Text>
              </View>
            </View>
            <Ionicons name="ios-arrow-forward" size={20} color="grey" />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('QrCode')}
            style={[
              styles.largCard,
              {
                marginVertical: 8,
                justifyContent: 'space-between',
                alignItems: 'center',
              },
            ]}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons
                name="ios-qr-scanner"
                size={30}
                color="grey"
                style={styles.imageCard}
              />
              <View style={styles.rightView}>
                <Text
                  style={[
                    styles.headText,
                    {alignSelf: 'flex-start', color: colors.primary},
                  ]}>
                  {i18n.t('serialNumber')}
                </Text>
                <Text style={[styles.subHeadText, {fontSize: 12}]}>
                  {i18n.t('expired')}{' '}
                  {new Date(this.state.expire).toDateString()}
                </Text>
              </View>
            </View>
            <Ionicons name="ios-arrow-forward" size={20} color="grey" />
          </TouchableOpacity>
          <View style={styles.handleleftRight}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Help')}
              style={[
                styles.smallCard,
                {
                  paddingHorizontal: 0,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottomWidth: 0.3,
                },
              ]}>
              <View style={{alignItems: 'center', flexDirection: 'row'}}>
                <Ionicons
                  name={
                    Platform.OS === 'ios'
                      ? 'ios-help-circle-outline'
                      : 'md-help-circle-outline'
                  }
                  size={30}
                  color="grey"
                  style={[styles.imageCard, {right: 2}]}
                />
                <Text
                  style={[
                    styles.headText,
                    {marginLeft: 10, color: colors.primary},
                  ]}>
                  {i18n.t('help')}
                </Text>
              </View>
              <Ionicons name="ios-arrow-forward" size={20} color="grey" />
            </TouchableOpacity>
            <Text style={[styles.subHeadText, {marginTop: 20}]}>
              {i18n.t('more')}
            </Text>
            <TouchableOpacity
              onPress={this.handleLanguage}
              style={[
                styles.smallCard,
                {
                  borderWidth: 1,
                  borderColor: colors.lightGrey,
                  marginTop: 15,
                  shadowColor: Platform.OS === 'ios' ? '#000' : null,
                  shadowOffset: {
                    width: Platform.OS === 'ios' ? 0 : null,
                    height: Platform.OS === 'ios' ? 2 : null,
                  },
                  shadowOpacity: Platform.OS === 'ios' ? 0.25 : null,
                  shadowRadius: Platform.OS === 'ios' ? 3.84 : null,

                  elevation: Platform.OS === 'ios' ? 5 : null,
                },
              ]}>
              {this.state.language == 'en' ? (
                <Text style={styles.headText}>العربيه</Text>
              ) : (
                <Text style={styles.headText}>English</Text>
              )}
            </TouchableOpacity>
            <Text style={[styles.subHeadText, {marginTop: 20}]}>
              {i18n.t('contactus')}
            </Text>
            <View style={styles.socialMediaView}>
              <Entypo
                onPress={() =>
                  Linking.openURL('https://www.facebook.com/winwinegypt/')
                }
                name="facebook-with-circle"
                size={32}
                color={colors.primary}
                style={{marginHorizontal: 10}}
              />
              <Entypo
                onPress={() =>
                  Linking.openURL('https://instagram.com/winwin_eg')
                }
                name="instagram-with-circle"
                size={32}
                color={colors.primary}
                style={{marginHorizontal: 10}}
              />
              <Ionicons
                onPress={this._pressCall}
                name="ios-call"
                size={32}
                color={colors.primary}
                style={{marginHorizontal: 10}}
              />
              <MaterialCommunityIcons
                onPress={() => Linking.openURL('https://Www.winwin-eg.com')}
                name="web"
                size={32}
                color={colors.primary}
                style={{marginHorizontal: 10}}
              />
            </View>
            <TouchableOpacity
              onPress={this.handleLogout}
              style={{
                marginTop: 20,
                width: width * 0.4,
                paddingVertical: 10,
                paddingHorizontal: 20,
                alignSelf: 'center',
                justifyContent: 'center',
                borderRadius: 30,
                borderWidth: 0.3,
              }}>
              <Text style={[styles.headText, {textAlign: 'center'}]}>
                {i18n.t('logout')}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    logoutMethod: _ => {
      dispatch({type: EDIT_USER, value: {}});
    },
    changeMethod: language => {
      dispatch({type: CHANGE_LANG, value: language});
    },
  };
};
const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HelloWorldApp);
