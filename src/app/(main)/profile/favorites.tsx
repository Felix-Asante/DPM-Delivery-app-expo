import {useQuery} from '@tanstack/react-query';
import {useLocalSearchParams} from 'expo-router';
import React, {useMemo, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';

import GoBack from '../../../components/GoBack';
import ContentCard from '../../../components/shared/cards/ContentCard';
import ErrorMessage from '../../../components/shared/errors/ErrorMessage';
import Colors from '../../../constants/Colors';
import {getPlacesWithOffers} from '../../../lib/specials';
import {getUserLikes} from '../../../lib/user';
import {useGlobalStore} from '../../../store/global';

export default function FavAndOffers() {
  const {type} = useLocalSearchParams();

  const isOffer = type === 'OFFERS';

  const [selectedCategory, setSelectedCategory] = useState<string>('0');
  const categories = useGlobalStore(state => state.categories);
  const [refreshing, setRefreshing] = useState(false);

  const {data: placesOffer = [], isLoading: loadingOffer} = useQuery({
    queryKey: ['placesOffer'],
    queryFn: getPlacesWithOffers,
    enabled: isOffer,
    placeholderData: previousData => previousData,
  });

  const {data: Likes = [], isLoading} = useQuery({
    queryKey: ['getUserLikes'],
    queryFn: getUserLikes,
    enabled: !isOffer,
    placeholderData: previousData => previousData,
  });

  const content: any = !isOffer ? Likes : placesOffer;

  const filteredContent = useMemo(() => {
    if (selectedCategory === '0') return content;
    return content?.filter((c: any) => c.place?.id === selectedCategory);
  }, [content, selectedCategory]);

  const loadingContent = loadingOffer || isLoading;

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View className="pt-16 px-3 h-full bg-white">
      <GoBack
        label={isOffer ? 'Special offers & promo' : 'Your favorite places'}
      />

      {isOffer && (
        <View className="mb-5">
          <FlatList
            renderItem={c => (
              <TouchableOpacity
                onPress={() => setSelectedCategory(c.item.id)}
                className={`rounded-full py-1 px-2 border border-primary  mr-2 ${
                  selectedCategory === c.item.id ? 'bg-primary' : ''
                }`}>
                <Text
                  className={`${
                    selectedCategory === c.item.id
                      ? 'text-white'
                      : 'text-primary'
                  }`}>
                  {c.item.name}
                </Text>
              </TouchableOpacity>
            )}
            data={[{id: '0', name: 'All', image: '', slug: ''}, ...categories]}
            keyExtractor={c => c.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
      <View className="h-full w-full">
        {loadingContent ? (
          <ActivityIndicator size="small" color={Colors.primary.main} />
        ) : filteredContent.length > 0 ? (
          <FlatList
            data={filteredContent}
            keyExtractor={item => item?.id!}
            renderItem={data => (
              <View className="mb-4">
                <ContentCard
                  width="w-full"
                  imageHeight="h-[150px]"
                  place={data?.item.place}
                  isOffer={isOffer}
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
        ) : (
          <View className="h-[75vh] justify-center">
            <ErrorMessage title="" description="No content to show" />
          </View>
        )}
      </View>
    </View>
  );
}
