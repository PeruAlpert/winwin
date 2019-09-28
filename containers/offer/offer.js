import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Platform,
  Linking,
  Dimensions,
  SafeAreaView
} from "react-native";
const { width, height } = Dimensions.get("window");
import colors from "../../constants/colors";
import styles from "./styles";
import Back from "../../components/back";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import i18n from "../../utils/language";
import Server from "../../constants/server";
const { api_url } = Server;
import { connect } from "react-redux";
import axios from "axios";

class HelloWorldApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      offer: [],
      count: 0,
      brandName: "",
      categoryName: "",
      isLoading: false,
      btnLoad: false,
      year: "",
      month: "",
      day: "",
      isFavorite: false
    };
  }
  componentWillMount() {
    const { navigation } = this.props;
    const offerId = navigation.getParam("offerId", "NO-ID");
    const categoryName = navigation.getParam("categoryName", "NO-ID");
    const brandName = navigation.getParam("brandName", "NO-ID");
    this.setState({
      id: offerId,
      brandName: brandName,
      categoryName: categoryName
    });
  }
  componentDidMount() {
    this.renderOffer();
    var year = new Date().toLocaleDateString(); //Current Year
    this.setState({
      year: year
    });
  }
  renderOffer = () => {
    this.setState({ isLoading: true });
    fetch(
      `${api_url}/Offers/GetOffer?offerId=${this.state.id}&userId=${this.props.user.userId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        //  console.log("a;slfj;alsfj;alsjf;lasjf", responseJson);
        this.setState({
          isFavorite: responseJson.isFavorite,
          offer: responseJson,
          isLoading: false
        });
      })
      .catch(error => {
        this.setState({
          isLoading: false
        });
        alert("try again");
      });
  };
  increase = () => {
    if (this.state.count < this.state.offer.useLimit)
      this.setState({ count: this.state.count + 1 });
    else alert("it's maximum");
  };
  decrease = () => {
    if (this.state.count != 0) this.setState({ count: this.state.count - 1 });
    else alert("No offer");
  };
  offer = () => {
    if (this.props.user.isActive == true) {
      if (this.state.count != 0) {
        this.setState({
          btnLoad: true
        });

        axios({
          method: "POST",
          baseURL: api_url,
          url: `/Orders/MakeOrder?userId=${this.props.user.userId}&orderDate=${this.state.year}&Qty=${this.state.count}&OfferId=${this.state.id}&Price=0`,
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(res => {
            // console.log(res);
            this.setState({
              btnLoad: false
            });
            this.props.navigation.navigate('Order')
          })
          .catch(err => {
            this.setState({
              btnLoad: false
            });
            if (err.response.status === 400) {
              alert(err.response.data.detail);
            } else {
              alert("try again");
            }
          });
      } else {
        alert("counter is zero");
      }
    } else this.props.navigation.navigate("QrCode");
  };

  toggleFavorite = () => {
    fetch(
      `${api_url}/UserFavourites/${
        this.state.isFavorite ? "RemoveFavourite" : "Add"
      }?userid=${this.props.user.userId}&offerid=${this.state.id}`,
      {
        method: `${this.state.isFavorite ? "DELETE" : "POST"}`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    )
      .then(responseJson => {
        if (responseJson.status == 200) {
          this.setState({ isFavorite: !this.state.isFavorite });
        }
      })
      .catch(error => {
        alert(error);
      });
  };
  openDirection = () => {
    var url = `${
      Platform.OS === "ios"
        ? `https://maps.apple.com/`
        : "https://maps.google.com/"
    }?daddr=${this.state.offer.latitude},${this.state.offer.longitude}`;
    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          console.log("Can't handle url: " + url);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch(err => console.error("An error occurred", err));
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Back
          onPress={() => this.props.navigation.goBack()}
          styles={{ marginBottom: 0, borderBottomWidth: 0 }}
          title={
            this.props.user.language == "en"
              ? this.state.offer.brandName
              : this.state.offer.brandAName == null
              ? this.state.offer.brandName
              : this.state.offer.brandAName
          }
        />
        {this.state.isLoading == true ? (
          <ActivityIndicator />
        ) : (
          <ScrollView>
            <View>
              <View style={{ marginHorizontal: 20 }}>
                <View
                  style={{
                    borderRadius: 20,
                    overflow: "hidden"
                  }}
                >
                  <Image
                    style={styles.largImg}
                    source={{ uri: this.state.offer.image }}
                    resizeMode="stretch"
                  />
                </View>
                <View
                  style={{
                    marginVertical: 20,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 5,
                    flexDirection: "row",
                    flex: 1
                  }}
                >
                  <View
                    style={{
                      flex: 1.7,
                      backgroundColor: colors.orange,
                      padding: 10,
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Text style={styles.title}>
                      {this.props.user.language == "en"
                        ? this.state.offer.title
                        : this.state.offer.atitle == null
                        ? this.state.offer.title
                        : this.state.offer.atitle}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <SimpleLineIcons
                      onPress={this.openDirection}
                      name="location-pin"
                      size={Platform.OS === "ios" ? 23 : 23}
                      color={colors.primary}
                      style={{
                        paddingHorizontal: 10,
                        paddingLeft: 20,
                        paddingVertical: 10
                      }}
                    />
                    <Ionicons
                      onPress={this.toggleFavorite}
                      name={
                        this.state.isFavorite ? "ios-heart" : "ios-heart-empty"
                      }
                      size={25}
                      color={this.state.isFavorite ? "red" : colors.primary}
                      style={{
                        flex: 1,
                        paddingHorizontal: 10,
                        paddingVertical: 10
                      }}
                    />
                  </View>
                </View>
                <Text style={styles.description}>
                  {this.props.user.language == "en"
                    ? this.state.offer.description
                    : this.state.offer.adescription == null
                    ? this.state.offer.description
                    : this.state.offer.adescription}
                </Text>

                <View
                  style={{
                    flex: 1,
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row"
                  }}
                >
                  <View style={styles.counter}>
                    <AntDesign
                      onPress={() => this.increase()}
                      name="plus"
                      size={22}
                      style={{ padding: 5 }}
                      color={colors.primary}
                    />
                    <View
                      style={{ flexDirection: "row", marginHorizontal: 15 }}
                    >
                      <Text>{this.state.count}</Text>
                      <Text>/</Text>
                      <Text>{this.state.offer.useLimit}</Text>
                    </View>
                    <AntDesign
                      onPress={() => this.decrease()}
                      name="minus"
                      size={22}
                      color={colors.primary}
                      style={{ padding: 5 }}
                    />
                  </View>
                </View>
              </View>
              <TouchableOpacity onPress={this.offer} style={styles.button}>
                {this.state.btnLoad ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={styles.textButton}>{i18n.t("confirm")}</Text>
                )}
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(HelloWorldApp);
