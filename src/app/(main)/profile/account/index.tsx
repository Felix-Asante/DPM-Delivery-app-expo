import {useMutation} from '@tanstack/react-query';
import {Mail, Phone, User2} from 'lucide-react-native';
import React, {useEffect} from 'react';
import {View, StatusBar} from 'react-native';

import GoBack from '../../../../components/GoBack';
import CustomButton from '../../../../components/shared/Buttons/CustomButton';
import Input from '../../../../components/shared/inputs';
import Colors from '../../../../constants/Colors';
import {useReactHookForm} from '../../../../hooks/useReactHookForm';
import {updateProfileDetails} from '../../../../lib/auth';
import {useAuthStore} from '../../../../store/useAuth';
import {getErrorMessage} from '../../../../utils/helpers';
import {toastErrorMessage, toastSuccessMessage} from '../../../../utils/toast';
import {
  UpdateProfileDto,
  updateProfileValidation,
} from '../../../../validations/auth';

export default function Account() {
  const {handleSubmit, control, setValue} = useReactHookForm<UpdateProfileDto>({
    schema: updateProfileValidation,
  });

  const {user, setUser} = useAuthStore();

  const {mutateAsync, isPending} = useMutation({
    mutationFn: updateProfileDetails,
  });

  useEffect(() => {
    setValue('fullName', user?.fullName ?? '');
    setValue('email', user?.email ?? '');
  }, [setValue, user]);

  const updateProfile = (formData: UpdateProfileDto) => {
    mutateAsync(formData, {
      onSuccess(data) {
        setUser(data);
        toastSuccessMessage('Profile updated successfully');
      },
      onError(error) {
        toastErrorMessage(getErrorMessage(error));
      },
    });
  };

  return (
    <View className="px-3 pt-16 h-full">
      <StatusBar barStyle="dark-content" />
      <GoBack label="Account Details" />
      <View className="h-[35%] justify-center">
        <Input
          control={control}
          startContent={<User2 color={Colors.light.main} size={20} />}
          name="fullName"
          placeholder="First Name"
          defaultValue={user?.fullName}
        />
        <View className="my-2">
          <Input
            startContent={<Mail color={Colors.light.main} size={20} />}
            placeholder="Email"
            defaultValue={user?.email ?? ''}
            name="email"
            control={control}
          />
        </View>

        <Input
          startContent={<Phone color={Colors.light.main} size={20} />}
          name="phone"
          control={control}
          placeholder="Phone"
          defaultValue={user?.phone}
          editable={false}
        />
        <View className="mt-3">
          <CustomButton
            label="Modify Account"
            onPress={handleSubmit(updateProfile)}
            loading={isPending}
          />
        </View>
      </View>
    </View>
  );
}
