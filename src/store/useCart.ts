import {create} from 'zustand';

import {Products} from '../types/products';

export interface Cart extends Products {
  quantity: number;
  deliveryFee?: number;
  place: string;
}
interface Store {
  cart: Cart[];
  addToCart: (cart: Cart) => void;
  totalCost: number;
  deliveryCost: number;
  calculateTotalCost: (cart: Cart[]) => number;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

export const useCart = create<Store>(set => ({
  cart: [],
  totalCost: 0,
  deliveryCost: 0,
  calculateTotalCost: cart => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  },
  addToCart: (product: Cart) => {
    set(state => {
      const index = state.cart.findIndex(item => item.id === product.id);

      if (index >= 0) {
        const updatedCart = [...state.cart];
        updatedCart[index] = product;
        const updatedTotalCost = state.calculateTotalCost(updatedCart);
        return {cart: updatedCart, totalCost: updatedTotalCost};
      } else {
        const updatedCart = [...state.cart, {...product}];
        const updatedTotalCost = state.calculateTotalCost(updatedCart);
        const updatedDeliveryCost = product.deliveryFee
          ? state.deliveryCost + product.deliveryFee
          : state.deliveryCost;

        return {
          cart: updatedCart,
          totalCost: updatedTotalCost,
          deliveryCost: updatedDeliveryCost,
        };
      }
    });
  },
  removeFromCart: (productId: string) => {
    set(state => {
      const itemIndex = state.cart.findIndex(item => item.id === productId);

      if (itemIndex >= 0) {
        const updatedCart = [...state.cart];
        let updatedDeliveryCost = state.deliveryCost;
        if (state.cart[itemIndex].quantity <= 1) {
          updatedCart.splice(itemIndex, 1);
          updatedDeliveryCost =
            updatedDeliveryCost - state.cart[itemIndex]?.deliveryFee!;
        } else {
          updatedCart[itemIndex] = {
            ...updatedCart[itemIndex],
            quantity: updatedCart[itemIndex].quantity - 1,
          };
        }
        const updatedTotalCost = state.calculateTotalCost(updatedCart);
        return {
          cart: updatedCart,
          totalCost: updatedTotalCost,
          deliveryCost: updatedDeliveryCost,
        };
      }

      return state;
    });
  },
  clearCart: () => {
    set(state => {
      return {...state, cart: []};
    });
  },
}));
