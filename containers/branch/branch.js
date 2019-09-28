import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  SafeAreaView,
  Image,
  ActivityIndicator,
  Platform,
} from 'react-native';
import styles from './styles';
import Back from '../../components/back';
import Card from '../../components/card';
import Server from '../../constants/server';
const {api_url} = Server;
//import Constants from 'expo-constants';
export default class HelloWorldApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      is: 0,
      isLoading: false,
      orderSatus: [],
    };
  }
  componentWillMount() {
    const {navigation} = this.props;
    const itemId = navigation.getParam('branchId', 'NO-ID');
    this.setState({id: itemId});
  }
  componentDidMount() {
    this.renderNatification();
  }
  renderNatification = () => {
    this.setState({isLoading: true});
    fetch(
      `${api_url}/Home/GetOffersForBranch?Length=100&BranchId=${this.state.id}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        this.setState({
          orderSatus: responseJson,
          isLoading: false,
        });
      })
      .catch(error => {
        this.setState({
          isLoading: false,
        });
        alert('try again');
      });
  };
  renderOrderSatatus = item => (
    <View
      style={{
        marginHorizontal: 10,
        marginTop: 10,
        flex: 1,
      }}>
      <Card
      isheart={true}
        brandName={item.brandName}
        category={item.categoryName}
        urlImageSmall={item.brandIcon}
        urlImageLarg={item.image}
        title={item.title}
        onPress={() =>
          this.props.navigation.navigate('Brand', {brandId: item.brandId})
        }
        onPressOffer={() =>
          this.props.navigation.navigate('Offer', {
            offerId: item.offerId,
            categoryName: item.categoryName,
            brandName: item.brandName,
          })
        }
      />
    </View>
  );

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Back onPress={() => this.props.navigation.goBack()} title="Offers" />
        {this.state.isLoading == true ? (
          <ActivityIndicator
            style={
              {
                //paddingTop:
                // Platform.OS === 'ios' ? null : Constants.statusBarHeight,
              }
            }
          />
        ) : (
          <FlatList
            data={this.state.orderSatus}
            extraData={this.state}
            keyExtractor={item => item.offerId.toString()}
            renderItem={({item}) => this.renderOrderSatatus(item)}
          />
        )}
      </SafeAreaView>
    );
  }
}
