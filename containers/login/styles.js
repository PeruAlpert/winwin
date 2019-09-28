import {StyleSheet, Dimensions, Platform} from 'react-native';
const {width, height} = Dimensions.get('window');
import Colors from '../../constants/colors';
//import Constants from "expo-constants";

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#f1f0ee',

    // paddingTop: Platform.OS === 'ios' ? null : Constants.statusBarHeight,
  },
  topView1: {
    flex: 0.7,
  },
  down: {
    flex: 1,
  },
  wrong: {
    color: Colors.error,
    fontSize: 11,
  },
  language: {
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    marginVertical: 10,
    marginRight: 20,
    height: 50,
    width: 50,
    borderRadius: 10,
  },
  textLanguage: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  welcome: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textinpute: {
    width: width * 0.8,
    borderRadius: 40,
    backgroundColor: 'white',
    paddingLeft: 10,
    paddingRight: 10,
    height: 50,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textforget: {
    textDecorationLine: 'underline',
    textAlign: 'right',
    marginHorizontal: width * 0.1,
    color: Colors.Grey,
  },
  button: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 40,
    backgroundColor: '#2e6cff',
    marginHorizontal: 20,
    paddingVertical: 12,
    width: width * 0.8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  textButton: {
    fontSize: 16,
    color: Colors.white,
  },
});

export default styles;
