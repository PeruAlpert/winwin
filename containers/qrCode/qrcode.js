import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import styles from './styles';
import colors from '../../constants/colors';
import Back from '../../components/back';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import i18n from '../../utils/language';
class HelloWorldApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: 'c1241a34',
      expireDate: '22.0.2019',
      totalOrder: '0',
      totalEarning: '0',
      savingMoney: '0',
      reactive: false,
    };
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Back
          onPress={() => this.props.navigation.navigate('DrawerMenu')}
          title={i18n.t('serialNumber')}
        />
        <View style={styles.center}>
          <Ionicons name="ios-qr-scanner" size={40} color={colors.primary} />
        </View>
        <ScrollView>
          <View style={styles.handleleftRight}>
            <View style={styles.showrow}>
              <Text style={styles.leftText}>Serial Number : </Text>
              {this.props.user.isActive ? (
                <Text
                  style={[
                    styles.rightText,
                    {
                      fontWeight: 'bold',
                      color: 'black',
                      marginHorizontal: 5,
                      flex: 1,
                    },
                  ]}>
                  {this.props.user.serialNumber}
                </Text>
              ) : (
                <Text
                  style={[
                    styles.rightText,
                    {fontWeight: 'bold', color: 'black'},
                  ]}>
                  -
                </Text>
              )}
            </View>
            <View style={styles.showrow}>
              <Text style={styles.leftText}>Expire Date : </Text>
              {this.props.user.isActive ? (
                <Text
                  style={styles.rightText}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {new Date(this.props.user.expireDate).toDateString()}
                </Text>
              ) : (
                <Text style={styles.rightText}>-</Text>
              )}
            </View>
            <View style={styles.showrow}>
              <Text style={styles.leftText}>Total Order</Text>
              {this.props.user.isActive ? (
                <Text style={styles.rightText}>
                  {this.props.user.takenOreder}
                </Text>
              ) : (
                <Text style={styles.rightText}>-</Text>
              )}
            </View>
            {/* <View style={styles.showrow}>
              <Text style={styles.leftText}>Total Earning</Text>
              <Text style={styles.rightText}>
                {this.state.totalEarning} EGP
              </Text>
            </View>
            <View style={styles.showrow}>
              <Text style={styles.leftText}>Saving Money</Text>
              <Text style={styles.rightText}>{this.state.savingMoney} EGP</Text>
            </View> */}
          </View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Home')}
            style={styles.button}>
            <Text style={styles.textButton}>MAKE ORDER NOW</Text>
          </TouchableOpacity>
          {this.props.user.isActive ? (
            <View
              onPress={() => this.props.navigation.navigate('MainMenu')}
              style={[
                styles.button,
                {backgroundColor: 'grey', marginVertical: 0},
              ]}>
              <Text>{i18n.t('aCTIVATEYOURACCOUNT')}</Text>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('QrActivate')}
              style={[styles.button, {marginVertical: 0}]}>
              <Text style={styles.textButton}>
                {i18n.t('aCTIVATEYOURACCOUNT')}
              </Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(HelloWorldApp);
