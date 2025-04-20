import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { appBlue, appWhite } from '../lib/colors';

export default function Button({ label, icon, color = appBlue, onClick }) {
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: color }]}
      activeOpacity={0.4}
      // if onClick is not passed, do not call it
      onPress={() => onClick && onClick()}
    >
      {icon && <Ionicons name={icon} size={16} color={appWhite} />}
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    elevation: 4,
    minWidth: 150,
    gap: 10,
  },
  label: {
    fontSize: 16,
    color: appWhite,
  },
});
