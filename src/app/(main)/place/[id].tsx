import {useMutation, useQuery} from '@tanstack/react-query';
import {useLocalSearchParams, useRouter} from 'expo-router';
import {
  BadgePercent,
  ChevronLeftIcon,
  ChevronRight,
  HeartIcon,
  ShareIcon,
  Star,
  Truck,
} from 'lucide-react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Modal} from 'react-native-magnus';

import BottomSheet from '../../../components/BottomSheet';
import ErrorMessage from '../../../components/shared/errors/ErrorMessage';
import ServicesSkeleton from '../../../components/shared/skeletons/ServicesSkeleton';
import {TOKEN_KEY} from '../../../constants';
import Colors from '../../../constants/Colors';
import {
  disLikePlace,
  getPlace,
  getPlaceService,
  likePlace,
} from '../../../lib/places';
import Menu from '../../../sections/main/place/Menu';
import MenuDetails from '../../../sections/main/place/MenuDetails';
import {useGlobalStore} from '../../../store/global';
import {useAuthStore} from '../../../store/useAuth';
import {useCart} from '../../../store/useCart';
import {CartItem} from '../../../types/booking';
import {PlaceMenu, PlaceProducts} from '../../../types/place';
import {
  formatNumber,
  getErrorMessage,
  getFromSecureStore,
  pluralize,
  share,
} from '../../../utils/helpers';
import {calculateDistance} from '../../../utils/helpers/location';
import {toastErrorMessage} from '../../../utils/toast';

export default function PlacePage() {
  const {id, image} = useLocalSearchParams<{id: string; image: string}>();
  const {
    data: place,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['place', id],
    queryFn: () => getPlace(id),
  });

  const {data: services, isLoading: fetchingMenu} = useQuery({
    queryKey: ['menu', id],
    queryFn: () => getPlaceService(id),
  });

  const cart = useCart(state => state.cart);
  const {userLocation} = useGlobalStore();

  const distance = useMemo(() => {
    const position = {
      latitude: place?.latitude ? +place?.latitude : 0,
      longitude: place?.longitude ? +place?.longitude : 0,
    };
    const userPosition = {
      latitude: userLocation?.lat ?? 0,
      longitude: userLocation?.lng ?? 0,
    };
    const d: any = calculateDistance({userPosition, position});
    const distanceKm = d ? d / 1000 : d;
    return Number(distanceKm).toFixed(1);
  }, [calculateDistance, place]);

  const router = useRouter();
  const {user, setUser} = useAuthStore();
  const [liked, setLiked] = useState(false);
  const [selectedService, setSelectedService] = useState<CartItem | null>(null);

  useEffect(() => {
    setLiked(user?.likes.some(l => l === id) ?? false);
  }, [id, user]);

  const likePlaceMutation = useMutation({
    mutationFn: (token: string) => {
      return likePlace(id);
    },
  });
  const disLikePlaceMutation = useMutation({
    mutationFn: (token: string) => {
      return disLikePlace(id);
    },
  });

  const toggleLike = async () => {
    if (!user) {
      router.push('/(auth)/auth/login');
    }
    const options = {
      onSuccess(data: any) {
        setLiked(l => !l);
        setUser(data?.user);
      },
      onError(error: any) {
        toastErrorMessage(getErrorMessage(error));
      },
    };
    !liked
      ? likePlaceMutation.mutate('', options)
      : disLikePlaceMutation.mutate('', options);
  };

  if (isError)
    return (
      <View className="w-full h-full items-center justify-center">
        <ErrorMessage
          title="Something went wrong"
          description={getErrorMessage(error)}
        />
      </View>
    );

  return (
    <View className="h-full bg-white">
      <ScrollView>
        <View className="h-48 w-full">
          <ImageBackground
            source={{uri: image}}
            resizeMode="cover"
            className="w-full h-full">
            <View className="pt-10 px-2 flex-row items-center justify-between">
              <Pressable onPress={() => router.back()}>
                <ChevronLeftIcon size={30} className=" text-white" />
              </Pressable>
              <View className="flex flex-row items-center">
                <Pressable
                  onPress={() =>
                    share(`myapp://(main)/place/${id}`, {dialogTitle: 'Share'})
                  }
                  className="">
                  <ShareIcon className="w-5 text-white" />
                </Pressable>
                <TouchableOpacity onPress={toggleLike} className="ml-2">
                  <HeartIcon
                    size={25}
                    color={liked ? Colors.primary.main : 'white'}
                    fill={liked ? Colors.primary.main : 'transparent'}
                    stroke={liked ? Colors.primary.main : 'white'}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>
        <View className="bg-white h-full rounded-t-xl">
          <View className="px-3 py-4">
            <Text className="text-black text-lg font-semibold mb-2">
              {place?.name}
            </Text>

            <TouchableOpacity
              // onPress={() => goTo('Review', {placeId})}
              className="flex-row items-center justify-between pb-2 border-b border-light-200">
              <View className="flex-row items-center py-1.5">
                <Star fill="orange" stroke="orange" />
                <View className="ml-2">
                  <Text className="text-black text-[16px]">
                    {formatNumber(place?.total_reviews || 0)}{' '}
                  </Text>
                  <Text className="text-light text-[14px] ">
                    {place?.total_reviews}{' '}
                    {pluralize('review', place?.total_reviews!)}
                  </Text>
                </View>
              </View>
              <ChevronRight size={20} color={Colors.dark.main} />
            </TouchableOpacity>
            <TouchableOpacity className="pt-1 flex-row items-center justify-between pb-2 border-b border-light-200">
              <View className="flex-row items-center py-1.5">
                <Truck color={Colors.primary.main} />
                <View className="ml-2">
                  <Text className="text-black text-[16px]">
                    {Number(+distance / 1000).toFixed(2)} km
                  </Text>
                  <Text className="text-light text-[14px] ">
                    Delivery available -{' '}
                    {place?.deliveryFee && place?.deliveryFee > 0
                      ? `GH₵ ${place?.deliveryFee}`
                      : 'Free'}
                  </Text>
                </View>
              </View>
              <ChevronRight size={20} color={Colors.dark.main} />
            </TouchableOpacity>
            <TouchableOpacity
              // onPress={goToOfferScreen}
              className="pt-2 flex-row items-center justify-between pb-2 border-b border-light-200">
              <View className="flex-row items-center py-2">
                <BadgePercent color={Colors.primary.main} />
                <View className="ml-2">
                  <Text className="text-black text-[16px]">
                    Offers available
                  </Text>
                </View>
              </View>
              <ChevronRight size={20} color={Colors.dark.main} />
            </TouchableOpacity>

            <View className="mt-5">
              {fetchingMenu ? (
                <ServicesSkeleton />
              ) : services && services?.length > 0 ? (
                services?.map((service, i) => (
                  <Menu
                    title={service.name}
                    services={service.products}
                    key={i}
                    place={place!}
                    deliveryFee={place?.deliveryFee ?? 0}
                    onSelect={s => setSelectedService(s)}
                  />
                ))
              ) : (
                <Text>No products available</Text>
              )}
            </View>
          </View>
        </View>
        {/* <View className="absolute bottom-0 right-0 left-0 w-full h-full z-[10]"> */}

        {/* </View> */}
      </ScrollView>
      <Modal isVisible={selectedService !== null}>
        <MenuDetails
          menu={selectedService}
          onClose={() => setSelectedService(null)}
        />
      </Modal>
    </View>
  );
}
