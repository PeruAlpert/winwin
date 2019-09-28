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
    //paddingTop: Platform.OS === 'ios' ? null : Constants.statusBarHeight,
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
    paddingHorizontal: 16,
    width: 64,
    height: 64,
  },
  largCard: {
    borderBottomWidth: 0.3,
    backgroundColor: Colors.white,
    marginHorizontal: 18,
    paddingVertical: 10,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 3,
    marginVertical: 8,
    flex: 1,
  },
  rightView: {
    marginHorizontal: 5,
    paddingLeft: 8,
    flex: 1,
  },
  headText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default styles;
