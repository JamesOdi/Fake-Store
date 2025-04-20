import { StyleSheet, Text, View } from 'react-native';
import Button from './Button';
import { appBlue } from '../lib/colors';
import { getDeviceHeight } from '../lib/utils';

export default function ProductNotFound({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product Not Found</Text>
      <Text style={styles.message}>
        The product you are looking for does not exist.
      </Text>
      <Button
        label='Go Back'
        icon='arrow-back'
        onClick={() => navigation.goBack()}
        buttonStyle={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: getDeviceHeight() - 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
});
