import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { appBlack, appLightGray, subtitleColor } from '../lib/colors';
import { getDeviceHeight } from '../lib/utils';

export default function EmptyList({
  icon = 'clipboard-outline',
  title = 'No Products Found',
  subtitle = 'Start by adding a new product!',
}) {
  return (
    <View style={styles.emptyStateContainer}>
      <Ionicons name={icon} size={50} color={appLightGray} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyStateContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: getDeviceHeight() - 250,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: appBlack,
    marginTop: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: subtitleColor,
    marginTop: 5,
    textAlign: 'center',
  },
});
