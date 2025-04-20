import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function EmptyProductList({
  icon = 'clipboard-outline',
  title = 'No Products Found',
  subtitle = 'Start by adding a new product!',
}) {
  return (
    <View style={styles.emptyStateContainer}>
      <Ionicons name={icon} size={50} color='#B0B0B0' />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyStateContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 500,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
  },
});
