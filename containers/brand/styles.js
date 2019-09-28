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

  imgSmall: {
    height: 90,
    width: 90,
    borderRadius: Platform.OS === 'ios' ? null : 90,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  description: {
    textAlign: 'center',
    marginHorizontal: 20,
    marginTop: 45,
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
    marginVertical: 10,
  },
  textButton: {
    color: Colors.primary,
  },
  Branch: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
    borderWidth: 0.4,
    alignItems: 'center',
    marginVertical: 10,
    height: 62,
    borderRadius: 10,
  },
  socialMediaView: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: 5,
  },
  circle: {
    backgroundColor: Colors.orange,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 2,
  },
  back: {
    backgroundColor: Colors.white,
    position: 'absolute',
    zIndex: 2,
    marginVertical: 5,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    //marginTop: Platform.OS === 'ios' ? null : Constants.statusBarHeight + 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  title: {
    fontSize: 14,
    color: Colors.black,
    fontWeight: 'bold',
    flex: 0.8,
  },
  number: {
    fontSize: 15,
    color: 'white',
  },
});

export default styles;
