import {create} from 'zustand';

import {Place, PlaceProducts} from '../types/place';

interface Services extends PlaceProducts {
  quantity: number;
}
export interface Cart {
  quantity: number;
  deliveryFee?: number;
  place: Place;
  services: Services[];
}
interface Store {
  cart: Cart | null;
  addToCart: (cart: Cart) => void;
  totalCost: number;
  deliveryCost: number;
  calculateTotalCost: (cart: Cart) => number;
  clearCart: () => void;
}

export const useCart = create<Store>((set, get) => ({
  cart: null,
  totalCost: 0,
  deliveryCost: 0,
  calculateTotalCost: cart => {
    return cart.services.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  },
  addToCart: (product: Cart) => {
    set({
      cart: product,
      totalCost: get().calculateTotalCost(product),
      deliveryCost: product.deliveryFee,
    });
  },

  clearCart: () => {
    set(state => {
      return {...state, cart: null};
    });
  },
}));
