import { StyleSheet, Dimensions, Platform } from "react-native";
const { width, height } = Dimensions.get("window");
import Colors from "../../constants/colors";
//import Constants from "expo-constants";
const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop:40
    // paddingTop: Platform.OS === 'ios' ? null : Constants.statusBarHeight,
  },
  center: {
    alignItems: "center"
  },
  orderText: {
    fontSize: 25,
    fontWeight: "bold",
    color: Colors.primary
  }
});

export default styles;
