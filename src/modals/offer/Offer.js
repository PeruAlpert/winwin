import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    FlatList,
    ActivityIndicator
} from 'react-native';
import Toast from 'react-native-simple-toast';
import { EventRegister } from 'react-native-event-listeners';
import { Item } from '../../components';
import { COLORS } from '../../stylings';
import { ServiceProvider } from '../../controllers';
import { Styles } from './Styles';
import I18n from "../../utils/language";

class OfferModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }

    renderItem = ({ item }) => {
        let { isSP } = this.props;

        // normal User 
        if (!isSP) {
            return (
                <Item
                    image={{ uri: item.Image }}
                    title={item.Title}
                    description={item.Description}
                    oldPrice={item.OldPrice}
                    newPrice={item.NewPrice}
                    hasRequests={true}
                    quantity={item.quantity}
                    innerContainerStyle={{ padding: 0 }}
                />
            );
            // service provider 
        } else {
            return (
                <Item
                    title={item.OfferTitle}
                    description={item.OfferDesc}
                    hasRequests={true}
                    quantity={item.Quantity}
                />
            );
        }

    }

    renderFlatList() {
        return (
            <FlatList
                data={this.props.data}
                renderItem={this.renderItem}
                keyExtractor={(item) => item.ID}
            />
        )
    }

    confirmOrder() {
        let { navigation, closeOfferModal, resetData, userId, data, isSP, requestSPListOrders } = this.props;

        this.setState({ loading: true });

        // normal user
        if (!isSP) {
            ServiceProvider.getSharedInstance().makeOrder({ userId }, data, (res, err) => {
                if (res && res.Message == undefined) {
                    Toast.show('Order is confirmed.', Toast.LONG);
                } else {
                    Toast.show(res.Message, Toast.LONG);
                }

                resetData();
                closeOfferModal();
                navigation.pop(2);
                this.setState({ loading: false });
            });
            // service provider 
        } else {
            let detailIDS = [];
            data.map(item => detailIDS.push(item.DetailID));

            ServiceProvider.getSharedInstance().confirmOrder(detailIDS, (res, err) => {
                if (!err) {
                    if (res.Message != undefined) {
                        Toast.show(res.Message, Toast.LONG);
                        this.setState({ loading: false });
                    } else {
                        requestSPListOrders();
                        closeOfferModal();
                    }
                } else {
                    Toast.show('error' + err, Toast.SHORT);
                }
            });
        }
    }

    cancelOrder() {
        let { isSP, resetData, closeOfferModal } = this.props;
        Toast.show('Order is canceled.', Toast.SHORT);

        // normal user
        if (!isSP) {
            resetData();
            closeOfferModal();
        }
        // service provider 
        else {
            closeOfferModal();
        }
    }

    renderConfirmCancelView() {
        return (
            <View style={Styles.confirmCancelContainer}>
                <TouchableOpacity onPress={() => this.cancelOrder()} style={Styles.cancelButton}>
                    <Text style={Styles.cancelText} >Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.confirmOrder()} style={Styles.confirmButton}>
                    <Text style={Styles.confirmText}>Confirm</Text>
                </TouchableOpacity>
            </View>
        )
    }


    renderNoOffers() {
        return (
            <View style={[Styles.offerContainer, { alignItems: 'center' }]}>
                <Text>{I18n.t("noOffer")}</Text>
                <TouchableOpacity onPress={() => this.cancelOrder()} style={Styles.CloseButton}>
                    <Text style={Styles.cancelText} >{I18n.t("close")}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    renderLoading() {
        return (
            <ActivityIndicator size='large' color={COLORS.BABY_BLUE} />
        )
    }

    // Only For SP
    renderSpTotalView() {
        let totalPrice = 0;
        this.props.data.forEach((item) => {
            totalPrice += item.Price;
        });

        return (
            <View style={{ padding: 5, flexDirection: 'row', borderTopLeftRadius: 20, borderTopRightRadius: 20, width: '40%', justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: 'white' }}>
                <Text style={{ fontSize: 18, color: 'grey' }}>Total</Text>
                <Text style={{ fontSize: 18, color: 'green', fontWeight: 'bold' }}>{totalPrice}</Text>
            </View>
        );
    }

    render() {
        return (
            <Modal
                transparent={true}
                visible={this.props.visible}
                onRequestClose={() => this.props.closeOfferModal()}>
                <View style={Styles.mainContainer}>
                    {   // Sp Total price view
                        this.props.isSP ? this.renderSpTotalView() : null
                    }

                    {this.state.loading ?
                        this.renderLoading()
                        :
                        this.props.data.length > 0 ?
                            <View style={Styles.offerContainer}>
                                {this.renderFlatList()}
                                {this.renderConfirmCancelView()}
                            </View>
                            :
                            this.renderNoOffers()
                    }
                </View>
            </Modal>
        );
    }
}

export { OfferModal };
