import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Linking,
  ActivityIndicator,
  Platform,
  SafeAreaView,
} from 'react-native';
import styles from './styles';
import Back from '../../components/back';
import colors from '../../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Server from '../../constants/server';
const {api_url} = Server;
//import Constants from 'expo-constants';
import {connect} from 'react-redux';
class HelloWorldApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      id: 0,
      brand: [],
      call: '0123444',
      orderSatus: [],
    };
  }
  componentWillMount() {
    const {navigation} = this.props;
    const itemId = navigation.getParam('brandId', 'NO-ID');
    this.setState({id: itemId});
  }
  componentDidMount() {
    this.renderBrand();
    this.renderOffer();
  }
  renderBrand = () => {
    this.setState({isLoading: true});
    fetch(`${api_url}/Brands/${this.state.id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        //  console.log(responseJson);
        this.setState({
          brand: responseJson,
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
  renderOffer = () => {
    this.setState({isLoading: true});
    fetch(`${api_url}/Brands/GetBranchesForBrand?brandId=${this.state.id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        // console.log(responseJson);
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
  fb = () => {
    if (this.state.brand.fblink == null) {
      alert('Facebook not yet');
    } else Linking.openURL(this.state.brand.fblink);
  };
  insta = () => {
    if (this.state.brand.instalink == null) {
      alert('Instagram not yet');
    } else Linking.openURL(this.state.brand.instalink);
  };
  _pressCall = () => {
    if (this.state.brand.number == null) {
      alert('Number not yet');
    } else {
      const url = 'tel:' + this.state.brand.number;
      Linking.openURL(url);
    }
  };
  renderOrderSatatus = item => (
    <TouchableOpacity
      onPress={() =>
        this.props.navigation.navigate('Branch', {branchId: item.branchId})
      }
      style={styles.Branch}>
      <Text style={styles.title}>
        {this.props.user.language == 'en'
          ? item.locationName
          : item.alocationName == null
          ? item.locationName
          : item.alocationName}
      </Text>
      <View style={styles.circle}>
        <Text style={styles.number}>{item.offerCount}</Text>
      </View>
    </TouchableOpacity>
  );

  render() {
    if (this.state.isLoading == true)
      return (
        <ActivityIndicator
          style={
            {
              // paddingTop:
              // Platform.OS === 'ios' ? null : Constants.statusBarHeight,
            }
          }
        />
      );
    else
      return (
        <SafeAreaView style={styles.container}>
          <Back
            title={
              this.props.user.language == 'en'
                ? this.state.brand.name
                : this.state.brand.aname == null
                ? this.state.brand.name
                : this.state.brand.aname
            }
            onPress={() => this.props.navigation.goBack()}
            styles={{marginBottom: 0}}
          />

          <View>
            <View>
              <Image
                source={{
                  uri:
                    this.state.brand.coverImage == null
                      ? this.state.brand.icon
                      : this.state.brand.coverImage,
                }}
                style={{height: 200, width: '100%'}}
                resizeMode="stretch"
              />
            </View>
            <View
              style={{
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                height: 90,
                width: 90,

                position: 'absolute',
                top: 150,
                left: 20,
                borderWidth: 1,
                borderColor: colors.orange,
                borderRadius: 90,
                overflow: 'hidden',
                zIndex: 2,
              }}>
              <Image
                source={{uri: this.state.brand.icon}}
                style={styles.imgSmall}
              />
            </View>
          </View>
          <Text style={styles.description}>
            {this.props.user.language == 'en'
              ? this.state.brand.description
              : this.state.brand.adescription == null
              ? this.state.brand.description
              : this.state.brand.adescription}
          </Text>

          <View style={styles.socialMediaView}>
            {this.state.brand.fblink == null ? null : (
              <Entypo
                onPress={this.fb}
                name="facebook-with-circle"
                size={32}
                color={colors.primary}
              />
            )}
            {this.state.brand.instalink == null ? null : (
              <Entypo
                onPress={this.insta}
                name="instagram-with-circle"
                size={32}
                color={colors.primary}
                style={{marginHorizontal: 20}}
              />
            )}
            {this.state.brand.number == null ? null : (
              <Ionicons
                onPress={this._pressCall}
                name="ios-call"
                size={32}
                color={colors.primary}
                style={{
                  marginHorizontal: this.state.brand.instalink == null ? 20 : 0,
                }}
              />
            )}
          </View>
          <FlatList
            data={this.state.orderSatus}
            extraData={this.state}
            keyExtractor={item => item.branchId.toString()}
            renderItem={({item}) => this.renderOrderSatatus(item)}
          />
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
