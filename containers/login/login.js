import React, { Component } from "react";
import { EDIT_USER } from "../../store/CONSTANTS";
const { width, height } = Dimensions.get("window");
import axios from "axios";
import {
  ActivityIndicator,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  SafeAreaView
} from "react-native";
import styles from "./styles";
import colors from "../../constants/colors";
import Server from "../../constants/server";
import i18n from "../../utils/language";
import { connect } from "react-redux";
import { logIn } from "../../store/actions/user";

const { api_url } = Server;
class HelloWorldApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: "en",
      name: "",
      pass: "",
      isShowingText: false,
      nameWrong: "",
      nameBool: false,
      passWrong: "",
      passBool: false,
      fetching: false
    };
  }
  componentWillMount() {
    i18n.locale = this.state.language;
  }

  login = () => {
    if (this.state.name.length < 1 || this.state.pass.length < 1) {
      if (this.state.name.length < 7)
        this.setState({ nameBool: true, nameWrong: i18n.t("nameValidate") });
      else this.setState({ nameBool: false });

      if (this.state.pass.length < 7)
        this.setState({ passBool: true, passWrong: i18n.t("passValidate") });
      else this.setState({ passBool: false });
    } else {
      this.setState({ ...this.state, fetching: true });
      axios({
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        url: `${api_url}/Users/Login?user=${this.state.name}&pass=${this.state.pass}`
      })
        .then(responseJson => {
          console.log(responseJson.data[0]);
          this.props.loginMethod({
            ...responseJson.data[0],
            language: this.state.language
          });
          this.setState({ ...this.state, fetching: false });
          this.props.navigation.navigate("MainMenu");
        })
        .catch(error => {
          this.props.loginMethod({});
          this.setState({ ...this.state, fetching: false });
          alert("wrong user Name or password");
        });
    }
  };
  handleLanguage = async () => {
    if (this.state.language == "en") {
      this.setState({ language: "ar" });
      i18n.locale = "ar";
    } else {
      this.setState({ language: "en" });
      i18n.locale = "en";
    }
  };

  render() {
    console.log(this.props.user);
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            flex: 0.6,
            backgroundColor: "#2e6cff",
            borderBottomLeftRadius: 100
          }}
        >
          <TouchableOpacity
            onPress={this.handleLanguage}
            style={styles.language}
          >
            {this.state.language == "en" ? (
              <Text style={styles.textLanguage}>عربى</Text>
            ) : (
              <Text style={styles.textLanguage}>English</Text>
            )}
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Image
              source={require("../../assets/win.png")}
              style={{ width: 105, height: 80 }}
              resizeMode="stretch"
            />
          </View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Registration")}
            style={{ flex: 0.2, alignItems: "flex-end", paddingTop: 10 }}
          >
            <Text
              style={{
                textDecorationLine: "underline",
                marginHorizontal: 20,
                color: "white"
              }}
            >
              {i18n.t("createNewAccount")}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <TextInput
              style={styles.textinpute}
              placeholder={i18n.t("username")}
              autoCapitalize="none"
              placeholderTextColor={colors.Grey}
              onSubmitEditing={() => this._inpute && this._inpute.focus()}
              onChangeText={text => this.setState({ name: text })}
            />
            <View
              style={{
                width: width * 0.8,
                height: 25,
                marginHorizontal: width * 0.15,
                justifyContent: "center"
              }}
            >
              {this.state.nameBool ? (
                <Text style={styles.wrong}>{this.state.nameWrong}</Text>
              ) : null}
            </View>
            <TextInput
              style={[
                styles.textinpute,
                {
                  textAlign: i18n.locale == "ar" ? "right" : null
                }
              ]}
              placeholder={i18n.t("password")}
              placeholderTextColor={colors.Grey}
              onChangeText={text => this.setState({ pass: text })}
              onSubmitEditing={() => this._button && this.login()}
              secureTextEntry={true}
              ref={ref => {
                this._inpute = ref;
              }}
              autoCapitalize="none"
            />
            <View
              style={{
                width: width * 0.8,
                height: 25,
                marginHorizontal: width * 0.15,
                justifyContent: "center"
              }}
            >
              {this.state.passBool ? (
                <Text style={styles.wrong}>{this.state.passWrong}</Text>
              ) : null}
            </View>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("ForgetPassword")}
            >
              <Text style={styles.textforget}>{i18n.t("forgetPassword")}</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <View
              style={{
                flex: 1,
                justifyContent: "center"
              }}
            >
              <TouchableOpacity
                ref={ref => {
                  this._button = ref;
                }}
                onPress={this.login}
                style={styles.button}
              >
                {this.state.fetching ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={styles.textButton}>{i18n.t("login")}</Text>
                )}
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}></View>
          </View>
        </View>
        {/* <View style={styles.topView1}>
          <TouchableOpacity
            onPress={this.handleLanguage}
            style={styles.language}
          >
            {this.state.language == "en" ? (
              <Text style={styles.textLanguage}>عربى</Text>
            ) : (
              <Text style={styles.textLanguage}>English</Text>
            )}
          </TouchableOpacity>
          <View style={styles.flex}>
            <View style={styles.flex}>
              <Text style={styles.welcome}>{i18n.t("welcome")}</Text>

              <TextInput
                style={styles.textinpute}
                placeholder={i18n.t("username")}
                autoCapitalize="none"
                placeholderTextColor={colors.primary}
                onSubmitEditing={() => this._inpute && this._inpute.focus()}
                onChangeText={text => this.setState({ name: text })}
              />

              {this.state.nameBool ? (
                <Text style={styles.wrong}>{this.state.nameWrong}</Text>
              ) : null}

              <TextInput
                style={[
                  styles.textinpute,
                  {
                    marginTop: 20,
                    textAlign: i18n.locale == "ar" ? "right" : null
                  }
                ]}
                placeholder={i18n.t("password")}
                placeholderTextColor={colors.primary}
                onChangeText={text => this.setState({ pass: text })}
                onSubmitEditing={() => this._button && this.login()}
                secureTextEntry={true}
                ref={ref => {
                  this._inpute = ref;
                }}
                autoCapitalize="none"
              />
              {this.state.passBool ? (
                <Text style={styles.wrong}>{this.state.passWrong}</Text>
              ) : null}
            </View>
            <View style={{ flex: 1.4 }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("ForgetPassword")}
              >
                <Text style={styles.textforget}>
                  {i18n.t("forgetPassword")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                ref={ref => {
                  this._button = ref;
                }}
                onPress={this.login}
                style={styles.button}
              >
                {this.state.fetching ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={styles.textButton}>{i18n.t("login")}</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Registration")}
              >
                <Text style={styles.textforget}>
                  {i18n.t("createNewAccount")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View> */}
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginMethod: user => {
      dispatch({ type: EDIT_USER, value: user });
    }
  };
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HelloWorldApp);
