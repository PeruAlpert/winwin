import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  Platform
} from "react-native";
const { width, height } = Dimensions.get("window");
import colors from "../constants/colors";
import LinearGradient from "react-native-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
export default class ButtonComponent extends Component {
  render() {
    const {
      title,
      onPress,
      brandName,
      urlImageLarg,
      onPressOffer,
      isImage,
      pressHeart,
      isfav = false,
      isheart
    } = this.props;

    return (
      <View
        style={{
          backgroundColor: colors.white,
          borderRadius: 20,
          borderRadius: 20,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
          marginVertical: 4
        }}
      >
        <TouchableOpacity
          style={{ flex: 1, overflow: "hidden", borderRadius: 10 }}
          onPress={onPressOffer}
        >
          {isImage ? null : (
            <Image
              source={{ uri: urlImageLarg }}
              style={{ height: 180, width: "100%" }}
            />
          )}

          <LinearGradient
            colors={
              Platform.OS === "ios"
                ? ["rgba(255, 255, 255,0)", "#fff"]
                : ["transparent", "#fff"]
            }
            style={{
              flex: 1,
              flexDirection: "row",

              position: "absolute",
              width,
              height: Platform.OS === "ios" ? 80 : 80,
              bottom: 0
            }}
          >
            <View style={{ flex: 1 }}>
              <View
                style={{
                  position: "absolute",
                  bottom: 10,
                  left: 10,
                  backgroundColor: "#f68e1e",
                  borderRadius: 3,
                  padding: 3
                }}
              >
                <Text
                  style={{
                    textTransform: "capitalize",
                    fontSize: 13,
                    fontWeight: "600",
                    color: colors.white
                  }}
                >
                  {title}
                </Text>
              </View>
              <TouchableOpacity
                onPress={onPress}
                style={{
                  flex: 0.3,
                  flexDirection: "row",
                  alignItems: "center",
                  //marginBottom: 10,
                  position: "absolute",
                  bottom: 35,
                  left: 10
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 16,
                    textTransform: "uppercase",
                    shadowColor: "#ffffff",
                    shadowOffset: {
                      width: 0,
                      height: 2
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,

                    elevation: 5
                  }}
                >
                  {brandName}
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={pressHeart}
              style={{
                flex: 0.2,
                top: 30,
                alignItems: "flex-end",
                right: 20,
                position: "absolute"
              }}
            >
              {isheart ? null : (
                <Ionicons
                  onPress={pressHeart}
                  name={isfav ? "ios-heart" : "ios-heart-empty"}
                  size={30}
                  color={isfav ? "red" : colors.primary}
                  style={{ paddingHorizontal: 20 }}
                />
              )}
            </TouchableOpacity>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }
}
