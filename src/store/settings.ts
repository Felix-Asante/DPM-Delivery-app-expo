import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';

interface PaymentMethod {
  label: string;
  value: string;
  customerName?: string;
  customerNumber?: string;
}
interface PreferencesState {
  paymentMethod: PaymentMethod | null;

  dispatch: (arg: Dispatch) => any;
}

export enum PreferenceType {
  UPDATE_PAYMENT_METHOD = 'UPDATE_PAYMENT_METHOD',
}

type Dispatch = {
  type: PreferenceType.UPDATE_PAYMENT_METHOD;
  payload: PaymentMethod | null;
};

const reducer = ({type, payload}: Dispatch) => {
  switch (type) {
    case PreferenceType.UPDATE_PAYMENT_METHOD:
      return {paymentMethod: payload};
  }
};

export const usePreferences = create(
  persist<PreferencesState>(
    set => ({
      paymentMethod: null,
      dispatch: (arg: Dispatch) => set(state => reducer(arg)),
    }),
    {
      name: 'preferences',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
