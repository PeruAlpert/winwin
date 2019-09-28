import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    ImageBackground,
    TouchableOpacity,
    Image,
    Linking,
    ActivityIndicator,
    FlatList
} from 'react-native';
import { COLORS, FONTSIZE } from '../../stylings';
import { Styles } from './Styles';
import { ServiceProvider } from '../../controllers';
import { Item } from '../../components';
import { DetailedOfferModal } from '../../modals/';
import { removeUser, retrieveUser } from '../../utils';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-simple-toast';
import QRCode from 'react-native-qrcode-svg';
import I18n from "../../utils/language";
const headerBackground = require('../../assets/images/Restaurants_Header.png');


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeView: 1,
            user: { Id: null, IsActive: false, IsBranch: null },
            profileValues: null,
            ordersHistory: [],
            loading: false,
            refreshOrdersHistoryFlatList: false,
            isDetailedOfferModal: false,
            detailedOfferData: null,
            VIEWS_DATA: [
                {
                    title: I18n.t("history"),
                    iconName: 'ios-paper',
                },
                {
                    title: I18n.t("profile"),
                    iconName: 'ios-person',
                },
                {
                    title: I18n.t("aboutUs"),
                    iconName: 'ios-people',
                }
            ]
        }
    }

    componentWillMount() {
        retrieveUser((user) => {
            if (user) {
                this.setState({ user }, () => {
                    this.getFullData();
                });
            }
        });
    }

    componentDidMount() {
        this.didFocusListener = this.props.navigation.addListener(
            'didFocus',
            this.getFullData.bind(this)
        );
    }

    componentWillUnmount() {
        this.didFocusListener.remove();
    }

    getProfileValues() {
        ServiceProvider.getSharedInstance().getProfileValues(
            { userId: this.state.user.Id, IsBranch: this.state.user.IsBranch }, (res, err) => {
                if (!err) {
                    this.setState({
                        profileValues: res ? res : null,
                        loading: false
                    });
                } else {
                    Toast.show("Can't get user information, Please Try again later");
                    this.setState({ loading: false });
                }
            });
    }

    getUserOrderHistory() {
        this.setState({ loading: true, refreshOrdersHistoryFlatList: true });

        ServiceProvider.getSharedInstance().getUserOrderHistory({ userId: this.state.user.Id }, (res, err) => {
            if (!err) {
                this.setState({
                    ordersHistory: res ? res : null,
                    loading: false,
                    refreshOrdersHistoryFlatList: false
                });
            } else {
                Toast.show("Can't get user information, Please Try again later");
                this.setState({ loading: false, refreshOrdersHistoryFlatList: false });
            }
        });
    }

    getFullData() {
        this.setState({ loading: true });
        this.getProfileValues();
        this.getUserOrderHistory();
    }

    // Orders History DetailedOfferModal
    openAndSetDetailedOfferModal(detailedOfferData) {
        this.setState({
            isDetailedOfferModal: true,
            detailedOfferData
        })
    }

    // Orders History DetailedOfferModal
    closeAndResetDetailedOfferModal() {
        this.getUserOrderHistory();
        this.setState({
            isDetailedOfferModal: false,
            detailedOfferData: null
        })
    }

    renderItem(item, index) {
        let isActive = (index == this.state.activeView) ? true : false;
        let itemStyle = isActive ? Styles.itemActiveIcon : Styles.itemInactiveIcon;
        let iconSize = isActive ? 40 : 25;
        let textStyle = isActive ? Styles.itemActiveText : Styles.itemInactiveText;

        return (
            <TouchableOpacity
                style={Styles.itemContainer}
                onPress={() => !isActive ? this.setState({ activeView: index }) : null}>
                <View style={[Styles.itemRoundContainer, itemStyle]}>
                    <Icon name={item.iconName} size={iconSize} color={COLORS.WHITE} />
                </View>
                <Text style={textStyle}>{item.title.toUpperCase()}</Text>
            </TouchableOpacity>
        );
    }

    renderTouchableHeader() {
        let { user } = this.state;

        return (
            <ImageBackground source={headerBackground} style={Styles.imageBackgroundContainer}>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    {
                        this.state.VIEWS_DATA.map((view, index) =>
                            (user.IsBranch && index == 0) ? null : this.renderItem(view, index)
                        )
                    }
                </ScrollView>
            </ImageBackground>

        );
    }

    renderHistoryListItem = ({ item }) => {
        console.log('Order Item', item);
        return (
            <Item
                title={'Oreder Number' + item.OrderNo}

                isOrderHistory={true}
                hasRequests={true}
                quantity={I18n.t("total") + item.Total}
                onPress={() => this.openAndSetDetailedOfferModal(item)}
            />
        );
    }

    renderHistoryFlatList() {
        let { ordersHistory, refreshOrdersHistoryFlatList } = this.state;

        if (ordersHistory.length > 0) {
            return (
                <FlatList
                    data={ordersHistory}
                    renderItem={this.renderHistoryListItem}
                    keyExtractor={(item) => item.OrderHeaderId}
                    onRefresh={() => this.getUserOrderHistory()}
                    refreshing={refreshOrdersHistoryFlatList}
                />
            );
        } else {
            return (
                <Text>Empty Order History</Text>
            );
        }

    }

    renderOrdersHistory() {
        let { isDetailedOfferModal, detailedOfferData } = this.state;

        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {this.renderHistoryFlatList()}
                {isDetailedOfferModal ?
                    <DetailedOfferModal
                        closeOfferModal={() => this.closeAndResetDetailedOfferModal()}
                        data={detailedOfferData}
                        source={'fromUserOrderHistoryScreen'}
                        visible={isDetailedOfferModal}
                    />
                    : null
                }
            </View>
        );
    }

    renderLogout() {
        let { navigation } = this.props;

        return (
            <TouchableOpacity style={Styles.logoutBtn} onPress={() => removeUser((res) => res ? navigation.navigate('Auth') : null)} >
                <Text style={Styles.logoutText}>{I18n.t("logout")}</Text>
            </TouchableOpacity>
        );
    }

    renderProfilePriceRow(title, price, extraCurrency, textExtaStyle) {
        return (
            <View style={Styles.profileRowContainer}>
                {I18n.locale == 'en' ? <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={Styles.profileRowText}>{title}</Text>
                    <Text style={[Styles.profileRowText, textExtaStyle]}>{price} {extraCurrency}</Text>
                </View>
                    :
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={[Styles.profileRowText, textExtaStyle]}>{price} {extraCurrency}</Text>
                        <Text style={Styles.profileRowText}>{title}</Text>
                    </View>}

            </View>
        );
    }

    renderProfile() {
        let { profileValues, user } = this.state;
        let isNormalUser = user.IsBranch != null && !user.IsBranch;

        if (profileValues) {
            return (
                <ScrollView style={{ flex: 1 }}>
                    <View style={[Styles.profileContainer, isNormalUser ? { marginTop: 0 } : null]}>
                        {isNormalUser && profileValues.QRCode ?
                            <View style={{ marginVertical: 25, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                                <QRCode
                                    value={profileValues.QRCode}
                                    color={COLORS.BABY_BLUE}
                                />
                                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                                    <Text>{profileValues.QRCode}</Text>
                                </View>
                            </View>
                            : null
                        }
                        {profileValues.ExpiryDate ?
                            this.renderProfilePriceRow(I18n.t("expireDate"), profileValues.ExpiryDate.toString().split("T")[0])
                            : null
                        }
                        {this.renderProfilePriceRow(I18n.t("totalOrders"), profileValues.TotalOrders)}
                        {this.renderProfilePriceRow(I18n.t("totalPrice"), profileValues.TotalEarning, I18n.t("egp"))}
                        {isNormalUser ? this.renderProfilePriceRow(I18n.t("moneySaved"), profileValues.TotalSaving, I18n.t("egp"), { color: 'green' }) : null}
                        {this.renderLogout()}
                    </View>
                </ScrollView>
            );
        } else {
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>No Informations</Text>
            </View>
        }

    }

    renderSocialMediaIcons(iconName, url) {
        return (
            <Icon style={{ margin: 8 }} name={iconName} size={40} color={COLORS.BABY_BLUE} onPress={() => Linking.openURL(url)} />
        );
    }

    renderAboutUs() {
        return (
            <View style={Styles.aboutUsContainer}>
                <Image resizeMode='contain' style={Styles.aboutUsImage} source={require('../../assets/images/colored_logo.png')} />
                <View style={Styles.aboutUsSocialMediaContainer}>
                    {this.renderSocialMediaIcons('logo-facebook', 'https://www.facebook.com/winwinegypt/')}
                    {/* {this.renderSocialMediaIcons('logo-twitter', 'https://twitter.com')} */}
                    {/* {this.renderSocialMediaIcons('logo-youtube', 'https://youtube.com')} */}
                    {this.renderSocialMediaIcons('logo-instagram', 'https://instagram.com/winwin_eg?utm_source=ig_profile_share&igshid=ck0vmantozh9')}
                    {this.renderSocialMediaIcons('ios-call', 'tel:01141313114')}

                </View>
            </View>
        );
    }

    renderMainView() {
        let { activeView } = this.state;

        switch (activeView) {
            case 0:
                return this.renderOrdersHistory();
            case 1:
                return this.renderProfile();
            case 2:
                return this.renderAboutUs();
            default:
                break;
        }
    }


    renderLoading() {
        let { loading } = this.state;

        if (loading) {
            return (
                <ActivityIndicator style={Styles.loadingContainer} size='large' color={COLORS.BABY_BLUE} />
            );
        }
    }

    render() {
        return (
            <View style={Styles.mainContainer}>
                {this.renderLoading()}
                {this.renderTouchableHeader()}
                {this.renderMainView()}
            </View>
        );
    }
}

export { Profile };
