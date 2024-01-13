import {useQuery} from '@tanstack/react-query';
import React, {useState} from 'react';
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';

import ContentWithSliderSection from '../../../components/ContentWithSliderSection';
import CategoryCard from '../../../components/shared/cards/CategoryCard';
import ContentCard from '../../../components/shared/cards/ContentCard';
import {getNewPlaces, getPopularPlaces} from '../../../lib/places';
import {getPlacesWithOffers} from '../../../lib/specials';
import HomeHeader from '../../../sections/main/home/HomeHeader';
import {useGlobalStore} from '../../../store/global';

export default function FeedsScreen() {
  const {categories} = useGlobalStore();
  const [refreshing, setRefreshing] = useState(false);

  const {data: offers, isLoading} = useQuery({
    queryKey: ['specialOffers', refreshing],
    queryFn: getPlacesWithOffers,
    placeholderData: previousData => previousData,
  });

  const {data: newPlaces, isLoading: loadingNewPlaces} = useQuery({
    queryKey: ['newPlaces', refreshing],
    queryFn: getNewPlaces,
    placeholderData: previousData => previousData,
  });

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const {data: popularPlaces, isLoading: loadingPopularPlaces} = useQuery({
    queryKey: ['popularPlaces', refreshing],
    queryFn: () => getPopularPlaces(),
    placeholderData: previousData => previousData,
  });

  return (
    <SafeAreaView>
      <StatusBar barStyle="default" />
      <ScrollView
        className="pt-5 h-full bg-white"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <HomeHeader />
        <View className="px-3 pt-1">
          <ContentWithSliderSection
            content={offers || []}
            sectionTitle="Special offers 🎉😍"
            renderData={({item}) => (
              <ContentCard
                reductionPercent={item?.reductionPercent}
                price={item?.price}
                place={item.place}
                offer={item}
                isOffer
              />
            )}
            loading={isLoading}
            href="/(main)/Home/profile"
          />
          <ContentWithSliderSection
            content={categories.slice(0, 8)}
            sectionTitle="Top Categories"
            renderData={({item}) => <CategoryCard category={item} />}
            loading={false}
          />
          <ContentWithSliderSection
            content={newPlaces || []}
            sectionTitle="New places 😍⚡️"
            renderData={({item}) => (
              <ContentCard
                reductionPercent={item?.averagePrice}
                price={item?.averagePrice}
                place={item}
              />
            )}
            loading={loadingNewPlaces}
            href="/(main)/Home/profile"
          />
          <ContentWithSliderSection
            content={popularPlaces || []}
            sectionTitle="Your local favorites"
            renderData={({item}) => (
              <ContentCard
                reductionPercent={item?.averagePrice}
                price={item?.averagePrice}
                place={item}
              />
            )}
            loading={loadingPopularPlaces}
            href="/(main)/Home/profile"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
