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
    // paddingTop: Platform.OS === 'ios' ? null : Constants.statusBarHeight,
  },
  handleRightLeft: {
    marginHorizontal: 17,
    color: Colors.primary,
  },
  headbg: {
    backgroundColor: Colors.skyBlue,
    marginRight: 10,
  },
  center: {
    alignItems: 'center',
    marginBottom: 20,
  },
  helpText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.primary,
  },
});

export default styles;
