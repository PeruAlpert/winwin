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
    backgroundColor: Colors.white,
    //paddingTop: Platform.OS === "ios" ? null : Constants.statusBarHeight
  },
  setting: {
    marginHorizontal: 20,
    fontSize: 30,
    marginTop: 20,
    fontWeight: '500',
  },
  circle: {
    height: 70,
    width: 70,
    borderRadius: 70,
    backgroundColor: Colors.lightGrey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 70,
    height: 50,
  },
  largCard: {
    borderBottomWidth: 0.3,
    marginHorizontal: 18,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 3,
  },
  imageCard: {
    paddingHorizontal: 16,
  },
  rightView: {
    marginHorizontal: 5,
    paddingLeft: 8,
  },
  headText: {
    textAlign: Platform.OS === 'ios' ? 'center' : null,
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.primary,
  },
  subHeadText: {
    fontSize: 14,
    color: Colors.Grey,
  },
  handleleftRight: {
    marginHorizontal: 20,
  },
  smallCard: {
    paddingVertical: 10,

    paddingHorizontal: 20,
  },
  socialMediaView: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: 20,
  },
});

export default styles;
