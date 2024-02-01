import {useRouter} from 'expo-router';
import {MapPin, XIcon} from 'lucide-react-native';
import React, {useEffect, useState} from 'react';
import {Pressable, Text, TouchableOpacity, View} from 'react-native';
import {
  GooglePlaceData,
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
} from 'react-native-google-places-autocomplete';

import FullScreenLoader from '../../components/FullScreenLoader';
import {LOCATION_KEY} from '../../constants';
import Colors from '../../constants/Colors';
import {UseLocation} from '../../hooks/UseLocation';
import {useGlobalStore} from '../../store/global';
import {saveToSecureStore} from '../../utils/helpers';

export default function LocationPicker() {
  const router = useRouter();
  const [changingLocation, setChangingLocation] = useState(false);

  const {setUserLocation, userLocation, currentLocation} = useGlobalStore();
  const {requestUserLocation, locationDenied} = UseLocation();

  useEffect(() => {
    requestUserLocation();
  }, []);

  const addUserLocation = async (
    data: GooglePlaceData,
    details: GooglePlaceDetail | null,
  ) => {
    setChangingLocation(true);
    const location = {
      description: data.description,
      main_text: data.structured_formatting.main_text,
      place_id: data.place_id,
      reference: data.reference,
      display_name:
        details?.address_components[0].short_name ??
        data.structured_formatting.main_text,
      lat: details?.geometry.location.lat,
      lng: details?.geometry.location.lng,
    };
    setUserLocation(location);
    await saveToSecureStore(LOCATION_KEY, JSON.stringify(location));
    await new Promise(resolve => setTimeout(() => resolve(1), 200));
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(main)/Home/home');
    }
    setChangingLocation(false);
  };

  return (
    <>
      {changingLocation ? (
        <FullScreenLoader />
      ) : (
        <View className="pt-14 px-2 h-full bg-white">
          <View className="flex-row items-center mb-4">
            {(router.canGoBack() || userLocation) && (
              <Pressable
                className="mr-4"
                onPress={() =>
                  router.canGoBack()
                    ? router.back()
                    : router.replace('/(main)/Home/home')
                }>
                <XIcon size={25} color={Colors.dark.main} />
              </Pressable>
            )}
            <Text className="font-bold text-lg">Delivery Address</Text>
          </View>

          <View className="flex-1 h-full">
            <GooglePlacesAutocomplete
              onPress={addUserLocation}
              query={{
                key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
                language: 'en',
              }}
              // currentLocation
              currentLocationLabel="Current label"
              debounce={2000}
              enableHighAccuracyLocation
              placeholder="Search location"
              fetchDetails
              onNotFound={() => (
                <Text className="text-black">
                  Sorry, we couldn't find your location
                </Text>
              )}
              styles={{
                textInput: {
                  backgroundColor: Colors.light[100],
                  borderColor: Colors.light.main,
                  color: Colors.dark.main,
                  borderWidth: 0.5,
                },
                container: {
                  height: 53,
                },
              }}
            />
            <TouchableOpacity
              onPress={() => {
                if (locationDenied) {
                  requestUserLocation();
                } else {
                  setUserLocation(currentLocation);
                  router.canGoBack() && router.back();
                }
              }}
              className="mt-3 flex flex-row items-center absolute top-12 -z-10">
              <MapPin size={25} color={Colors.black.main} />
              <View className="ml-3">
                <Text className="text-black">Current Location</Text>
                <Text className="text-light text-sm">
                  {locationDenied
                    ? 'Allow location permission'
                    : currentLocation?.main_text}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
}
