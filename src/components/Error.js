import { StyleSheet, Text, View } from 'react-native';
import { appRed } from '../lib/colors';
import { getDeviceHeight } from '../lib/utils';
import { Feather } from '@expo/vector-icons';

export default function Error({ message = 'ERROR' }) {
  return (
    <View style={styles.container}>
      <Feather name='alert-octagon' size={50} color={appRed} />
      <Text style={styles.errorMessage}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: getDeviceHeight() - 200,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  errorMessage: {
    fontSize: 30,
    color: appRed,
    textAlign: 'center',
    marginHorizontal: 50,
  },
});
