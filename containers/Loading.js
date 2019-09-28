import React, { Component } from 'react';
import { Text, View, ActivityIndicator, BackHandler, Navigator } from 'react-native';
import { connect } from 'react-redux'
import { LoginStack, MenuStack } from "../navigation/RootNavigation";

const isEmpty = obj => {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

class Loading extends Component {

    // componentDidMount() {
    //     const path = !isEmpty(this.props.user) ? 'MainMenu' : 'Login'
    //     this.props.navigation.navigate(path)


    // }

    render() {
        return (
            <>
                {!isEmpty(this.props.user) ? <MenuStack /> : <LoginStack />}
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(
    mapStateToProps
)(Loading);
