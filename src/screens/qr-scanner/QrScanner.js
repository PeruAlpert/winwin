import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import { Styles } from './Styles';
import QRCodeScanner from 'react-native-qrcode-scanner';

class QrScanner extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
        }
    }

    onSuccess(qrResult) {
        let { onScanSuccess } = this.props;
        
        onScanSuccess(qrResult.data);
    }

    render() {
        return (
            <QRCodeScanner
                showMarker={true}
                onRead={this.onSuccess.bind(this)}
            />
        );
    }
}

export { QrScanner };


