import React, { Component } from "react";
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  Dimensions
} from "react-native";
const { width, height } = Dimensions.get("window");
import styles from "../styles";
import OrderCard from "../../../components/orderCard";
import Server from "../../../constants/server";
//import Constants from 'expo-constants';
const { api_url } = Server;
import { connect } from "react-redux";
class HelloWorldApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      isLoading: false,
      orderSatus: []
    };
  }
  renderOrderSatatus = item => (
    <OrderCard
      img={item.icon}
      orderDesc={item.title}
      brandName={item.brandName}
      date={null}
    />
  );
  componentWillMount() {
    this.setState({ id: this.props.user.userId });
  }
  componentDidMount() {
    this.renderHistory();
  }
  onRefresh() {
    this.setState({ isLoading: true }, this.renderHistory());
  }
  renderHistory = () => {
    this.setState({ isLoading: true });
    fetch(
      `${api_url}/Orders/GetHistoryBasket?userId=${this.props.user.userId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        //console.log(responseJson);
        this.setState({
          orderSatus: responseJson,
          isLoading: false
        });
      })
      .catch(error => {
        this.setState({
          isLoading: false
        });
        console.log(error);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.isLoading == true ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={this.state.orderSatus}
            extraData={this.state}
            keyExtractor={item => item.offerId.toString()}
            renderItem={({ item }) => this.renderOrderSatatus(item)}
            onRefresh={() => this.onRefresh()}
            refreshing={this.state.isLoading}
            ListEmptyComponent={
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Image
                  resizeMode="contain"
                  source={require("../../../assets/swipe.png")}
                  style={{ width: width * 0.5, height: height * 0.5 }}
                />
              </View>
            }
          />
        )}
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(HelloWorldApp);
