import React, { Component } from 'react';
import {
    View,
    ActivityIndicator,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    FlatList
} from 'react-native';
import { Styles } from './Styles';
import { Item, Map, CollapsibleList, SearchInput, ActivationButton, Header } from '../../components';
import { Categories, Brands, Search, ServiceProvider } from '../../controllers';
import { COLORS } from '../../stylings';
import { Selection, OfferModal, DetailedOfferModal } from '../../modals';
import { retrieveUser, getCurrentLocation } from '../../utils';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-simple-toast';
import I18n from "../../utils/language";
class Main extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            region: {
                latitude: null,
                longitude: null,
                latitudeDelta: 0.922,
                longitudeDelta: 0.421,
            },
            latlng: {
                latitude: null,
                longitude: null,
            },
            markers: [],
            categories: [],
            categoryID: null,
            listType: 'Brand',
            listData: [],
            selectedID: null,
            query: "", // search Query
            isSelectionModal: false,
            selectionListValues: [
                { name: 'Category', value: 1 },
                { name: 'Brand', value: 2 },
                { name: 'Branch', value: 3 }
            ],
            searchBy: { name: 'Brand', value: 2 }, // default searchBy
            user: { Id: null, IsActive: null, IsBranch: null },
            mapStatus: 'loading', // 1-loading 2-ready 3-fail
            // SP
            spOrderList: null,
            spIsOfferModal: false,
            spDetailedOfferModal: false,
            detailedOfferData: null
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            header: null
        };
    }

    interval;

    componentWillMount() {
        retrieveUser((user) => {
            if (user) {
                this.setState({ user }, () => {
                    // Normal User
                    if (this.state.user.IsBranch != null && !this.state.user.IsBranch) {
                        Categories.getSharedInstance().getCategories((res, err) => {
                            if (!err) {
                                this.setState({
                                    categories: res
                                }, () => this.onPressCategory(res[0].ID))
                            } else {
                                Toast.show('Cannot get categories, please try again later', Toast.SHORT);
                            }
                        });
                        // Service Provider
                    } else if (this.state.user.IsBranch) {
                        ServiceProvider.getSharedInstance().getAllOrders({ branchId: this.state.user.Id }, (res, err) => {
                            if (!err) {
                                this.setState({ spOrderList: res });
                            } else {
                                Toast.show('Cannot get orders, please try again later', Toast.SHORT);
                            }
                        });
                        this.interval = setInterval(_ => { this.getSPOrders() }, 30000)
                    }
                });
            }
        });
    }

    componentDidMount() {
        this.getUserCurrentLocation();
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    getSPOrders() {
        ServiceProvider.getSharedInstance().getAllOrders({ branchId: this.state.user.Id }, (res, err) => {
            if (!err) {
                this.setState({ spOrderList: res });
            } else {
                Toast.show('Cannot get orders, please try again later', Toast.SHORT);
            }
        });
    }

    getUserCurrentLocation() {
        let { user } = this.state;

        if (!user.IsBranch) {
            getCurrentLocation((err, res) => {
                if (!err) {
                    let { latitude, longitude } = res.coords;
                    let region = {
                        latitude: latitude,
                        longitude: longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.00421
                    }
                    let latlng = {
                        latitude: latitude,
                        longitude: longitude,
                    }

                    this.setState({
                        region,
                        latlng,
                        mapStatus: 'ready'
                    }, () => this.getNearbyLocations(latitude, longitude));
                } else {
                    Toast.show("Can't get Currernt Location", Toast.SHORT);
                    this.setState({
                        mapStatus: 'fail'
                    })
                }
            });
        }
    }

    getNearbyLocations(lat, long) {
        ServiceProvider.getSharedInstance().nearbyLocations({ lat, long }, (res, err) => {
            if (!err && res.length > 0) {
                let tempMarkers = [];

                res.map(item => {
                    let itemRegion = { latitude: item.Lat, longitude: item.Long, latitudeDelta: 0.0922, longitudeDelta: 0.00421 };
                    let marker = {
                        region: itemRegion,
                        branchId: item.BranchId,
                        color: item.Color,
                        branchName: item.BranchName
                    }
                    tempMarkers.push(marker);
                });

                this.setState({ markers: tempMarkers });
            } else {
                Toast.show('Cannot find nearby location of your current location', Toast.SHORT);
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        let user = nextProps.navigation.getParam('user', null);

        if (user != null) {
            this.setState({ user });
        }
    }

    onPressCategory(categoryID) {
        if (categoryID != undefined && categoryID != null) {
            Brands.getSharedInstance().getBrands({ categoryID }, (res, err) => {
                if (!err) {
                    this.setState({
                        categoryID,
                        listData: res,
                        listType: 'Brand'
                    });
                }
            });
        }
    }

    onPressSearch() {
        let { searchBy, query } = this.state;

        Search.getSharedInstance().searchAll({ query, searchValue: searchBy.value }, (res, err) => {
            if (!err) {
                this.setState({
                    listData: res,
                    listType: searchBy.name
                });
            }
        })
    }

    onValueChangeSearchInput(newQuery) {
        this.setState({
            query: newQuery
        })
    }

    openSelectionModal() {
        this.setState({
            isSelectionModal: true
        })
    }

    closeSelectionModal() {
        this.setState({
            isSelectionModal: false
        })
    }

    onSelectFilter(searchBy) {
        this.setState({
            searchBy,
            query: ""
        })
    }

    onPressListItem(selectedItem) {
        let { listType, user, latlng } = this.state;
        let { navigation } = this.props;

        switch (listType) {
            case 'Category':
                this.onPressCategory(selectedItem.ID);
                break;
            case 'Brand':
                navigation.navigate('Branches', { userLatLong: latlng, user, type: 'branches', brandID: selectedItem.ID, brand: selectedItem });
                break;
            case 'Branch':
                navigation.navigate('Offers', {
                    user,
                    type: 'offers',
                    branchID: selectedItem.ID,
                    branchName: selectedItem.Name,
                    sourceLatLong: latlng,
                    destinationLatLong: { destLat: selectedItem.Latitude, destLong: selectedItem.Longitude }
                });
                break;
            default:
                break;
        }
    }

    toggleSPOfferModal() {
        this.setState({
            spIsOfferModal: !this.state.spIsOfferModal
        })
    }

    requestSPListOrders() {
        ServiceProvider.getSharedInstance().getAllOrders({ branchId: this.state.user.Id }, (res, err) => {
            if (!err) {
                this.setState({ spOrderList: res });
            } else {
                Toast.show('Cannot get orders, please try again later', Toast.SHORT);
            }
        });
    }

    openAndSetDetailedOfferModal(detailedOfferData) {

        this.setState({
            spDetailedOfferModal: true,
            detailedOfferData
        })

    }

    closeAndResetDetailedOfferModal() {
        this.setState({
            spDetailedOfferModal: false,
            detailedOfferData: null
        })

    }

    renderSelectionModal() {
        let { isSelectionModal, selectionListValues, searchBy } = this.state;

        if (isSelectionModal) {
            return (
                <Selection
                    closeSelectionModal={this.closeSelectionModal.bind(this)}
                    listValues={selectionListValues}
                    onSelection={this.onSelectFilter.bind(this)}
                    selectedValue={searchBy.value}
                />
            );
        }
    }

    renderUserView() {
        let { categories, listData, searchBy, query, user, mapStatus } = this.state;

        return (
            <View style={Styles.userContainer}>
                <View style={{ height: '40%' }}>
                    <View style={Styles.categoriesContainer} >
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            {
                                categories.length > 0 ?
                                    <View style={Styles.categoryInnerContainer}>
                                        {
                                            categories.map((category) =>
                                                <TouchableOpacity
                                                    onPress={() => this.onPressCategory(category.ID)}
                                                    style={{ width: 130, borderRadius: 10, marginHorizontal: 5, padding: 5, backgroundColor: category.Color }}
                                                >
                                                    <Image style={{ width: 40, height: 40, alignSelf: 'flex-end' }} source={{ uri: category.Icon }}></Image>
                                                    <Text style={{ color: COLORS.WHITE }} numberOfLines={1}>{I18n.t(category.Name.replace(/\&/, ''))}</Text>
                                                </TouchableOpacity>
                                            )
                                        }
                                    </View>
                                    : null
                            }
                        </ScrollView>
                    </View>

                    <SearchInput
                        value={query}
                        placeholderText={('Search your ' + searchBy.name).toUpperCase()}
                        onChangeText={(newQuery) => this.onValueChangeSearchInput(newQuery)}
                        onPress={() => this.onPressSearch()}
                        hasFilter={true}
                        onPressFilter={() => this.openSelectionModal()}
                    />
                </View>

                {!user.IsActive ?
                    <ActivationButton navigation={this.props.navigation} />
                    : null
                }

                <CollapsibleList
                    onPressListItem={(selectedItem) => this.onPressListItem(selectedItem)}
                    data={listData}
                />

                {(mapStatus == 'ready') ?
                    <Map
                        latlng={this.state.latlng}
                        region={this.state.region}
                        markers={this.state.markers}
                        navigation={this.props.navigation}
                        user={user}
                    />
                    : (mapStatus == 'loading') ?
                        < View style={Styles.loadingFailMap}>
                            <ActivityIndicator size="large" color={COLORS.BABY_BLUE} />
                            <Text style={{ color: COLORS.BABY_BLUE }}>Loading Map...</Text>
                        </View>
                        : (mapStatus == 'fail') ?
                            < View style={Styles.loadingFailMap}  >
                                <TouchableOpacity
                                    style={{ justifyContent: 'center', alignItems: 'center' }}
                                    onPress={() => this.setState({ mapStatus: 'loading' }, () => this.getUserCurrentLocation())}
                                >
                                    <View style={{ width: 40, height: 40, borderRadius: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.WHITE }}>
                                        <Icon
                                            name="ios-refresh"
                                            color={COLORS.BABY_BLUE}
                                            size={25}
                                        />
                                    </View>
                                    <Text style={{ color: COLORS.BABY_BLUE }}>Retry</Text>
                                </TouchableOpacity >
                            </ View>
                            : null
                }

                {this.renderSelectionModal()}
            </View >
        );
    }

    renderSPHeader() {
        return (
            <Header title='Orders' />
        );
    }

    renderSPListItem(rootItem) {
        let item = rootItem.item;

        return (
            <Item
                title={item.UserName}
                hasRequests={true}
                isDetailedOffers={true}
                quantity={item.Total}
                onPress={() => this.openAndSetDetailedOfferModal(item)}
            />
        );
    }

    renderSPFlatList() {
        let { spOrderList } = this.state;

        return (
            <FlatList
                data={spOrderList}
                extraData={this.state.spOrderList}
                renderItem={this.renderSPListItem.bind(this)}
                keyExtractor={(item) => item.DetailID}
            />
        )
    }

    renderSPUserQRCode() {
        return (
            <View style={Styles.spScanContainer}>
                <TouchableOpacity style={Styles.spScanBtn} onPress={() => this.props.navigation.navigate('Activation', { headerTitle: 'GET USER', toggleSPOfferModal: this.toggleSPOfferModal.bind(this) })}>
                    <Text style={Styles.spBtnText}>SCAN USER QR CODE</Text>
                </TouchableOpacity>
            </View>
        );
    }

    renderSPUserOffersModal(userOrders) {
        let { user } = this.state;

        return (
            <OfferModal
                closeOfferModal={() => this.toggleSPOfferModal()}
                data={userOrders}
                navigation={this.props.navigation}
                userId={user.Id}
                isSP={true}
                requestSPListOrders={() => this.requestSPListOrders()}
                visible={this.state.spIsOfferModal} />
        );
    }

    renderSpDetailedOfferModal() {
        let { detailedOfferData, user, spDetailedOfferModal } = this.state;

        return (
            <DetailedOfferModal
                closeOfferModal={() => this.closeAndResetDetailedOfferModal()}
                data={detailedOfferData}
                branchId={user.Id}
                source={'fromSpMainScreen'}
                visible={spDetailedOfferModal}
            />
        );
    }

    renderServiceProviderView() {
        let { spDetailedOfferModal } = this.state;
        let { navigation } = this.props;
        let userOrders = navigation.getParam('userOrders');

        return (
            <View style={Styles.serviceProviderContainer}>
                {this.renderSPHeader()}
                <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>WinWin Service provider</Text>
                {this.renderSPFlatList()}
                {userOrders != null && userOrders.length > 0 ? this.renderSPUserOffersModal(userOrders) : null}
                {spDetailedOfferModal ? this.renderSpDetailedOfferModal() : null}
            </View>
        );
    }

    render() {
        let { user } = this.state;

        if (user.IsBranch != null) {
            return (
                <View style={Styles.mainContainer}>
                    {user.IsBranch ? this.renderServiceProviderView() : this.renderUserView()}
                </View>
            );
        } else {
            return (
                <View style={Styles.loadingContainer}>
                    <ActivityIndicator size="large" color={COLORS.BABY_BLUE} />
                </View>
            );
        }

    }
}

export { Main };