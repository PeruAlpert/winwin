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
    backgroundColor: '#f1f0ee',
    // paddingTop: Platform.OS === 'ios' ? null : Constants.statusBarHeight,
  },
  wrongMessage: {
    flex: 0.05,
    marginBottom: 20,
    marginHorizontal: 20,
    backgroundColor: 'red',
    paddingVertical: 20,
    borderRadius: 10,
  },
  textWrongMessage: {color: 'white', textAlign: 'center'},
  textinpute: {
    width: width * 0.8,
    borderRadius: 40,
    backgroundColor: 'white',
    paddingLeft: 20,
    paddingRight: 20,
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
    // borderBottomWidth: 2,
    // borderColor: Colors.primary,
    // marginHorizontal: 20,
    // paddingLeft: 10,
    // height: 40,
    // marginTop: 15
  },
  dateView: {
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

    // marginHorizontal: 20,
    // marginTop: 10,
    // borderBottomWidth: 2,
    // borderBottomColor: Colors.primary
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.primary,
  },
  button: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 40,
    backgroundColor: '#f1f0ee',
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
    // justifyContent: "center",
    // alignItems: "center",
    // borderRadius: 7,
    // backgroundColor: "transparent",
    // borderWidth: 1,
    // borderColor: Colors.primary,
    // marginHorizontal: 20,
    // paddingVertical: 10,
    // marginVertical: 30
  },
  wrong: {
    marginHorizontal: 20,
    marginVertical: 5,
    color: Colors.error,
    fontSize: 11,
  },
  textButton: {
    fontSize: 16,
    color: '#2e6cff',
  },
});

export default styles;
