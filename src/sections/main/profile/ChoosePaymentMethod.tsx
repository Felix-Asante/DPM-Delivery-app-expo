import {useQuery} from '@tanstack/react-query';
import {useRouter} from 'expo-router';
import React, {useMemo, useState} from 'react';
import {useForm} from 'react-hook-form';
import {View, Text, ActivityIndicator} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {Radio} from 'react-native-magnus';

import CustomButton from '../../../components/shared/Buttons/CustomButton';
import Input from '../../../components/shared/inputs';
import Colors from '../../../constants/Colors';
import {verifyPaymentAccount} from '../../../lib/auth';
import {PreferenceType, usePreferences} from '../../../store/settings';
import {getErrorMessage} from '../../../utils/helpers';
import {toastErrorMessage} from '../../../utils/toast';

const paymentMethods = [
  {
    label: 'MTN mobile money',
    value: 'MTN_MONEY',
    code: 'MTN',
  },
  {
    label: 'AirtelTigo Money',
    value: 'AIRTELTIGO_MONEY',
    code: 'ATL',
  },
  {
    label: 'Vodafone cash',
    value: 'VODAFONE_CASH',
    code: 'VOD',
  },
];

interface Props {
  onClose: () => void;
}
export default function ChoosePaymentMethod({onClose}: Props) {
  const {paymentMethod, dispatch} = usePreferences();

  const {watch, setValue, control, handleSubmit} = useForm();
  const [savingPreference, setSavingPreference] = useState(false);
  const router = useRouter();

  const method = watch('method');
  const phone = watch('customerNumber');

  const bankCode = useMemo(
    () => paymentMethods.find(m => m.value === method)?.code,
    [watch('method')],
  );

  const canVerifyAccount = phone?.length >= 10 && bankCode !== undefined;

  const {isLoading, data, error} = useQuery({
    queryKey: ['verifyNumber', phone, bankCode],
    queryFn: () => verifyPaymentAccount(phone, bankCode!),
    enabled: canVerifyAccount,
  });

  const savePaymentMethod = () => {
    setSavingPreference(true);
    dispatch({
      type: PreferenceType.UPDATE_PAYMENT_METHOD,
      payload: {
        label: paymentMethods.find(m => m.value === method)?.label!,
        value: method,
        customerName: data?.data?.account_name,
        customerNumber: phone,
      },
    });
    setTimeout(() => {
      onClose();
      if (router.canGoBack()) {
        router.back();
      }
      setSavingPreference(false);
    }, 200);
  };

  if (error) {
    toastErrorMessage(getErrorMessage(error));
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="p-4">
        <TouchableOpacity className="mb-3 items-end" onPress={onClose}>
          <Text className="text-primary">Cancel</Text>
        </TouchableOpacity>
        <View className="mb-3">
          <Text className="text-black mb-2 font-medium">
            Choose Payment Method
          </Text>
          <Radio.Group
            onChange={value => setValue('method', value)}
            // value={watch('method')}
            defaultValue={paymentMethod?.value}>
            {paymentMethods.map(method => (
              <Radio
                value={method.value}
                key={method.value}
                prefix={
                  <Text className="text-black flex-1">{method.label}</Text>
                }
                activeColor="primary"
                children={null}
              />
            ))}
          </Radio.Group>
        </View>
        <View className="mt-3">
          <Input
            name="customerNumber"
            control={control}
            placeholder="Phone number"
            label="Phone number"
            defaultValue={paymentMethod?.customerNumber}
            keyboardType="phone-pad"
          />

          <View className="my-3">
            {isLoading ? (
              <View className="items-center">
                <ActivityIndicator size="small" color={Colors.primary.main} />
                <Text className="text-xs text-center text-primary">
                  Verifying account
                </Text>
              </View>
            ) : data ? (
              <View className="bg-light-200 p-2 rounded-md">
                <Text className="text-black">Account : {phone}</Text>
                <Text className="text-black">
                  Account holder name : {data?.data?.account_name}
                </Text>
              </View>
            ) : null}
          </View>
          <CustomButton
            label="Confirm"
            onPress={handleSubmit(savePaymentMethod)}
            classNames="mt-1.5"
            disabled={isLoading || !phone || !method}
            loading={savingPreference}
          />
        </View>
      </View>
    </ScrollView>
  );
}
