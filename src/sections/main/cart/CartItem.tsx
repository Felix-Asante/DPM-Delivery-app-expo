import {MinusCircleIcon, PlusCircleIcon} from 'lucide-react-native';
import {Alert, Image, Pressable, Text, View} from 'react-native';

import Colors from '../../../constants/Colors';
import {Cart, useCart} from '../../../store/useCart';

export default function CartItem() {
  const {addToCart, clearCart, cart} = useCart(state => state);

  const confirmRemove = (serviceId: string) => {
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
          onPress: () => {
            if (cart?.services?.length === 1) {
              clearCart();
              return;
            }
            if (cart?.services && cart?.services?.length) {
              addToCart({
                ...cart,
                services: cart?.services.filter(
                  service => service?.id !== serviceId,
                ),
              });
            }
          },
        },
      ],
      {cancelable: true},
    );
  };

  const decreaseQuantity = (index: number) => {
    if (!cart || cart?.services?.length === 0) return;

    const service = cart?.services[index];
    if (service && service?.quantity <= 1) {
      confirmRemove(service?.id);
    } else {
      const updatedQty = !service ? 0 : service?.quantity - 1;
      service.quantity = updatedQty;
      const updatedServices = cart?.services;
      updatedServices[index] = service;
      addToCart({...cart, services: updatedServices});
    }
  };
  return (
    <View>
      <Text className="mb-3">{cart?.place?.name}</Text>
      {cart?.services?.map((service, index) => (
        <View className="flex-row items-start mb-4" key={service?.id}>
          <View className="ml-3 w-[83%]">
            <Text className="font-bold text-black mb-1">{service?.name}</Text>
            <View className="flex-row justify-between items-center ">
              <Text className="text-[14px] text-black">
                {service.quantity} x GH₵ {service.price}
              </Text>
            </View>
            <View className="flex-row items-center mt-2">
              <Pressable
                onPress={() => decreaseQuantity(index)}
                className="mr-3">
                <MinusCircleIcon color={Colors.primary.main} size={20} />
              </Pressable>
              <Pressable
                onPress={() => {
                  const services = cart?.services;
                  services[index] = {
                    ...services[index],
                    quantity: services[index].quantity + 1,
                  };
                  addToCart({...cart, services});
                }}>
                <PlusCircleIcon color={Colors.primary.main} size={20} />
              </Pressable>
            </View>
          </View>
          {service.photo && (
            <Image
              source={{uri: service.photo}}
              alt="menu-photo"
              className="w-12 h-12 rounded-md"
            />
          )}
        </View>
      ))}
    </View>
  );
}
