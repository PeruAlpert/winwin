import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import { Styles } from './Styles';
import { COLORS } from '../../stylings';

class Map extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { user, region, markers, latlng, navigation } = this.props;
    console.log('markers', markers);

    return (
      <MapView
        style={Styles.map}
        region={region}
      >
        <Circle
          center={latlng}
          fillColor={COLORS.BABY_BLUE}
          strokeWidth={5}
          strokeColor={COLORS.LIGHT_BLUE}
          radius={50} />
        {markers.map(marker => (
          <Marker
            key={marker.region.latitude}
            coordinate={marker.region}
            pinColor={marker.color}
            onPress={() => navigation.navigate('Offers', {
              user,
              type: 'offers',
              branchID: marker.branchId,
              branchName: marker.branchName,
              sourceLatLong: latlng,
              destinationLatLong: { destLat: marker.region.latitude, destLong: marker.region.longitude }
            })}
          />
        ))}
      </MapView>
    );
  }
}

export { Map };
