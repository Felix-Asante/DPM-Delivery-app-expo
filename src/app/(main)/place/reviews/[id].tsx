import {useInfiniteQuery} from '@tanstack/react-query';
import {useLocalSearchParams, useRouter} from 'expo-router';
import {ChevronLeftIcon} from 'lucide-react-native';
import React from 'react';
import {FlatList, Pressable, Text, View} from 'react-native';
import {Avatar} from 'react-native-magnus';
import StarRating from 'react-native-star-rating-widget';

import ErrorMessage from '../../../../components/shared/errors/ErrorMessage';
import {getPlaceRating} from '../../../../lib/places';
import {getInitials} from '../../../../utils/helpers';

export default function Reviews() {
  const router = useRouter();
  const {id} = useLocalSearchParams<{id: string}>();

  const {hasNextPage, error, fetchNextPage, data} = useInfiniteQuery({
    queryKey: ['getReviews', id],
    queryFn: ({pageParam}) => getPlaceRating(id, pageParam?.page),
    getNextPageParam: lastPage => {
      const totalPages = lastPage.meta.totalPages;
      const currentPage = lastPage.meta.currentPage;
      if (totalPages === 1) return null;
      if (currentPage === totalPages) return null;
      return {page: currentPage + 1};
    },
    initialPageParam: {page: 1},
  });

  if (error) {
    return (
      <View className="h-full bg-white">
        <ErrorMessage title="Something went wrong" />
      </View>
    );
  }

  return (
    <View className="h-full bg-white">
      <View className="shadow p-3 pt-10 flex-row border-b border-light-200 items-center justify-between">
        <Pressable
          onPress={() => {
            router.canGoBack()
              ? router?.back()
              : router.push({pathname: '/(main)/place/[id]', params: {id}});
          }}>
          <ChevronLeftIcon size={27} className="text-black" />
        </Pressable>
        <Text className="text-lg font-bold">Reviews</Text>
        <View />
      </View>
      <FlatList
        className="mt-5 mx-3"
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={data?.pages?.[0]?.items}
        onEndReached={() => {
          if (hasNextPage) {
            fetchNextPage();
          }
        }}
        ListHeaderComponent={
          <View className="items-center mb-7">
            <Text className="text-3xl font-bold mb-1">4.5</Text>
            <StarRating rating={4.5} onChange={() => {}} />
            <Text className="text-light mt-1">Based on 3 reviews</Text>
          </View>
        }
        renderItem={({item}) => (
          <View key={item?.id} className="mb-6">
            <View className="flex-row items-center justify-between mb-2">
              <View className="flex-row">
                <Avatar bg="primary100" color="primary">
                  {getInitials(item?.user?.fullName)}
                </Avatar>
                <View className="ml-4">
                  <Text className="text-black text-sm">
                    {item?.user?.fullName}
                  </Text>
                  <View className="flex-row items-center">
                    <StarRating
                      rating={item?.rating}
                      onChange={() => {}}
                      starSize={20}
                      style={{rowGap: 0}}
                    />
                    <Text className="text-light ml-2">{item?.rating}</Text>
                  </View>
                </View>
              </View>
              <Text className="text-light text-sm">20 min ago</Text>
            </View>
            <Text className="text-sm">{item?.comment}</Text>
          </View>
        )}
      />
    </View>
  );
}
