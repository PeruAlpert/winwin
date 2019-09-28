import {StyleSheet, Dimensions, Platform} from 'react-native';
const {width, height} = Dimensions.get('window');
import Colors from '../../constants/colors';
//import Constants from "expo-constants";
const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.skyBlue,
    // paddingTop: Platform.OS === 'ios' ? null : Constants.statusBarHeight,
  },
  center: {
    alignItems: 'center',
  },
  notificationText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  flatView: {
    marginHorizontal: 10,
    marginTop: 10,
    flexDirection: 'row',
    backgroundColor: Colors.lightGrey,
    alignItems: 'center',
    padding: 5,
  },
  img: {
    width: 40,
    height: 30,
  },
});

export default styles;
