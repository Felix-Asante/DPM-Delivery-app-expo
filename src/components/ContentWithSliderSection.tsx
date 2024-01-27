import {Link} from 'expo-router';
import React, {useMemo, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ListRenderItem,
} from 'react-native';

import ContentSectionSkeleton from './shared/skeletons/ContentSectionSkeleton';
import {useGlobalStore} from '../store/global';

export const CATEGORIES = [
  {id: 1, label: 'Restaurants'},
  {id: 2, label: 'Pharmacy'},
  {id: 3, label: 'Local dishes'},
  {id: 4, label: 'Groceries'},
  {id: 5, label: 'Fast foods'},
];
type ContentSectionBaseProps<T> = {
  sectionTitle: string;
  showCategories?: boolean;
  loading?: boolean;
  content: T[];
  href?: any;
  renderData: ListRenderItem<T>;
};

export default function ContentWithSliderSection<T>(
  props: ContentSectionBaseProps<T>,
) {
  const {
    sectionTitle,
    content,
    href,
    showCategories,
    loading = true,
    renderData,
  } = props;

  const [selectedCategory, setSelectedCategory] = useState('0');

  const categories = useGlobalStore(state => state.categories);

  const filteredContent = useMemo(() => {
    if (selectedCategory === '0') {
      return content;
    }

    // @ts-ignore
    return content.filter((c: Places) => c?.category?.id === selectedCategory);
  }, [content, selectedCategory]);

  if (!loading && content?.length === 0) return null;

  return !loading ? (
    <View className="mb-5">
      <View className="flex flex-row items-center justify-between mb-2.5">
        <Text className="text-black text-lg font-medium capitalize">
          {sectionTitle}
        </Text>
        {href && (
          <Link href={href}>
            <Text className="font-medium text-primary">See All</Text>
          </Link>
        )}
      </View>
      {showCategories && (
        <View className="mb-5">
          <FlatList
            renderItem={data => (
              <TouchableOpacity
                onPress={() => setSelectedCategory(data.item.id)}
                className={`rounded-full py-1 px-2 border border-primary  mr-2 ${
                  selectedCategory === data.item.id ? 'bg-primary' : ''
                }`}>
                <Text
                  className={`${
                    selectedCategory === data.item.id
                      ? 'text-white'
                      : 'text-primary'
                  }`}>
                  {data.item?.name}
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
      <FlatList
        renderItem={renderData}
        data={content}
        keyExtractor={(_, i) => i.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  ) : (
    <View className="flex flex-row">
      <ContentSectionSkeleton />
      <ContentSectionSkeleton />
    </View>
  );
}
