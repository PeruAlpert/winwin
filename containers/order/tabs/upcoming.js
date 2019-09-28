import React, { Component } from "react";
import {
  Dimensions,
  View,
  FlatList,
  Image,
  ActivityIndicator
} from "react-native";
const { width, height } = Dimensions.get("window");
import styles from "../styles";
import OrderCard from "../../../components/orderCard";
import Server from "../../../constants/server";
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
  cancelOrder = (item, event) => {
    this.setState({ isLoading: true });
    fetch(`${api_url}/Orders/CancleOrder?id=${item.orderHeaderId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(responseJson => {
        this.setState({
          isLoading: false
        });
        this.renderUpcoming();
      })
      .catch(error => {
        this.setState({
          isLoading: false
        });
        alert("try again");
      });
  };
  renderOrderSatatus = item => (
    <OrderCard
      img={item.icon}
      orderDesc={item.title}
      brandName={item.brandName}
      date={new Date(item.orderDate).toLocaleDateString()}
      branchName={item.locationName}
      orderQuantity={item.quantity}
      onPress={this.cancelOrder.bind(this, item)}
    />
  );
  componentWillMount() {
    this.setState({ id: this.props.user.userId });
  }
  componentDidMount() {
    this.renderUpcoming();
  }
  onRefresh() {
    this.setState({ isLoading: true }, this.renderUpcoming());
  }
  renderUpcoming = () => {
    this.setState({ isLoading: true });
    fetch(
      `${api_url}/Orders/GetCurrentBasket?userId=${this.props.user.userId}`,
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
        // console.log(responseJson);
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
