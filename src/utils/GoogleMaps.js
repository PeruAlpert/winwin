import { PermissionsAndroid, Alert } from 'react-native';
// import Geolocation from 'react-native-geolocation-service';

export async function getCurrentLocation(callback) {
    const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
            'title': 'Win Win App',
            'message': 'Win Win App access to your location '
        }
    )
    
    if (granted) {
        navigator.geolocation.getCurrentPosition(
            position => {
                callback(false, position);
            //   const location = JSON.stringify(position);
          
            //   alert(location)
            },
            error => callback(true, error),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
        // Geolocation.getCurrentPosition((position) => {
        //     callback(false, position);
        // }, (err) => {
            // callback(true, 'err');
        // });
    }
}
