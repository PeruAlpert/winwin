import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    Image,
    Modal,
    FlatList,
    ActivityIndicator,
    Dimensions
} from 'react-native';
import Toast from 'react-native-simple-toast';
import QRCode from 'react-native-qrcode-svg';
import { ServiceProvider } from '../../controllers/';
import { Item } from '../../components';
import { COLORS } from '../../stylings';
import { Styles } from './Styles';
import I18n from "../../utils/language";

let { width, height } = Dimensions.get('window');

class DetailedOfferModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            orders: []
        }
    }

    componentWillMount() {
        let { data, branchId, source } = this.props;

        if (source == 'fromSpMainScreen') {
            ServiceProvider.getSharedInstance().getUserOrderDetails(
                { branchId, headerOrderId: data.OrderHeaderId }, (res, err) => {
                    if (!err) {
                        this.setState({
                            loading: false,
                            orders: res
                        });
                    } else {
                        Toast.show('Cannot get user orders', Toast.SHORT);
                        this.setState({ loading: false });
                    }
                });
        } else if (source == 'fromUserOrderHistoryScreen') {
            ServiceProvider.getSharedInstance().getDetailedOrderHistory(
                { OrderHeaderId: data.OrderHeaderId }, (res, err) => {
                    if (!err) {
                        this.setState({
                            loading: false,
                            orders: res
                        });
                    } else {
                        Toast.show("Can't get detailed order history, Please Try again later");
                        this.setState({ loading: false });
                    }
                });
        }
    }

    renderSpMainScreenItem = ({ item }) => {
        return (
            <Item
                title={item.OfferTitle}
                description={item.OfferDesc}
                hasRequests={true}
                quantity={item.Quantity}
            />
        );
    }

    renderSpMainScreenFlatList() {
        let { orders } = this.state;

        if (orders.length > 0) {
            return (
                <FlatList
                    data={orders}
                    renderItem={this.renderSpMainScreenItem}
                    keyExtractor={(item) => item.ID}
                />
            )
        }
    }

    renderUserOrderHistoryItem = ({ item }) => {
        return (
            <Item
                title={item.OfferTitle}
                isOrderHistoryDetailedOfferModal={true}
                hasRequests={true}
                limit={item.Quantity}
                quantity={item.Price}
            />
        );
    }

    renderUserOrderHistoryFlatList() {
        let { orders } = this.state;

        if (orders.length > 0) {
            return (
                <FlatList
                    data={orders}
                    renderItem={this.renderUserOrderHistoryItem}
                    keyExtractor={(item) => item.ID}
                />
            )
        }
    }

    cancelUserOrder() {
        let { data } = this.props;

        //Enable Loading Indicator
        this.setState({ loading: true });

        ServiceProvider.getSharedInstance().cancelOrder(
            { OrderHeaderId: data.OrderHeaderId }, (res, err) => {
                if (!err) {
                    if (res.Message != undefined) {
                        Toast.show(res.Message, Toast.LONG);
                    } else {
                        Toast.show('Order has been deleted successfully', Toast.LONG);
                    }

                    this.setState({
                        loading: false
                    }, () => this.props.closeOfferModal());
                } else {
                    Toast.show("Can't cancel order, Please Try again later");
                    this.setState({
                        loading: false
                    }, () => this.props.closeOfferModal());
                }
            });
    }

    renderCancelUserOrder() {
        return (
            <TouchableOpacity
                style={{ marginBottom: 20, backgroundColor: 'red', borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}
                onPress={() => this.cancelUserOrder()} >
                <Text style={{ color: COLORS.WHITE, paddingHorizontal: 20, paddingVertical: 15 }}>CANCEL ORDER</Text>
            </TouchableOpacity>
        );
    }

    renderNoOffers() {
        return (
            <View style={[Styles.offerContainer, { alignItems: 'center' }]}>
                <Text>{I18n.t("noOffer")}</Text>
            </View>
        )
    }

    renderLoading() {
        return (
            <View>
                <ActivityIndicator size='large' color={COLORS.BABY_BLUE} />
                <Text style={{ color: COLORS.BABY_BLUE }}>Loading...</Text>
            </View>
        )
    }

    handleConfirm() {
        let { data, branchId, closeOfferModal, requestSPListOrders } = this.props;
        this.setState({ ...this.state, loading: true })
        ServiceProvider.getSharedInstance().getUserOrderDetails(
            { branchId, headerOrderId: data.OrderHeaderId }, (res, err) => {
                if (!err) {
                    this.setState({
                        ...this.state,
                        orders: res
                    });

                    let detID = this.state.orders[0].DetailID;
                    ServiceProvider.getSharedInstance().confirmOrder([detID], (res, err) => {
                        if (!err) {
                            if (res.Message != undefined) {
                                Toast.show(res.Message, Toast.LONG);
                                this.setState({ ...this.state, loading: false });
                            } else {
                                requestSPListOrders();
                                this.setState({ ...this.state, loading: false });
                                closeOfferModal();
                            }
                        } else {
                            Toast.show('order done');
                            this.setState({ ...this.state, loading: false });
                        }
                    });


                } else {
                    Toast.show('Cannot get user orders', Toast.SHORT);
                    this.setState({ ...this.state, loading: false });
                }
            });

    }

    render() {
        let { visible, data, source } = this.props;
        return (
            <Modal
                transparent={true}
                visible={visible}
                onRequestClose={() => this.props.closeOfferModal()}>
                <View style={Styles.mainContainer}>
                    {this.state.loading ?
                        this.renderLoading()
                        :
                        // SP Main Screen 
                        (source == 'fromSpMainScreen') && data ?
                            <View style={Styles.offerContainer}>
                                {data.QRCode ?
                                    <QRCode
                                        value={data.QRCode}
                                        color={COLORS.BABY_BLUE}
                                    />
                                    : null
                                }

                                <Text style={{ fontSize: 18, color: 'grey', marginTop: 5, }}>{data.UserName}</Text>
                                <Text style={{ fontSize: 18, color: 'green', fontWeight: 'bold' }}>{data.Total}</Text>
                                {this.renderSpMainScreenFlatList()}
                                <TouchableOpacity onPress={this.handleConfirm.bind(this)}
                                    style={{ marginVertical: 20, zIndex: 1, backgroundColor: COLORS.BABY_BLUE, height: 40, width: 80, alignItems: 'center', justifyContent: 'center', borderRadius: 20 }}>
                                    <Text style={{ color: 'white' }}>confirm</Text>
                                </TouchableOpacity>
                            </View>
                            // User Order History
                            : (source == 'fromUserOrderHistoryScreen') && data ?
                                <View style={Styles.offerContainer}>
                                    <Text style={{ fontSize: 18, color: 'grey', marginTop: 5 }}>TOTAL ORDER</Text>
                                    <Text style={{ fontSize: 18, color: 'green', fontWeight: 'bold', marginBottom: 20 }}>{data.Total} EGP</Text>
                                    {this.renderCancelUserOrder()}
                                    {this.renderUserOrderHistoryFlatList()}
                                </View>
                                : null
                    }
                </View>
            </Modal>
        );
    }
}

export { DetailedOfferModal };


