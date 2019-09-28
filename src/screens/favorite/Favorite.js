import React, { Component } from 'react';
import {
    View,
    FlatList,
    Text
} from 'react-native';
import { Item } from '../../components';
import { OfferModal } from '../../modals';
import { Styles } from './Styles';
import { retrieveUser } from '../../utils';
import { Offers } from '../../controllers';
import { EventRegister } from 'react-native-event-listeners'
import I18n from "../../utils/language";
class Favorite extends Component {
    constructor(props) {
        super(props);
        this.itemRef = [];
        this.state = {
            listData: [],
            loading: true,
            requestedList: [],
            offerModal: false,
            user: { Id: null, IsActive: false },
            refreshFlatList: false
        }

        this.handleRequestedList = this.handleRequestedList.bind(this);
    }

    componentWillMount() {

        retrieveUser((user) => {
            if (user) {
                let userID = user.Id;
                this.setState({ user });
                Offers.getSharedInstance().getFavourite({ userID }, (res, err) => {
                    console.log('res', res);
                    this.setState({
                        listData: res ? res : [],
                        loading: false
                    });
                });
            }
        });
    }

    onPressUnFav(branchOfferID, itemIndex) {
        let self = this;
        let { user } = this.state;
        let userID = user.Id;
        Offers.getSharedInstance().toggleFavourite('makeUnFav', { branchOfferID, userID }, (res, err) => {
            if (!err) {
                self.refreshFlatList();
            } else {
                console.log('Favourite Error ', err);
            }
        });

    }

    componentDidMount() {
        EventRegister.addEventListener('toggleOfferModal', (data) => {
            if (data.key == 'Favorite') {
                this.handleRequestedList();
            }
        });

        this.didFocusListener = this.props.navigation.addListener(
            'didFocus',
            this.componentDidFocus.bind(this)
        );
    }

    componentDidFocus() {
        this.refreshFlatList();
        this.resetRequests();
    }

    componentWillUnmount() {
        this.didFocusListener.remove();
    }

    toggleOfferModal() {
        this.setState({
            offerModal: !this.state.offerModal
        });
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

    changeNumOfOffers(id, quantity) {
        let index = this.state.listData.findIndex(i => i.ID == id);
        let list = this.state.listData;
        list[index].quantity = quantity;
        this.setState({ listData: list });
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

    renderItem = ({ item, index }) => {
        let { user } = this.state;

        return (
            <Item
                onRef={(ref) => this.itemRef[index] = ref}
                limit={item.Limit}
                hasCounter={true}
                image={{ uri: item.Image }}
                title={item.Title}
                description={item.Description}
                oldPrice={item.OldPrice}
                newPrice={item.NewPrice}
                isFavListScreen={true}
                hasFav={true}
                onPressFav={() => this.onPressUnFav(item.BranchOfferID, index)}
                isActive={user.IsActive}
                innerContainerStyle={{ padding: 0 }}
                onPress={() => console.log('Selected Offer', item.ID)}
                getQuantity={(quantity) => { this.changeNumOfOffers(item.ID, quantity) }}
            />
        )
    }

    refreshFlatList() {

        this.setState({ loading: true, refreshFlatList: true });
        let self = this;
        Offers.getSharedInstance().getFavourite({ userID: this.state.user.Id }, (res, err) => {
            console.log('res', res);
            self.setState({
                listData: res ? res : [],
                loading: false,
                refreshFlatList: false
            });
        });
    }


    renderFlatList() {
        let { listData, loading, refreshFlatList } = this.state;
        if (listData.length > 0) {
            return (
                <FlatList
                    data={listData}
                    renderItem={this.renderItem}
                    keyExtractor={(item) => item.BranchOfferID}
                    onRefresh={() => this.refreshFlatList()}
                    refreshing={refreshFlatList}
                />
            );
        }
        else {
            return (
                <View style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                    <Text>{I18n.t("favorite")}</Text>
                </View>
            )
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

    render() {
        return (
            <View style={Styles.mainContainer}>

                {this.renderFlatList()}
                {this.renderOfferModal()}
            </View>
        );
    }
}

export { Favorite };


