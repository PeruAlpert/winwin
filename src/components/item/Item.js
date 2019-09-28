import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Image,
    Linking
} from 'react-native';
import { Styles } from './Styles';
import { COLORS, FONTSIZE } from '../../stylings';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { EventRegister } from 'react-native-event-listeners';
import Toast from 'react-native-simple-toast';

class Item extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            quantity: 0,
        }
        this.resetQuantity = this.resetQuantity.bind(this);
    }

    componentWillMount() {
        EventRegister.addEventListener('reset', this.resetQuantity);
    }

    componentDidMount() {
        if (this.props.onRef) {
            this.props.onRef(this);
        }
    }

    resetQuantity() {
        this.setState({ quantity: 0 })
    }

    onAddPress() {
        let { isActive, limit } = this.props;
        let { quantity } = this.state;
        if (isActive) {
            if (quantity < limit) {
                this.setState({ quantity: quantity + 1 }, () => {
                    this.props.getQuantity(this.state.quantity);
                });
            } else {
                Toast.show("You can't add greater than limit");
            }
        } else {
            Toast.show("Please active your account first.");
        }

    }

    onSubtractPress() {
        let { isActive } = this.props;
        let { quantity } = this.state
        if (isActive) {
            if (quantity > 0) {
                this.setState({ quantity: quantity - 1 }, () => {
                    this.props.getQuantity(this.state.quantity);
                })
            } else {
                Toast.show("Can't subtract offers less than zero");
            }
        } else {
            Toast.show("Please active your account first.");
        }

    }


    // render Item Price View
    /* renderPriceView() {
         let { oldPrice, newPrice } = this.props;
 
         return (
             <View style={[Styles.priceOuterContainer, { width: 160 }]}>
                 <View style={[Styles.priceInnerContainer, Styles.newPrice]}>
                     <Text style={[Styles.pricesText, { color: COLORS.WHITE }]}>{newPrice + " EGP"}</Text>
                 </View>
                 <View style={[Styles.priceInnerContainer, Styles.oldPrice]}>
                     <Text style={[Styles.pricesText, { color: COLORS.BABY_BLUE }]}>{oldPrice + " EGP"}</Text>
                 </View>
             </View>
         );
     }*/

    renderFavourite() {
        //  let { isFavorite } = this.state;
        let { onPressFav, isFavListScreen } = this.props;

        return (
            <Icon
                style={Styles.favIcon}
                name="md-heart"
                size={25}
                onPress={() => onPressFav()}
                color={(isFavListScreen) ? COLORS.RED : COLORS.LIGHT_GREY} />
        )
    }

    renderLimitCounterView() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <View style={Styles.limitView}>
                    <Text style={{ color: COLORS.WHITE }}>{this.props.limit}</Text>
                </View>
                <View style={Styles.counterView}>
                    <Icon name="ios-remove" size={25} color={COLORS.DARK_GREY} onPress={() => this.onSubtractPress()} />
                    <Text style={Styles.counterText}>{this.state.quantity}</Text>
                    <Icon name="ios-add" size={25} color={COLORS.DARK_GREY} onPress={() => this.onAddPress()} />
                </View>
            </View >
        );
    }

    renderNumOfRequestsView() {
        let { isOrderHistoryDetailedOfferModal, limit, quantity } = this.props;
        return (
            <View style={{ justifyContent: 'center' }}>
                <View style={[{ alignSelf: 'flex-end' }, isOrderHistoryDetailedOfferModal ? { flexDirection: 'row' } : null]}>
                    {isOrderHistoryDetailedOfferModal ?
                        <View style={[Styles.limitView, { backgroundColor: 'green', marginRight: 25 }]}>
                            <Text style={{ color: COLORS.WHITE }}>{limit}</Text>
                        </View>
                        : null
                    }
                    <Text style={Styles.numberOfRequestsText} >{quantity}</Text>
                </View>
            </View>
        );
    }

    renderPhoneView() {
        let { phone, onPressCall } = this.props;
        return (
            <MaterialIcon
                style={{ alignSelf: 'center', padding: 3 }}
                name="call"
                size={25}
                color={phone ? COLORS.GREEN : COLORS.LIGHT_GREY}
                onPress={() => phone ? onPressCall() : null}
            />
        );
    }

    // render Item Default View
    renderDefaultView() {
        let { image, title, description, oldPrice, newPrice, onPress, hasFav, hasCounter, isDetailedOffers, isOrderHistory, hasRequests, phone } = this.props;
        let hasPrice = (newPrice != undefined) && (oldPrice != undefined) ? true : false;
        let hasPhone = phone != undefined ? true : false;
        let TouchableComponent = (hasPrice || hasRequests) ? TouchableWithoutFeedback : TouchableOpacity;

        return (
            <TouchableComponent onPress={() => (hasPrice || hasRequests) && !isDetailedOffers && !isOrderHistory ? null : onPress()} style={Styles.defaultContainer}>

                <View style={{ flexDirection: 'row' }}>
                    {image && <Image style={Styles.image} source={image} resizeMode='contain' />}

                    <View style={Styles.titleDescContainer}>
                        <Text style={Styles.title}>{title}</Text>
                        <Text numberOfLines={2} style={Styles.description}>{description}</Text>


                    </View>

                    {hasPhone ? this.renderPhoneView() : null}
                    {hasFav ? this.renderFavourite() : null}
                    {hasCounter ? this.renderLimitCounterView() : null}
                    {hasRequests ? this.renderNumOfRequestsView() : null}

                </View>
            </TouchableComponent>
        );
    }

    render() {

        return (
            <View style={Styles.mainContainer}>
                <View style={Styles.innerContainer}>
                    {this.renderDefaultView()}
                </View>

                <View style={Styles.line}></View>
            </View>
        );
    }
}

export { Item };


