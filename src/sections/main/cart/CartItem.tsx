import {MinusCircleIcon, PlusCircleIcon} from 'lucide-react-native';
import {Alert, Image, Pressable, Text, View} from 'react-native';

import Colors from '../../../constants/Colors';
import {Cart, useCart} from '../../../store/useCart';

export default function CartItem({product}: {product: Cart}) {
  const {addToCart, removeFromCart} = useCart(state => state);

  const handleRemove = () => {
    removeFromCart(product.id);
  };
  const confirmRemove = () => {
    Alert.alert(
      'Delete item',
      'Do you really want to remove this item from your cart?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          onPress: handleRemove,
        },
      ],
      {cancelable: true},
    );
  };

  const decreaseQuantity = () => {
    if (product.quantity <= 1) {
      confirmRemove();
    } else {
      removeFromCart(product.id);
    }
  };
  return (
    <View className="flex-row items-start mb-4">
      <View className="ml-3 w-[83%]">
        <Text className="font-bold text-black mb-1">{product.name}</Text>
        <View className="flex-row justify-between items-center ">
          <Text className="text-[14px] text-black">
            {product.quantity} x GH₵ {product.price}
          </Text>
        </View>
        <View className="flex-row items-center mt-2">
          <Pressable onPress={decreaseQuantity} className="mr-3">
            <MinusCircleIcon color={Colors.primary.main} size={20} />
          </Pressable>
          <Pressable
            onPress={() =>
              addToCart({...product, quantity: product.quantity + 1})
            }>
            <PlusCircleIcon color={Colors.primary.main} size={20} />
          </Pressable>
        </View>
      </View>
      {product.photo && (
        <Image
          source={{uri: product.photo}}
          alt="menu-photo"
          className="w-12 h-12 rounded-md"
        />
      )}
    </View>
  );
}
