import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { appBlack, appWhite } from '../lib/colors';

export default function Category({ item, onClick }) {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.4}
      onPress={() => onClick()}
    >
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
    backgroundColor: appWhite,
    borderRadius: 15,
    elevation: 5,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  categoryLabel: {
    fontSize: 30,
    color: appBlack,
  },
});
