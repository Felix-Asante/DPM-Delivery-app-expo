import {Text, View} from 'react-native';

export default function SummaryItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <View className="flex-row items-center justify-between mb-1">
      <Text className="text-dark font-medium">{label}</Text>
      <Text className="text-dark font-medium">
        GH₵ {Number(value).toFixed(2)}{' '}
      </Text>
    </View>
  );
}
