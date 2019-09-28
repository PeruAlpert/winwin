import {StyleSheet, Dimensions, Platform} from 'react-native';
const {width, height} = Dimensions.get('window');
import Colors from '../../constants/colors';
//import Constants from "expo-constants";
const styles = StyleSheet.create({
  card: {
    flex: 0.2,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.lightGrey,
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    // paddingTop: Platform.OS === "ios" ? null : Constants.statusBarHeight
  },
  center: {
    alignItems: 'center',
  },
  handleLeftRight: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  title: {fontSize: 14, fontWeight: 'bold'},
  description: {fontSize: 13, fontWeight: 'bold'},
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  color: {
    color: Colors.primary,
  },
  notificationText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  img: {
    width: 50,
    height: 50,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.primary,
    marginHorizontal: 20,
    marginVertical: 5,
    paddingVertical: 10,
  },
  textButton: {
    color: Colors.primary,
  },
});

export default styles;
