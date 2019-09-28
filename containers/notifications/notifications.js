import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Platform,
  SafeAreaView,
} from 'react-native';
import styles from './styles';
import Back from '../../components/back';
import i18n from '../../utils/language';
import {connect} from 'react-redux';
import Server from '../../constants/server';
const {api_url} = Server;
//import Constants from 'expo-constants';
class HelloWorldApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      orderSatus: [],
    };
  }
  componentDidMount() {
    this.renderNatification();
  }
  renderNatification = () => {
    this.setState({isLoading: true});
    fetch(`${api_url}/Notify`, {
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
  handle = (isoffer, id, brandName, categoryName) => {
    if (isoffer == true) {
      this.props.navigation.navigate('Offer', {
        offerId: id,
        brandName: brandName,
        categoryName: categoryName,
      });
    }
  };
  renderOrderSatatus = item => (
    <TouchableOpacity
      onPress={() =>
        this.handle(item.isOffer, item.offerId, item.brandName, item.catName)
      }
      style={styles.largCard}>
      <Image
        source={{uri: item.image}}
        resizeMode="contain"
        style={styles.img}
      />
      <View style={styles.rightView}>
        <Text style={styles.headText}>
          {this.props.user.language == 'en'
            ? item.description
            : item.adescription == null
            ? item.description
            : item.adescription}
        </Text>
      </View>
    </TouchableOpacity>
  );

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Back
          onPress={() => this.props.navigation.navigate('MainMenu')}
          title={i18n.t('notification')}
        />

        {this.state.isLoading == true ? (
          <ActivityIndicator
            style={
              {
                // paddingTop:
                //  Platform.OS === 'ios' ? null : Constants.statusBarHeight,
              }
            }
          />
        ) : (
          <FlatList
            data={this.state.orderSatus}
            extraData={this.state}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => this.renderOrderSatatus(item)}
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
