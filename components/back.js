import React, { Component } from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import colors from "../constants/colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
export default class HelloWorldApp extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      onPress,
      title,
      styles,
      search,
      issearch,
      islist,
      OnPresslist,
      OnPressmap,
      listColor,
      mapColor
    } = this.props;
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: colors.white,
          borderBottomWidth: 0.3,
          borderBottomColor: colors.lightGrey,
          height: 50,
          marginBottom: 20,
          ...styles
        }}
      >
        <Ionicons
          onPress={onPress}
          name="ios-arrow-back"
          size={24}
          color={colors.primary}
          style={{
            paddingHorizontal: 20,
            paddingVertical: 5
          }}
        />
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text
            style={{
              
              fontSize: 15,
              textTransform: "uppercase",
              fontWeight: "bold",
              textAlign: "center",
              marginRight: issearch ? 0 : 60,
              //marginRight: islist ? 0 : 0,
              left: islist ? 40 : 0,
              
            }}
          >
            {title}
          </Text>
        </View>
        {islist ? (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons
              onPress={OnPresslist}
              name="ios-list"
              size={Platform.OS === "ios" ? 30 : 25}
              color={listColor}
              style={{ padding: 10 }}
            />
            <SimpleLineIcons
              onPress={OnPressmap}
              name="location-pin"
              size={Platform.OS === "ios" ? 23 : 20}
              color={mapColor}
              style={{ padding: 10 }}
            />
          </View>
        ) : null}
        {issearch ? (
          <Ionicons
            onPress={search}
            name="ios-search"
            size={Platform.OS === "ios" ? 30 : 25}
            color={colors.black}
            style={{ padding: 10 }}
          />
        ) : null}
      </View>
    );
  }
}
