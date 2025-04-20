import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { appBlue, subtitleColor } from '../lib/colors';
import { getDeviceHeight } from '../lib/utils';

export default function Loading({
  loadingSpinnerSize = 'large',
  loadingText = 'Loading...',
}) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={loadingSpinnerSize} color={appBlue} />
      <Text style={styles.loadingText}>{loadingText}</Text>
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
  loadingText: {
    fontSize: 16,
    color: subtitleColor,
  },
});
