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
    paddingHorizontal: 16,
    width: 90,
    height: 90,
  },
  largCard: {
    borderWidth: 0.3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    flex: 1,
    backgroundColor: Colors.white,
    marginHorizontal: 18,
    paddingVertical: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 3,
    marginVertical: 4,
  },
  rightView: {
    flex: 1,
    marginHorizontal: 5,
    paddingLeft: 8,
    flexDirection: 'column',
  },
  header: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-around',
    paddingVertical: 5,
    alignItems: 'center',
  },
  input: {
    backgroundColor: Colors.white,
    width: width * 0.7,
    paddingLeft: 10,
    paddingRight: width * 0.1,
    height: Platform.OS === 'ios' ? height * 0.06 : null,
    borderRadius: 3,
  },
  icon: {
    position: 'absolute',
    right: 0,
    marginHorizontal: 10,
  },
  iconStyle: {
    paddingHorizontal: 12,
  },
  headText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  subHeadText: {
    fontSize: 14,
    color: Colors.Grey,
  },
  category: {
    paddingHorizontal: 5,
    alignItems: 'center',
    width: 114,
    marginVertical: 4,
    borderRightWidth: 1,
    bottom: 0,
    height: height * 0.09,
  },
  categoryTxt: {
    fontSize: 12,
    marginVertical: 2,
    textTransform: 'capitalize',
  },
});

export default styles;
