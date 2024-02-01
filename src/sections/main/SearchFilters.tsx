import {XIcon} from 'lucide-react-native';
import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

import Checkbox from '../../components/shared/inputs/Checkbox';
import Colors from '../../constants/Colors';
import {FILTERS} from '../../constants/enums';
import {useGlobalStore} from '../../store/global';
import {Category} from '../../types/category';

interface Props {
  onClose: () => void;
}
export default function Filters({onClose}: Props) {
  const {
    categories,
    setSelectedFilters,
    selectedFilters,
    setSelectedCategories,
  } = useGlobalStore(state => state);

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedFilters([]);
    onClose();
  };

  return (
    <View className="flex-1 ">
      <View className="flex-row items-center justify-between mb-3.5 py-2 px-4 border-b border-light-200">
        {/* <TouchableOpacity onPress={onClose}>
          <XIcon size={24} color={Colors.dark.main} />
        </TouchableOpacity> */}
        <Text className="text-lg font-semibold">Filters</Text>
        <View className="flex flex-row items-center">
          <TouchableOpacity onPress={clearFilters}>
            <Text>Clear</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="pb-2 px-3">
        <Text className="text-black font-semibold text-lg mb-2">
          Discount and offers
        </Text>
        <FilterItem
          label={FILTERS.CHEAP_DELIVERY}
          onSelected={val =>
            val
              ? setSelectedFilters(
                  selectedFilters.concat(FILTERS.CHEAP_DELIVERY),
                )
              : setSelectedFilters(
                  selectedFilters.filter(f => f !== FILTERS.CHEAP_DELIVERY),
                )
          }
        />
        <FilterItem
          label={FILTERS.SPECIAL_OFFERS}
          onSelected={val =>
            val
              ? setSelectedFilters(
                  selectedFilters.concat(FILTERS.SPECIAL_OFFERS),
                )
              : setSelectedFilters(
                  selectedFilters.filter(f => f !== FILTERS.SPECIAL_OFFERS),
                )
          }
        />
      </View>
      <View className="pb-2 my-2.5  pl-3">
        <Text className="text-black font-semibold text-lg mb-2">
          Categories
        </Text>
        {categories.map(category => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </View>
    </View>
  );
}

interface FilterItemProps {
  label: string;
  onSelected: (val: boolean) => void;
}
function FilterItem({label, onSelected}: FilterItemProps) {
  const {selectedFilters} = useGlobalStore(state => state);
  return (
    <View className="flex-row items-center  py-3 pr-3 justify-between border-b border-light-200">
      <Text>{label}</Text>
      <Checkbox onChange={onSelected} value={selectedFilters.includes(label)} />
    </View>
  );
}

function CategoryItem({category}: {category: Category}) {
  const {setSelectedCategories, selectedCategories} = useGlobalStore(
    state => state,
  );
  return (
    <View className="flex-row items-center py-3 justify-between border-b border-light-200 pr-3">
      <View className="flex-row items-center space-x-2">
        <Image
          source={{uri: category.image}}
          className="w-5 h-5 rounded-sm"
          resizeMode="cover"
        />
        <Text className="capitalize">{category.name}</Text>
      </View>
      <Checkbox
        value={selectedCategories.includes(category.id)}
        onChange={newValue => {
          !newValue
            ? setSelectedCategories(
                selectedCategories.filter(c => c !== category.id),
              )
            : setSelectedCategories(selectedCategories.concat(category.id));
        }}
      />
    </View>
  );
}
