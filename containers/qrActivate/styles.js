import {StyleSheet, Dimensions, Platform} from 'react-native';
const {width, height} = Dimensions.get('window');
import Colors from '../../constants/colors';
//import Constants from "expo-constants";

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    //paddingTop: Platform.OS === 'ios' ? null : Constants.statusBarHeight,
    backgroundColor: '#f1f0ee',
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
