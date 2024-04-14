import {useMutation} from '@tanstack/react-query';
import React from 'react';
import {Pressable, Text, View} from 'react-native';
import StarRating from 'react-native-star-rating-widget';

import CustomButton from '../../../components/shared/Buttons/CustomButton';
import Input from '../../../components/shared/inputs';
import {useReactHookForm} from '../../../hooks/useReactHookForm';
import {rateBooking} from '../../../lib/booking';
import {getErrorMessage} from '../../../utils/helpers';
import {toastErrorMessage, toastSuccessMessage} from '../../../utils/toast';
import {ratingDto, ratingValidation} from '../../../validations';

interface Props {
  onClose: () => void;
  bookingId: string;
}
export default function AddReviewForm({bookingId, onClose}: Props) {
  const form = useReactHookForm<ratingDto>({schema: ratingValidation});

  const ratingMutation = useMutation({
    mutationFn: rateBooking,
  });

  const leaveRating = (data: ratingDto) => {
    ratingMutation.mutate(
      {bookingId, ...data},
      {
        async onSuccess(data) {
          toastSuccessMessage('Thanks for your feedback');
          onClose();
        },
        onError(error) {
          toastErrorMessage(getErrorMessage(error));
        },
      },
    );
  };
  return (
    <View className="pt-7 px-5">
      <Text className="mb-3 font-bold">
        Let us know what you think about this order
      </Text>
      <StarRating
        rating={form.watch('rating')}
        onChange={rating => form.setValue('rating', rating)}
        enableHalfStar={false}
      />
      <View className="mt-5">
        <Input
          control={form.control}
          name="comment"
          placeholder="Comment"
          inputClassName="h-20"
          className="mb-6"
          multiline
        />

        <View>
          <CustomButton
            onPress={form.handleSubmit(leaveRating)}
            label="Leave rating"
            loading={ratingMutation.isPending}
          />
          <Pressable onPress={onClose} className="items-center mt-2">
            <Text className="font-semibold text-center text-light">Cancel</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
