import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import { Styles } from './Styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../stylings';
import { Item, Button } from '../';

class CollapsibleList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collapsed: true,
            isGoogleNavigationLoadingIndicator: false,
            googleNavigationIndicatorText: 'Redirecting to Google Navigation...',
            data: []
        }
    }


    closeCollapsibleList() {
        this.setState({
            collapsed: true,
        })
    }

    renderShowHideButton() {
        return (
            <Button buttonStyle={Styles.hideButton} onPress={() => this.closeCollapsibleList()}>
                <Icon name={"ios-arrow-dropdown-circle"} size={25} color={COLORS.BABY_BLUE} />
            </Button>
        );
    }

    componentWillReceiveProps(nextProps) {

        if (this.props.data != nextProps.data) {
            this.setState({
                data: nextProps.data,
                collapsed: false
            })
        }
    }

    toggleGoogleNavigationIndicator(bool) {
        this.setState({
            isGoogleNavigationLoadingIndicator: bool
        })
    }

    renderGoogleNavigationsLoadingIndicator() {
        let { isGoogleNavigationLoadingIndicator, googleNavigationIndicatorText } = this.state;

        if (isGoogleNavigationLoadingIndicator) {
            return (
                <View style={Styles.loadingContainer}>
                    <ActivityIndicator size="large" color={COLORS.BABY_BLUE} />
                    <Text>{googleNavigationIndicatorText}</Text>
                </View>
            );
        }
    }

    render() {
        let { collapsed, data } = this.state;
        let { onPressListItem } = this.props;

        return (
            <View maxHeight='55%' style={[Styles.mainContainer, !collapsed ? { flex: 1 } : null]}  >

                {!collapsed ? this.renderShowHideButton() : null}

                {!collapsed && (data.length > 0) ?
                    <View style={Styles.list}>
                        <ScrollView>
                            {
                                data.map((item) =>
                                    <Item
                                        image={{ uri: item.Icon }}
                                        title={item.Name}
                                        description={item.Description ? item.Description : item.Phone}
                                        long={item.Longitude}
                                        lat={item.Latitude}
                                        toggleGoogleDirectionsIndicator={(bool) => this.toggleGoogleNavigationIndicator(bool)}
                                        onPress={() => onPressListItem(item)}
                                    />
                                )
                            }
                        </ScrollView>
                    </View>
                    :
                    !collapsed ?
                        <View style={[Styles.list, { justifyContent: 'center', alignItems: 'center' }]}>
                            <Text> No Result</Text>
                        </View>
                        : null
                }

                {this.renderGoogleNavigationsLoadingIndicator()}

                {/* {collapsed ? this.renderShowHideButton('show') : null} */}
            </View>
        );
    }
}

export { CollapsibleList };
