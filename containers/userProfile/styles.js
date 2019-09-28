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
    //paddingTop: Platform.OS === 'ios' ? null : Constants.statusBarHeight,
  },

  img: {
    height: 80,
    width: 80,
    borderRadius: 80,
    borderWidth: 1,
    borderColor: Colors.skyBlue,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.lightGrey,
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
  },
  dateText: {
    marginHorizontal: 10,
    marginVertical: 10,
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
  },
  textButton: {
    fontSize: 16,
    color: '#2e6cff',
  },
});

export default styles;
