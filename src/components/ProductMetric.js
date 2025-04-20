import { View, Text, StyleSheet } from 'react-native';
import { appBlack, subtitleColor } from '../lib/colors';

export default function PriceRateCount({ item }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.title}:</Text>
      <Text style={styles.value}>{item.value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: appBlack,
  },
  value: {
    fontSize: 17,
    color: subtitleColor,
  },
});
