import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function Category({ item }) {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.4}>
      <Text style={styles.categoryLabel}>{item.label}</Text>
      <Feather name='chevron-right' size={30} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 20,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  categoryLabel: {
    fontSize: 30,
    color: 'black',
  },
});
