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
    backgroundColor: Colors.skyBlue
    //paddingTop: Platform.OS === 'ios' ? null : Constants.statusBarHeight,
  },
  header: {
    flexDirection: "row",
    height: 50,
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 0.3
  },
  textHeader: {
    fontSize: 20,
    color: "#0973b9",
    marginHorizontal: 20,
    fontWeight: "bold"
  },
  input: {
    marginHorizontal: 5,
    marginLeft: 10,
    backgroundColor: Colors.lightGrey,
    width: width * 0.8,
    paddingLeft: 20,
    paddingRight: 10,
    height: Platform.OS === "ios" ? height * 0.04 : height * 0.06,
    borderRadius: 10
  },
  center: {
    alignItems: "center"
  },
  notificationText: {
    fontSize: 25,
    fontWeight: "bold",
    color: Colors.primary
  },
  flatView: {
    marginHorizontal: 10,
    marginTop: 10,
    flexDirection: "row",
    backgroundColor: Colors.lightGrey,
    alignItems: "center",
    padding: 5
  },
  img: {
    width: 40,
    height: 30
  }
});

export default styles;
