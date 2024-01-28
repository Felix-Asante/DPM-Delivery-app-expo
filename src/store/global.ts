import {create} from 'zustand';

import {getAllCategories} from '../lib/category';
import {UserLocation} from '../types';
import {Category} from '../types/category';

interface Store {
  categories: Category[] | [];
  selectedCategories: string[];
  selectedFilters: string[];
  userLocation: UserLocation | null;
  currentLocation: UserLocation | null;
  fetchCategories: () => void;
  initGlobalStore: () => void;
  setSelectedCategories: (categories: string[]) => void;
  setSelectedFilters: (filters: string[]) => void;
  setUserLocation: (location: UserLocation | null) => void;
  setCurrentLocation: (location: UserLocation | null) => void;
}
export const useGlobalStore = create<Store>((set, get) => ({
  categories: [],
  selectedCategories: [],
  selectedFilters: [],
  userLocation: null,
  currentLocation: null,
  fetchCategories: async () => {
    try {
      const categories = await getAllCategories();
      set({categories});
    } catch (error) {
      console.log(error);
    }
  },
  setSelectedCategories(categories: string[]) {
    set({selectedCategories: categories});
  },
  setSelectedFilters(filters: string[]) {
    set({selectedFilters: filters});
  },
  setUserLocation(location) {
    set({userLocation: location});
  },
  setCurrentLocation(location) {
    set({currentLocation: location});
  },
  initGlobalStore: async () => {
    await get().fetchCategories();
  },
}));
