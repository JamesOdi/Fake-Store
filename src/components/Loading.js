import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default function Loading({
  loadingSpinnerSize = 'large',
  loadingText = 'Loading...',
}) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={loadingSpinnerSize} />
      <Text style={styles.loadingText}>{loadingText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  loadingText: {
    fontSize: 16,
    color: '#555',
  },
});
