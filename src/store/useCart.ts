import {create} from 'zustand';

import {PlaceProducts} from '../types/place';

export interface Cart extends PlaceProducts {
  quantity: number;
  deliveryFee?: number;
  place: string;
}
interface Store {
  cart: Cart | null;
  addToCart: (cart: Cart) => void;
  totalCost: number;
  deliveryCost: number;
  calculateTotalCost: (cart: Cart[]) => number;
  clearCart: () => void;
}

export const useCart = create<Store>(set => ({
  cart: null,
  totalCost: 0,
  deliveryCost: 0,
  calculateTotalCost: cart => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  },
  addToCart: (product: Cart) => {
    set({
      cart: product,
      totalCost: product.price * product.quantity,
      deliveryCost: product.deliveryFee,
    });
  },

  clearCart: () => {
    set(state => {
      return {...state, cart: null};
    });
  },
}));
