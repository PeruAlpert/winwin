import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  Platform,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import Back from '../components/back';
import Colors from '../constants/colors';
//import Constants from "expo-constants";
const {width, height} = Dimensions.get('window');
export default class HelloWorldApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      orderSatus: [
        {id: 1, larg: false, image: ''},
        {id: 2, larg: false, image: ''},
      ],
    };
  }
  componentWillMount() {
    const {navigation} = this.props;
    const brandMenu1 = navigation.getParam('brandMenu1', 'NO-ID');
    const brandMenu2 = navigation.getParam('brandMenu2', 'NO-ID');
    let arr = [...this.state.orderSatus];
    if (brandMenu1 != null) arr[0].image = brandMenu1;
    if (brandMenu2 != null) {
      arr[1].image = brandMenu2;
    }

    this.setState({...this.state, orderSatus: arr});
  }
  handle = id => {
    let orders = this.state.orderSatus;
    orders.map(post => {
      if (post.id == id) {
        post.larg = !post.larg;
      }
    });
    this.setState({orders});
  };
  renderOrderSatatus = item => (
    <TouchableOpacity onPress={() => this.handle(item.id)} style={{flex: 1}}>
      {item.image == '' ? null : (
        <View
          style={{
            flex: 1,
            marginVertical: 10,
            alignSelf: 'center',
            height: item.larg ? height * 0.8 : height * 0.5,
            width: width * 0.9,
            borderRadius: 10,
            borderWidth: 1,
          }}>
          <Image
            source={{uri: item.image}}
            resizeMethod="scale"
            resizeMode={item.larg ? 'stretch' : 'contain'}
            style={{flex: 1, borderRadius: 10}}
          />
        </View>
      )}
    </TouchableOpacity>
  );
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.skyBlue,
          // paddingTop: Platform.OS === 'ios' ? null : Constants.statusBarHeight,
        }}>
        <Back onPress={() => this.props.navigation.goBack()} />
        <FlatList
          data={this.state.orderSatus}
          extraData={this.state}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => this.renderOrderSatatus(item)}
        />
      </View>
    );
  }
}
