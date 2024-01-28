import * as geolib from 'geolib';
import React, {ReactNode, useEffect, useState} from 'react';
import {Image, View} from 'react-native';

import {DELIVERY_BOUNDARIES} from '../../constants';
import {useGlobalStore} from '../../store/global';
import FullScreenLoader from '../FullScreenLoader';
import SplashScreen from '../SplashScreen';
import ErrorMessage from '../shared/errors/ErrorMessage';

export default function IsWithinDeliveryLocation({
  children,
}: {
  children: ReactNode;
}) {
  const {userLocation} = useGlobalStore();
  const [isWithinLocation, setIsWithinLocation] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (userLocation) {
      const userPosition = {
        latitude: userLocation?.lat! ?? 0,
        longitude: userLocation?.lng! ?? 0,
      };

      //   5km
      const compareLocation = (location: any) =>
        geolib.isPointWithinRadius(location, userPosition, 5000);

      const isWithinLocation = DELIVERY_BOUNDARIES.some(compareLocation);
      setIsWithinLocation(isWithinLocation);
      setIsReady(true);
    } else {
      setIsReady(true);
    }
  }, [userLocation]);

  if (!isReady) return <FullScreenLoader />;

  if (!isWithinLocation) {
    return (
      <View className="bg-white min-h-[80%] h-full">
        <ErrorMessage
          title="Sorry, we don't deliver here"
          description="We're expanding quickly so please do check back soon!"
          illustration={
            <Image
              source={require('../../../assets/images/Globalization-pana.png')}
              resizeMode="contain"
              className="w-[250px] h-[210px]"
            />
          }
        />
      </View>
    );
  }

  return children;
}
