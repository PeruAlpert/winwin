import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Platform,
  TextInput,
  SafeAreaView,
} from 'react-native';
import styles from './styles';
import Card from '../../components/card';
import Server from '../../constants/server';
const {api_url} = Server;
//import Constants from 'expo-constants';
import {connect} from 'react-redux';
import axios from 'axios';
class HelloWorldApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      isLoading: false,
      orderSatus: [],
    };
  }
  componentWillMount() {
    // const { navigation } = this.props;
    // const itemId = navigation.getParam("searchText", "NO-ID");
    // this.setState({ id: itemId });
    this._inpute && this._inpute.focus();
  }
  componentDidMount() {
    this._inpute && this._inpute.focus();
  }
  search = () => {
    this.setState({isLoading: true});

    axios({
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      url: `${api_url}/Home?length=100&OfferId=0&search=${this.state.id}`,
    })
      .then(res => {
        // console.log(res);
        this.setState({
          ...this.state,
          orderSatus: res.data,
          isLoading: false,
          secondLoding: false,
        });
      })
      .catch(error => {
        this.setState({
          ...this.state,
          fetching: false,
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
        <View style={styles.header}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TextInput
              style={styles.input}
              ref={ref => {
                this._inpute = ref;
              }}
              autoFocus={this.state.focus}
              onChangeText={text => this.setState({id: text})}
              onSubmitEditing={() => this.search()}
              placeholder="Search"
            />

            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Text>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
        {this.state.isLoading == true ? (
          <ActivityIndicator
            style={
              {
                //  paddingTop:
                //   Platform.OS === 'ios' ? null : Constants.statusBarHeight,
              }
            }
          />
        ) : (
          <FlatList
            data={this.state.orderSatus}
            extraData={this.state}
            keyExtractor={item => item.offerId.toString()}
            renderItem={({item}) => this.renderOrderSatatus(item)}
            ListEmptyComponent={
              <View>
                <Card
                  brandName={'winwin'}
                  category={'winwin'}
                  title={'winwin'}
                />
                <Card
                  brandName={'winwin'}
                  category={'winwin'}
                  title={'winwin'}
                />
                <Card
                  brandName={'winwin'}
                  category={'winwin'}
                  title={'winwin'}
                />
                <Card
                  brandName={'winwin'}
                  category={'winwin'}
                  title={'winwin'}
                />
                <Card
                  brandName={'winwin'}
                  category={'winwin'}
                  title={'winwin'}
                />
              </View>
            }
          />
        )}
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
