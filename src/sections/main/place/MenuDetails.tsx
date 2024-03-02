import {XIcon} from 'lucide-react-native';
import React, {useState} from 'react';
import {
  ImageBackground,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Snackbar, SnackbarRef} from 'react-native-magnus';

import CustomButton from '../../../components/shared/Buttons/CustomButton';
import Colors from '../../../constants/Colors';
import {useCart} from '../../../store/useCart';
import {CartItem} from '../../../types/booking';
import {toastSuccessMessage} from '../../../utils/toast';

interface MenuDetailsProps {
  menu: CartItem | null;
  onClose: () => void;
}
export default function MenuDetails(props: MenuDetailsProps) {
  const {addToCart, cart, clearCart} = useCart();
  const {menu, onClose} = props;
  const snackbarRef = React.createRef<any>();

  // quantity of the selected menu already in cart
  const [count, setCount] = useState(cart?.quantity ?? 1);

  if (!menu) return null;

  return (
    <View className="h-full">
      <View className={`${menu?.photo ? 'h-56' : 'h-20'}`}>
        {menu?.photo && (
          <ImageBackground
            source={{uri: menu?.photo}}
            resizeMode="cover"
            className="h-full"
          />
        )}
        <TouchableOpacity
          onPress={onClose}
          className="pt-2 absolute right-3 top-1">
          <View className="bg-primary-100 w-10 h-10 rounded-full items-center justify-center">
            <XIcon className="text-dark" />
          </View>
        </TouchableOpacity>
      </View>
      <View className="p-3 mt-2">
        <Text className="text-xl text-black mb-1 font-bold">{menu?.name}</Text>
        <Text className="font-semibold text-lg mb-1.5">GH₵ {menu?.price}</Text>
        <Text>{menu?.description}</Text>
        <View className="mt-3">
          <View className="items-center flex-row justify-center mt-8">
            <Pressable
              className={`bg-primary-100
                 w-12 h-12 rounded-full items-center justify-center`}
              onPress={() =>
                setCount(prevCount => {
                  if (prevCount > 1) {
                    return prevCount - 1;
                  }
                  if (menu.id === cart?.id) {
                    clearCart();
                    snackbarRef.current.show(
                      `${menu?.name} has been removed from cart`,
                    );
                  }
                  return 1;
                })
              }>
              <Text className="text-primary font-medium text-4xl">-</Text>
            </Pressable>
            <Text className="mx-7 text-black font-medium text-lg">{count}</Text>
            <Pressable
              onPress={() => {
                setCount(c => c + 1);
              }}
              className="bg-primary-100 rounded-full w-12 h-12 items-center justify-center">
              <Text className="text-primary font-medium text-2xl items-center justify-center">
                +
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
      <View className="items-center justify-center mt-14 px-12">
        <CustomButton
          label={`Add ${count} for GH₵ ${count * menu?.price}`}
          onPress={() => {
            addToCart({...menu, quantity: count});
            onClose();
          }}
        />
      </View>
      <Snackbar ref={snackbarRef} bg="light200" color={Colors.primary.main} />
    </View>
  );
}
