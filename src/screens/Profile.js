import { useEffect } from 'react';
import { Text, View } from 'react-native';
import useUser from '../hooks/useUser';

export default function Profile({ navigation }) {
  const { logout } = useUser();
  // useEffect(() => {
  //   logout();
  //   navigation.replace('Authentication');
  // }, []);
  return (
    <View>
      <Text>Profile Screen</Text>
    </View>
  );
}
