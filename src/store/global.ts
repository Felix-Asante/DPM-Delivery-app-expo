import {create} from 'zustand';

import {getAllCategories} from '../lib/category';
import {Category} from '../types/category';

interface Store {
  categories: Category[] | [];
  selectedCategories: string[];
  selectedFilters: string[];
  fetchCategories: () => void;
  initGlobalStore: () => void;
  setSelectedCategories: (categories: string[]) => void;
  setSelectedFilters: (filters: string[]) => void;
}
export const useGlobalStore = create<Store>((set, get) => ({
  categories: [],
  selectedCategories: [],
  selectedFilters: [],
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
  initGlobalStore: async () => {
    await get().fetchCategories();
  },
}));
