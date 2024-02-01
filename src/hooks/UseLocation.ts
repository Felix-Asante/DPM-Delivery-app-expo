import * as Location from 'expo-location';
import {useState} from 'react';

import {LOCATION_KEY} from '../constants';
import {useGlobalStore} from '../store/global';
import {saveToSecureStore} from '../utils/helpers';

export function UseLocation() {
  const {setUserLocation, userLocation, setCurrentLocation} = useGlobalStore();
  const [locationDenied, setLocationDenied] = useState(userLocation === null);

  const requestUserLocation = async () => {
    const {status} = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      setLocationDenied(true);
      return;
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.LocationAccuracy.Highest,
    });
    const actualLocation = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });

    const userLocation = {
      display_name: actualLocation[0].name!,
      main_text: actualLocation[0].city!,
      reference: '',
      place_id: '',
      description: '',
    };
    if (!userLocation) {
      await saveToSecureStore(LOCATION_KEY, JSON.stringify(userLocation));
      setUserLocation(userLocation);
    }
    setCurrentLocation(userLocation);
    console.log(JSON.stringify(actualLocation));
  };

  return {locationDenied, requestUserLocation};
}
