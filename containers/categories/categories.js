import React, { Component } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  Alert
} from "react-native";
import styles from "./styles";
import Back from "../../components/back";
import colors from "../../constants/colors";
import i18n from "../../utils/language";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
const { width, height } = Dimensions.get("window");
import Server from "../../constants/server";
const { api_url } = Server;
import Geolocation from "@react-native-community/geolocation";

import axios from "axios";
import { connect } from "react-redux";

class HelloWorldApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      isLoading: true,
      title: "",
      searchText: "",
      orderSatus: [],
      nameofCat: [],
      map: true,
      currentLong: null,
      currentlat: null,

      initialRegion: []
    };
  }
  componentWillMount() {
    const { navigation } = this.props;
    const itemId = navigation.getParam("catId", "NO-ID");
    const title = navigation.getParam("title", "NO-ID");
    this.setState({ id: itemId, title: title });
  }
  componentDidMount() {
    this.renderMap();
    this.renderCategory();
    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
        // const initialPosition = position;
        this.setState({
          currentLong: position.coords.longitude,
          currentlat: position.coords.latitude
        });
      },
      error => console.log("Error", error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    // this.watchID = Geolocation.watchPosition(position => {
    //   const lastPosition = JSON.stringify(position);
    // this.setState({
    //   currentLong: position.coords.longitude,
    //   currentlat: position.coords.latitude
    // });
    // });
  }
  renderCategory = () => {
    this.setState({ isLoading: true });

    axios({
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      url: `${api_url}/Brands/GetBrandsForCat?catId=${this.state.id}`
    })
      .then(res => {
        //console.log(res);
        this.setState({
          ...this.state,
          orderSatus: res.data,
          isLoading: false
        });
      })
      .catch(error => {
        this.setState({
          ...this.state,
          isLoading: false
        });
      });
  };
  renderMap = () => {
    this.setState({ isLoading: true });

    axios({
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      url: `${api_url}/Brands/GetBrandsLocations?catId=${this.state.id}`
    })
      .then(res => {
        //console.log(res);
        this.setState({
          initialRegion: res.data,
          isLoading: false
        });
      })
      .catch(error => {
        this.setState({
          ...this.state,
          isLoading: false
        });
      });
  };
  onRefresh() {
    this.setState({ isLoading: true }, this.renderCategory());
  }
  renderOrderSatatus = item => (
    <TouchableOpacity
      onPress={() =>
        this.props.navigation.navigate("Brand", { brandId: item.brandId })
      }
      style={[
        styles.largCard,
        { width: this.state.map ? width * 0.8 : width * 0.9 }
      ]}
    >
      <Image source={{ uri: item.icon }} style={styles.img} />
      <View style={styles.rightView}>
        <Text style={styles.headText}>
          {this.props.user.language == "en"
            ? item.name
            : item.aname == null
            ? item.name
            : item.aname}
        </Text>
        <Text style={styles.subHeadText}>
          {this.props.user.language == "en"
            ? item.description
            : item.adescription == null
            ? item.description
            : item.adescription}
        </Text>
      </View>
    </TouchableOpacity>
  );

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Back
          title={i18n.t(this.state.title)}
          onPress={() => this.props.navigation.goBack()}
          islist={true}
          OnPresslist={() => this.setState({ map: false })}
          OnPressmap={() => this.setState({ map: true })}
          listColor={this.state.map ? colors.black : colors.primary}
          mapColor={this.state.map ? colors.primary : colors.black}
          styles={{ marginBottom: 0 }}
        />
        {this.state.map ? (
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: 30.0081,
              longitude: 31.2109,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
          >
            {this.state.initialRegion.map((marker, i) => (
              <Marker
                key={i}
                onPress={() =>
                  this.props.navigation.navigate("Branch", {
                    branchId: marker.branchId
                  })
                }
                coordinate={{
                  latitude: Number(marker.latitude),
                  longitude: Number(marker.longitude),
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421
                }}
                title={marker.locationName}
              />
            ))}
            {this.state.currentLong ? (
              <Marker
                key={"1"}
                coordinate={{
                  latitude: this.state.currentlat,
                  longitude: this.state.currentLong,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421
                }}
                title={"Current Location"}
              >
                <Image
                  source={require("../../assets/location.png")}
                  style={{ height: 50, width: 50 }}
                  resizeMode="contain"
                />
              </Marker>
            ) : null}
          </MapView>
        ) : null}

        <View
          style={{
            flex: this.state.map ? 0.2 : 1,
            position: this.state.map ? "absolute" : "relative",
            bottom: this.state.map ? height * 0.08 : null
          }}
        >
          {this.state.isLoading == true ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal={this.state.map}
              data={this.state.orderSatus}
              extraData={this.state}
              keyExtractor={item => item.brandId.toString()}
              renderItem={({ item }) => this.renderOrderSatatus(item)}
              onRefresh={() => this.onRefresh()}
              refreshing={this.state.isLoading}
              ListEmptyComponent={
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  {this.state.map ? null : (
                    <Image
                      resizeMode="contain"
                      source={require("../../assets/404.png")}
                      style={{ width: width * 0.5, height: height * 0.5 }}
                    />
                  )}
                </View>
              }
            />
          )}
        </View>
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
