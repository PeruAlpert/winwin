import React from "react";
import { ScrollView, Image, Text, View, TouchableOpacity } from "react-native";
import { DrawerItems } from "react-navigation";

const CustomDrawerContentComponent = props => (
  <ScrollView style={{ backgroundColor: "grey" }}>
    <View
      style={{
        paddingLeft: 15,
        marginBottom: 20,
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: 40,
        flexDirection: "row"
      }}
    >
      <Image
        source={require("../assets/foods.png")}
        style={{ width: 50, height: 50, borderRadius: 25 }}
      />
      <Text
        style={{
          color: "#FFF",
          marginLeft: 10,
          fontWeight: "bold",
          fontSize: 18
        }}
      >
        Lader spoon
      </Text>
    </View>
    <DrawerItems
      {...props}
      itemsContainerStyle={
        {
          // paddingRight: 30,
        }
      }
      iconContainerStyle={{
        position: "relative"
      }}
      labelStyle={{
        color: "#FFF"
      }}
      itemStyle={{
        paddingLeft: 15
      }}
      activeBackgroundColor="transparent"
    />
  </ScrollView>
);

export default CustomDrawerContentComponent;
