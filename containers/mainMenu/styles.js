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
  header: {
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.3,
  },
  textHeader: {
    fontSize: 22,
    color: '#0973b9',
    marginHorizontal: 20,
    fontWeight: 'bold',
  },
  input: {
    marginHorizontal: 5,
    backgroundColor: Colors.lightGrey,
    width: width * 0.8,
    paddingLeft: 10,
    paddingRight: 10,
    height: Platform.OS === 'ios' ? height * 0.04 : null,
    borderRadius: 5,
  },
  icon: {
    position: 'absolute',
    right: 0,
    marginHorizontal: 10,
  },
  iconStyle: {
    paddingHorizontal: 12,
    marginHorizontal: 2,
  },
  category: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    padding: 20,
    paddingVertical: 40,
    overflow: 'hidden',
    borderRadius: 10,

    // paddingHorizontal: 5, alignItems: 'center', width: 114, marginVertical: 8,
    // borderRightWidth: 1, bottom: 0, height: height * .09
  },
  text: {
    marginHorizontal: 15,
    marginVertical: 10,
    color: Colors.Grey,
  },
  categoryIcon: {
    width: 140,
    borderRadius: 20,
  },
  model: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerModel: {
    flex: 0.3,
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerImage: {
    height: 32,
    width: 32,
    marginVertical: 2,
  },
  overlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,.4)',
    width: 180,
    height: 140,
  },
  categoryTxt: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 18,
    textTransform: 'capitalize',
    alignSelf: 'center',
  },
});

export default styles;
