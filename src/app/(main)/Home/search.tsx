import {useQuery} from '@tanstack/react-query';
import {useLocalSearchParams} from 'expo-router';
import {Search, SlidersHorizontal} from 'lucide-react-native';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';

import BottomSheet from '../../../components/BottomSheet';
import ContentCard from '../../../components/shared/cards/ContentCard';
import Input from '../../../components/shared/inputs';
import Colors from '../../../constants/Colors';
import {FILTERS} from '../../../constants/enums';
import {useDebounce} from '../../../hooks/useDeounce';
import {searchPlaces} from '../../../lib/places';
import SearchFilters from '../../../sections/main/SearchFilters';
import {useGlobalStore} from '../../../store/global';
import {Place} from '../../../types/place';

export default function SearchScreen() {
  const {control, watch} = useForm();
  const debounceValue = useDebounce(watch('search'), 2000);
  const {category} = useLocalSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const {selectedCategories, selectedFilters} = useGlobalStore(state => state);

  const queryKey = ['search', debounceValue, category, refreshing];

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const {data, isLoading} = useQuery<Place[]>({
    queryKey,
    queryFn: () => {
      return searchPlaces({
        query: debounceValue,
        category: category?.toString(),
      });
    },
    enabled: category?.length > 0 || debounceValue !== undefined,
    placeholderData: previousData => previousData,
  });

  const filteredResult = useMemo(() => {
    let filteredData = data ?? [];

    if (selectedCategories.length) {
      filteredData = filteredData.filter(place =>
        selectedCategories.includes(place.category?.id),
      );
    }

    if (selectedFilters.includes(FILTERS.CHEAP_DELIVERY)) {
      filteredData = filteredData.sort(
        (a, b) => a?.deliveryFee ?? 0 - b?.deliveryFee! ?? 0,
      );
    }

    // if (selectedFilters.includes(FILTERS.SPECIAL_OFFERS)) {
    //   filteredData = filteredData.filter(place => place.isOffer);
    // }

    // Remove duplicates based on place id
    const uniquePlaces = Array.from(
      new Set(filteredData.map(place => place.id)),
    ).map(id => filteredData.find(place => place.id === id));

    return uniquePlaces ?? [];
  }, [data, selectedCategories, selectedFilters]);

  return (
    <View className="pt-20 px-3 min-h-full bg-white">
      <StatusBar barStyle="dark-content" />
      <View className="flex-row  space-x-5 mb-5">
        <View className="w-[85%]">
          <Input
            startContent={<Search size={20} color={Colors.light.main} />}
            placeholder="What are you craving?"
            control={control}
            name="search"
          />
        </View>
        <TouchableOpacity
          className="pt-2.5"
          disabled={isLoading || data?.length === 0}
          onPress={() => setShowFilters(true)}>
          <SlidersHorizontal
            size={25}
            color={
              isLoading || data?.length === 0
                ? Colors.light.main
                : Colors.primary.main
            }
          />
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <ActivityIndicator size="small" color={Colors.primary.main} />
      ) : (
        <FlatList
          data={filteredResult}
          keyExtractor={item => item?.id!}
          renderItem={place => (
            <View className="mb-4">
              <ContentCard
                width="w-full"
                imageHeight="h-[150px]"
                place={place?.item!}
              />
            </View>
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={Colors.primary.main}
            />
          }
        />
      )}
      <BottomSheet
        snapPoints={['25%', '90%']}
        open={showFilters}
        onClose={() => setShowFilters(false)}>
        <SearchFilters onClose={() => setShowFilters(false)} />
      </BottomSheet>
    </View>
  );
}
