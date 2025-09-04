import { Text, View } from 'react-native';

interface AlertBannerProps {
  message: string;
}

export default function AlertBanner({ message }: AlertBannerProps) {
  return (
    <View style={{ backgroundColor: 'red', padding: 10 }}>
      <Text style={{ color: 'white' }}>{message}</Text>
    </View>
  );
}
