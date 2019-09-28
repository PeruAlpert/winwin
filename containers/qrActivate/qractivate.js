import React, {Component} from 'react';
import {EDIT_USER} from '../../store/CONSTANTS';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import styles from './styles';
import colors from '../../constants/colors';
import Back from '../../components/back';
import i18n from '../../utils/language';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Server from '../../constants/server';
const {api_url} = Server;
import {connect} from 'react-redux';
class HelloWorldApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isloading: false,
      number: '',
    };
  }
  active = () => {
    this.setState({isloading: true});
    axios({
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      url: `${api_url}/Users/ActiveUser`,
      params: {
        userid: this.props.user.userId,
        serial: this.state.number,
      },
    })
      .then(responseJson => {
        console.log(responseJson);
        this.props.activateMethod({
          ...this.props.user,
          isActive: true,
          serialNumber: responseJson.data.serialNumber,
          expireDate: responseJson.data.expireDate,
          takenOreder: responseJson.data.count,
        });
        this.setState({isloading: false});
        this.props.navigation.navigate('MainMenu');
      })
      .catch(error => {
        this.setState({isloading: false});
        alert('try');
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
            placeholder={i18n.t('enterSerial')}
            autoCapitalize="none"
            placeholderTextColor={colors.Grey}
            onSubmitEditing={() => this._button && this.active()}
            onChangeText={text => this.setState({number: text})}
          />
          <TouchableOpacity
            ref={ref => {
              this._button = ref;
            }}
            onPress={() => this.active()}
            style={[styles.button, {marginTop: 20}]}>
            {this.state.fetching ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.textButton}>
                {i18n.t('aCTIVATEYOURACCOUNT')}
              </Text>
            )}
          </TouchableOpacity>
        </View>
        {/* <Back onPress={() => this.props.navigation.navigate("MainMenu")} />
        <TouchableOpacity>
          <Text style={styles.text}>{i18n.t("aCTIVATEYOURACCOUNT")}</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.textinpute}
          placeholder={i18n.t("aCTIVATEYOURACCOUNT")}
          autoCapitalize="none"
          placeholderTextColor={colors.primary}
          onChangeText={text => this.setState({ number: text })}
        />
        <TouchableOpacity onPress={this.active}
          style={styles.button}>
          {this.state.isloading ? (
            <ActivityIndicator color="white" />
          ) :
            <Text style={styles.textButton}>{i18n.t("aCTIVATEYOURACCOUNT")}</Text>}
        </TouchableOpacity> */}
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    activateMethod: user => {
      dispatch({type: EDIT_USER, value: user});
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HelloWorldApp);
