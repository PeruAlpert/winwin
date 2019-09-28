import React, { Component } from 'react';
import {
    View,
    FlatList,
    Modal
} from 'react-native';
import { Styles } from './Styles';
import { ListItem, Icon } from 'react-native-elements';
import { COLORS } from '../../stylings';

class Selection extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {

        }
    }

    renderSelectedRightIcon(isSelectedItem) {
        if (isSelectedItem) {
            return (
                <Icon containerStyle={{ marginRight: 10 }} color={COLORS.BABY_BLUE} name={'done'} size={20} />
            );
        }
    }

    // Render Selection Item
    renderItem = ({ item }) => {
        let { selectedValue } = this.props;
        let isSelectedItem = (item.value == selectedValue) ? true : false;

        return (
            <ListItem
                containerStyle={Styles.itemContainer}
                title={item.name}
                titleStyle={[Styles.itemTitle, isSelectedItem ? { color: COLORS.BABY_BLUE } : null]}
                onPress={() => this.handleOnSelectItem(item)}
                rightIcon={this.renderSelectedRightIcon(isSelectedItem)}
                hideChevron={!isSelectedItem}
            />
        );
    }

    // Render SelectionsFlatList
    renderSelectionsFlatList() {
        let { listValues } = this.props;

        return (
            <FlatList
                data={listValues}
                renderItem={this.renderItem}
                keyExtractor={(item) => item.name}
            />
        );
    }

    // Select Item then close screen
    handleOnSelectItem(selectedItem) {
        let { onSelection, closeSelectionModal } = this.props;

        onSelection(selectedItem);
        closeSelectionModal();
    }

    render() {
        let { closeSelectionModal } = this.props;

        return (
            <Modal
                transparent={true}
                onRequestClose={() => console.log('Selection Modal Closed')}>
                <View style={Styles.mainContainer}>
                    <View style={Styles.innerContainer}>
                        <Icon containerStyle={Styles.closeIcon} name='close' color={COLORS.WHITE} size={30} onPress={() => closeSelectionModal()}></Icon>
                        <View style={Styles.flatListContainer}>
                            {this.renderSelectionsFlatList()}
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}

export { Selection };