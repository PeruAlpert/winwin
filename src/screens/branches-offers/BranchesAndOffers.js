import React, { Component } from 'react';
import {
    View,
    FlatList,
    Text,
    ActivityIndicator,
    TouchableOpacity,
    Linking,
    Image,Dimensions,
} from 'react-native';
import { EventRegister } from 'react-native-event-listeners'
import { Styles } from './Styles';
import { Item, Header, SearchInput, ActivationButton } from '../../components';
import { OfferModal } from '../../modals';
import { Branches, Offers } from '../../controllers';
import { COLORS } from '../../stylings';
import Toast from 'react-native-simple-toast';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const leftIcon = require('../../assets/images/Back.png');
const { width, height } = Dimensions.get('window');

class BranchesAndOffers extends Component {

    constructor(props, context) {
        super(props, context);
        this.itemRef = [];
        this.state = {
            type: null,
            brandID: null,
            listData: [],
            // branch screen
            query: "",
            offerModal: false,
            requestedList: [],
            loading: true,
            loadingText: 'Loading...',
            user: this.props.navigation.state.params.user
        }

        this.handleRequestedList = this.handleRequestedList.bind(this);
    }

    static navigationOptions = ({ navigation }) => {
        let { type } = navigation.state.params;
        return {
            headerMode: 'screen',
            header: <Header
                leftIconStyle={Styles.leftIcon}
                leftIcon={leftIcon}
                title={type == 'branches' ? navigation.state.params.brand.Name.toUpperCase() : navigation.getParam("branchName").toUpperCase()}
                leftIconOnPress={() => navigation.goBack()}
                rightIcon={type == 'offers' ? <MaterialIcon style={{ alignSelf: 'center' }} name="directions" size={30} color={COLORS.BLACK} /> : null}
                rightIconOnPress={() => type == 'offers' ? navigation.getParam("navigateGoogleDirections") : null}
            />
        };
    }

    componentWillMount() {
        let { type, brandID, branchID, user } = this.props.navigation.state.params;

        if (type == 'branches' && brandID != null) {
            Branches.getSharedInstance().getBranches({ brandID }, (res, err) => {
                this.setState({
                    loading: false,
                    listData: res ? res : [],
                    type
                });
            });
        } else if (type == 'offers' && branchID != null) {
            Offers.getSharedInstance().getOffers({ branchID, userId: user.Id }, (res, err) => {
                this.setState({
                    loading: false,
                    listData: res ? res : [],
                    type
                });
            })
        }

        EventRegister.addEventListener('toggleOfferModal', (data) => {
            if (data.key == 'Main') {
                this.handleRequestedList();
            }
        });
        // this.didFocusListener = this.props.navigation.addListener(
        //     'didFocus',
        //     this.componentDidFocus.bind(this)
        // );
    }

    // componentDidFocus() {
    //     if (this.state.type == 'offers') {
    //         let { branchID, user } = this.props.navigation.state.params;
    //         let self = this;
    //         this.setState({ loading: true });
    //         Offers.getSharedInstance().getOffers({ branchID, userId: user.Id }, (res, err) => {
    //             self.setState({
    //                 loading: false,
    //                 listData: res ? res : []
    //             });
    //         })
    //     }
    // }

    componentDidMount() {
        this.props.navigation.setParams({
            navigateGoogleDirections: this.navigateGoogleDirections.bind(this)
        });
    }

    componentWillReceiveProps(nextProps) {
        let user = nextProps.navigation.getParam('user', null);

        if (user != null) {
            this.setState({ user });
        }
    }

    handleRequestedList() {
        let tmpArr = [];
        this.state.listData.map((item, key) => {
            if (item.quantity && item.quantity > 0) {
                tmpArr.push(item)
            }
        })
        this.setState({ requestedList: tmpArr }, () => {
            this.toggleOfferModal()
        })
    }

    toggleOfferModal() {
        let { type } = this.props.navigation.state.params;
        if (type == 'offers') {
            this.setState({
                offerModal: !this.state.offerModal
            })
        }
    }

    changeNumOfOffers(id, quantity) {
        let index = this.state.listData.findIndex(i => i.ID == id);
        let list = this.state.listData;
        list[index].quantity = quantity;
        this.setState({ listData: list })
    }

    resetRequests() {
        let list = this.state.listData;
        list.map((item, key) => {
            if (item.quantity && item.quantity > 0) {
                item.quantity = 0
            }
        })
        this.setState({ requestedList: [], listData: list })
        EventRegister.emit('reset');
    }

    toggleLoadingIndicator(bool, destinationName) {
        this.setState({
            loading: bool,
            loadingText: bool ? `Redirecting to ${destinationName}...` : 'Loading...'
        });
    }

    navigateGoogleDirections() {

        let { navigation } = this.props;
        let Name = navigation.getParam("branchName");
        let { latitude, longitude } = navigation.getParam("sourceLatLong");
        let { destLat, destLong } = navigation.getParam("destinationLatLong");

        // Render loading indicator at Parent Screen
        this.toggleLoadingIndicator(true, Name);

        let url = null;
        if (latitude != null && longitude != null) {
            url = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${destLat},${destLong}`;
        } else {
            url = `https://www.google.com/maps/dir/?api=1&destination=${destLat},${destLong}`;
        }

        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                Toast.show("Not Supported Location", Toast.SHORT);
                this.toggleLoadingIndicator(false, Name);
            } else {
                this.toggleLoadingIndicator(false, Name);
                return Linking.openURL(url);
            }
        }).catch(err => console.log('Error', err));
    }

    renderItem = ({ item, index }) => {
        let { navigation } = this.props;
        let { type, user } = this.state;
        let sourceLatLong = navigation.getParam('userLatLong');
        let destinationLatLong = { destLat: item.Latitude, destLong: item.Longitude }

        if (type == 'branches') {
            return (
                <Item
                    title={item.Name}
                    phone={item.Phone}
                    onPressCall={() => Linking.openURL(`tel:${item.Phone}`)}
                    onPress={() => navigation.navigate('Offers', {
                        user,
                        type: 'offers',
                        branchID: item.ID,
                        branchName: item.Name,
                        sourceLatLong,
                        destinationLatLong
                    })}
                />
            );
        } else if (type == 'offers') {
            console.log('items', item);
            return (
                <Item
                    onRef={(ref) => this.itemRef[index] = ref}
                    image={{ uri: item.Image }}
                    title={item.Title}
                    description={item.Description}
                    oldPrice={item.OldPrice}
                    newPrice={item.NewPrice}
                    limit={item.Limit}
                    hasCounter={true}
                    hasFav={true}
                    isFavListScreen={item.IsFav}
                    onPressFav={() => this.onPressFav(item.BranchOfferID, index, item.IsFav)}
                    isActive={user.IsActive}
                    getQuantity={(quantity) => { this.changeNumOfOffers(item.ID, quantity) }}
                    innerContainerStyle={{ padding: 0 }}
                    onPress={() => console.log('Selected Offer', item.ID)}
                />
            );
        }

    }

    renderFlatList() {
        let { listData, loading } = this.state;
        if (!loading) {
            if (listData.length > 0) {
                return (
                    <View>
                    <FlatList
                        data={listData}
                        renderItem={this.renderItem}
                        keyExtractor={(item) => item.ID}
                    />
                    
                    </View>
                );
            } else {
                return (
                    <View style={Styles.noResultContainer}>
                        <Text>No Result</Text>
                    </View>
                );
            }
        }
    }

    onPressSearch() {
        let { brandID } = this.props.navigation.state.params;
        let { query } = this.state;

        this.setState({ loading: true });
        if (query == "") {
            this.setState({
                listData: [],
                loading: false
            })
        } else {
            Branches.getSharedInstance().searchBranches({ brandID, query }, (res, err) => {
                if (!err) {
                    this.setState({
                        listData: res,
                        loading: false
                    });
                }
            });
        }

    }

    onPressFav(branchOfferID, itemIndex, isFav) {

        this.setState({ loading: true })

        let self = this;
        let { user } = this.state;
        let userID = user.Id;
        let { branchID } = this.props.navigation.state.params;
        let key = isFav ? 'makeUnFav' : 'makeFav';

        Offers.getSharedInstance().toggleFavourite(key, { branchOfferID, userID }, (res, err) => {
            if (!err) {
                Offers.getSharedInstance().getOffers({ branchID, userId: userID }, (res, err) => {
                    self.setState({
                        loading: false,
                        listData: res ? res : []
                    });
                })
            } else {
                self.setState({ loading: false })
                console.log('Favourite Error ', err);
            }
        });

    }

    onValueChangeSearchInput(newQuery) {
        this.setState({
            query: newQuery
        })
    }

    renderSearchInput() {
        let { type, brandID } = this.props.navigation.state.params;

        if (type == 'branches' && brandID != null) {
            return (
                <SearchInput
                    placeholderText={'Search your branch'}
                    onChangeText={(newQuery) => this.onValueChangeSearchInput(newQuery)}
                    onPress={() => this.onPressSearch()}
                />
            );
        }
    }

    renderOfferModal() {
        let { offerModal, user } = this.state;
        if (offerModal) {
            return (
                <OfferModal
                    closeOfferModal={() => this.toggleOfferModal()}
                    resetData={() => this.resetRequests()}
                    data={this.state.requestedList}
                    navigation={this.props.navigation}
                    userId={user.Id}
                    isSP={false}
                    visible={this.state.offerModal} />
            );
        }
    }

    renderLoadingIndicator() {
        let { loading, loadingText } = this.state;

        if (loading) {
            return (
                <View style={Styles.loadingContainer}>
                    <ActivityIndicator size="large" color={COLORS.BABY_BLUE} />
                    <Text>{loadingText}</Text>
                </View>
            );
        }
    }
    
    render() {
        let { user } = this.state;

        return (
            <View style={Styles.mainContainer}>
                {!user.IsActive ?
                    <ActivationButton navigation={this.props.navigation} />
                    : null
                }

                {this.renderLoadingIndicator()}
                
                {this.renderSearchInput()}
                {this.renderFlatList()}
                {this.renderOfferModal()}
            </View>
        );
    }
}

export { BranchesAndOffers };


