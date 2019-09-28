import {StyleSheet, Dimensions, Platform} from 'react-native';
const {width, height} = Dimensions.get('window');
import Colors from '../../constants/colors';
//import Constants from 'expo-constants';
const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
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
  showrow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  leftText: {
    color: Colors.Grey,
    fontSize: 18,
  },
  rightText: {
    color: '#474747',
    fontSize: 18,
  },
  handleleftRight: {
    marginHorizontal: 20,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.primary,
    marginHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 20,
  },
  textButton: {
    color: Colors.primary,
  },
  logOut: {
    textDecorationLine: 'underline',
    textAlign: 'center',
    marginVertical: 30,
    color: Colors.primary,
  },
});

export default styles;
