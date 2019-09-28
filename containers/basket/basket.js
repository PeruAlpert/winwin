import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import colors from '../../constants/colors';
import styles from './styles';
import Back from '../../components/back';
import i18n from '../../utils/language';
import Server from '../../constants/server';
import {connect} from 'react-redux';
const {api_url} = Server;
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SwipeRow, Icon, Button} from 'native-base';
class HelloWorldApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      id: 0,
      brandName: '',
      count: '',
      icon: '',
      title: '',
      description: '',
    };
  }

  confirm = () => {
    this.setState({isLoading: true});
    fetch(
      `${api_url}/Orders/MakeOrder?Qty=${this.state.count}&OfferId=${this.state.id}&Price=0`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: this.props.user.userId,
          orderDate:
            this.state.year + '' + this.state.month + '' + this.state.day,
        }),
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        // console.log(responseJson);
        this.setState({
          isLoading: false,
        });
        this.props.navigation.navigate('Order');
      })
      .catch(error => {
        this.setState({
          isLoading: false,
        });
        alert('try again');
      });
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Back onPress={() => this.props.navigation.navigate('DrawerMenu')} />
        <View style={styles.center}>
          <Ionicons name="ios-basket" size={50} color={colors.primary} />
          <Text style={styles.notificationText}>{i18n.t('basket')}</Text>
        </View>
        <View style={styles.card}>
          <Image source={{uri: this.state.icon}} style={styles.img} />
          <View style={styles.handleLeftRight}>
            <Text style={styles.title}>{this.state.title}</Text>
            <Text style={styles.description}>{this.state.description} </Text>
            <View style={styles.row}>
              <Text style={styles.color}>{this.state.brandName}</Text>
              <Text style={styles.color}>{this.state.count}</Text>
            </View>
          </View>
        </View>

        <View>
          <TouchableOpacity onPress={this.confirm} style={styles.button}>
            {this.state.fetching ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.textButton}>{i18n.t('confirm')}</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, {marginBottom: 10}]}>
            {this.state.fetching ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.textButton}>{i18n.t('cancel')}</Text>
            )}
          </TouchableOpacity>
        </View>
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
