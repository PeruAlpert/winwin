import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
const {width, height} = Dimensions.get('window');
import styles from './styles';
import {EDIT_USER} from '../../store/CONSTANTS';
import colors from '../../constants/colors';
import Back from '../../components/back';
import {DatePicker} from 'native-base';
import {connect} from 'react-redux';
import i18n from '../../utils/language';
import Server from '../../constants/server';
const {api_url} = Server;
class HelloWorldApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: 'Tony',
      email: 'tony@yahoo.com',
      phone: '01234567891',
      birthday: '',
      isShowingText: false,
      messageWong: 'wrong Password',
      year: null,
      month: null,
      day: null,
      date: '12/23/2000',
      chosenDate: new Date(),
      edit: false,
      isloading: false,
    };
    this.setDate = this.setDate.bind(this);
  }

  componentDidMount() {
    var that = this;
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth(); //Current Month
    var year = new Date().getFullYear(); //Current Year
    that.setState({
      ...this.props.user,
      year: year,
      month: month,
      day: date,
    });
  }
  setDate(newDate) {
    this.setState({birthday: newDate.toString().substr(4, 12)});
  }
  username = txt => {
    if (txt == '' || txt.length < 6)
      this.setState({
        isShowingText: true,
        messageWong: 'USERNAME AT LEAST 7 character',
      });
    else this.setState({isShowingText: false});
    this.setState({userName: txt});
  };
  email = txt => {
    if (txt == '' || txt.length < 6)
      this.setState({isShowingText: true, messageWong: 'NOT VALID'});
    else this.setState({isShowingText: false});
    this.setState({email: txt});
  };
  mobile = txt => {
    if (txt == '' || txt.length < 11)
      this.setState({isShowingText: true, messageWong: 'NOT VALID'});
    else this.setState({isShowingText: false});
    this.setState({phone: txt});
  };

  back() {
    this.props.navigation.navigate('DrawerMenu');
    this.setState({edit: false});
  }
  update = () => {
    this.setState({isLoading: true});
    fetch(
      `${api_url}/Users/Edit?userId=${this.props.user.userId}&UserName=${this.state.userName}&mail=${this.state.email}&phone=${this.state.phone}&birthdate=${this.state.birthday}`,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log('json data');
        console.log(responseJson);
        this.props.editMethod(responseJson);
        this.setState({isloading: false});
        this.props.navigation.navigate('MainMenu');
      })
      .catch(error => {
        this.setState({
          isLoading: false,
        });
        alert('try again');
      });
  };
  // update = () => {
  //   this.setState({ isloading: true });
  //   axios({
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     url: `${api_url}/Users/Edit?userId=${this.props.user.userId}&UserName=${this.state.userName}&mail=${this.state.email}&phone=${this.state.phone}&birthdate=${this.state.birthday}`,

  //   })
  //     .then(responseJson => {
  //       console.log('json data')
  //       console.log(responseJson.data)
  //       this.props.editMethod(...responseJson.data)
  //       this.props.navigation.navigate("MainMenu");
  //       this.setState({ isloading: false });
  //     })
  //     .catch(error => {
  //       this.setState({ isloading: false });
  //       console.log(error.response)
  //       alert("try");
  //     });
  // }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Back
          onPress={() => this.props.navigation.goBack()}
          title="Profile"
          styles={{
            marginBottom: 0,
            borderBottomWidth: 0,
            flex: 0.1,
            backgroundColor: '#f1f0ee',
          }}
        />
        <View
          style={{
            flex: 1,
            marginVertical: 20,
            justifyContent: 'center',
          }}>
          <TextInput
            style={[
              styles.textinpute,
              {
                backgroundColor: this.state.edit ? 'white' : colors.Grey,
                color: this.state.edit ? 'black' : 'white',
              },
            ]}
            placeholder="Full Name"
            autoCapitalize="none"
            placeholderTextColor={colors.primary}
            onChangeText={text => this.username(text)}
            editable={this.state.edit}
            selectTextOnFocus={this.state.edit}
            value={this.state.userName}
            onSubmitEditing={() => this._inpute && this._inpute.focus()}
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
            style={[
              styles.textinpute,
              {
                backgroundColor: this.state.edit ? 'white' : colors.Grey,
                color: this.state.edit ? 'black' : 'white',
              },
            ]}
            placeholder="Email.com"
            autoCapitalize="none"
            placeholderTextColor={colors.primary}
            onChangeText={text => this.email(text)}
            editable={this.state.edit}
            selectTextOnFocus={this.state.edit}
            value={this.state.email}
            ref={ref => {
              this._inpute = ref;
            }}
            onSubmitEditing={() => this.num && this.num.focus()}
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
          <TextInput
            style={[
              styles.textinpute,
              {
                backgroundColor: this.state.edit ? 'white' : colors.Grey,
                color: this.state.edit ? 'black' : 'white',
              },
            ]}
            placeholder="Mobile Number"
            autoCapitalize="none"
            placeholderTextColor={colors.primary}
            onChangeText={text => this.mobile(text)}
            keyboardType="numeric"
            editable={this.state.edit}
            selectTextOnFocus={this.state.edit}
            value={this.state.phone}
            ref={ref => {
              this.num = ref;
            }}
            onSubmitEditing={() => this.date}
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
          <View
            style={[
              styles.dateView,
              {
                marginBottom: 20,
                backgroundColor: this.state.edit ? 'white' : 'grey',
              },
            ]}>
            {this.state.edit ? (
              <DatePicker
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
                placeHolderText={new Date(
                  this.props.user.birthday,
                ).toDateString()}
                placeHolderTextStyle={{marginTop: 5, color: colors.black}}
                textStyle={{color: 'black', marginTop: 5}}
                onDateChange={this.setDate}
                disabled={false}
              />
            ) : this.state.birthday == null ? (
              <Text style={[styles.dateText, {color: 'black'}]}>
                {this.props.user.birthday}
              </Text>
            ) : (
              <Text
                style={[
                  styles.dateText,
                  {top: 5, color: this.state.edit ? 'black' : 'white'},
                ]}>
                {new Date(this.state.birthday).toDateString()}
              </Text>
            )}
          </View>
        </View>
        <View
          style={{
            flex: 0.5,
            backgroundColor: '#2e6cff',
            borderTopRightRadius: 100,
          }}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            {this.state.edit ? (
              <TouchableOpacity
                onPress={this.update}
                style={[
                  styles.button,
                  {
                    backgroundColor: this.state.edit
                      ? colors.orange
                      : '#f1f0ee',
                  },
                ]}>
                <Text style={styles.textButton}>{i18n.t('update')}</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                ref={ref => {
                  this.button = ref;
                }}
                onPress={() => this.setState({edit: true})}
                style={styles.button}>
                <Text style={styles.textButton}>{i18n.t('edit')}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        {/* <Back onPress={() => this.back()} title={i18n.t("profile")}/>
        <ScrollView>
          <View style={styles.flex}>
            <View style={styles.img}>
              <Text style={{ fontSize: 20, color: colors.primary }}>
                {this.props.user.userName[0]}
              </Text>
            </View>
            <TextInput
              style={[
                styles.textinpute,
                {
                  borderBottomColor: this.state.edit
                    ? colors.primary
                    : colors.black
                }
              ]}
              placeholder="Full Name"
              autoCapitalize="none"
              placeholderTextColor={colors.primary}
              onChangeText={text => this.username(text)}
              editable={this.state.edit}
              selectTextOnFocus={this.state.edit}
              value={this.state.userName}
            />
            <TextInput
              style={[
                styles.textinpute,
                {
                  borderBottomColor: this.state.edit
                    ? colors.primary
                    : colors.black
                }
              ]}
              placeholder="Email.com"
              autoCapitalize="none"
              placeholderTextColor={colors.primary}
              onChangeText={text => this.email(text)}
              editable={this.state.edit}
              selectTextOnFocus={this.state.edit}
              value={this.state.email}
            />
            <View
              style={[
                styles.dateView,
                {
                  borderBottomColor: this.state.edit
                    ? colors.primary
                    : colors.black
                }
              ]}
            >
              {this.state.edit ? (
                <DatePicker
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
                  placeHolderText={new Date(this.props.user.birthday).toDateString()}
                  textStyle={{ color: "black" }}
                  placeHolderTextStyle={{ color: "black" }}
                  onDateChange={this.setDate}
                  disabled={false}
                />
              ) : this.state.birthday == null ?
                  <Text style={styles.dateText}>{this.props.user.birthday}</Text> :
                  <Text style={styles.dateText}>{new Date(this.state.birthday).toDateString()}</Text>
              }
            </View>

            <TextInput
              style={[
                styles.textinpute,
                {
                  borderBottomColor: this.state.edit
                    ? colors.primary
                    : colors.black
                }
              ]}
              placeholder="Mobile Number"
              autoCapitalize="none"
              placeholderTextColor={colors.primary}
              onChangeText={text => this.mobile(text)}
              keyboardType="numeric"
              editable={this.state.edit}
              selectTextOnFocus={this.state.edit}
              value={this.state.phone}
            />
            {this.state.edit ?
              <TouchableOpacity onPress={this.update} style={styles.button}>
                <Text style={styles.textButton}>{i18n.t("update")}</Text>
              </TouchableOpacity> :
              <TouchableOpacity onPress={() => this.setState({ edit: true })} style={styles.button}>
                <Text style={styles.textButton}>{i18n.t("edit")}</Text>
              </TouchableOpacity>}
          </View>
        </ScrollView> */}
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
    editMethod: user => {
      console.log(user);
      dispatch({type: EDIT_USER, value: user});
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HelloWorldApp);
