import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function Button({ label, icon, color, onClick }) {
  return (
    <TouchableOpacity
      style={[styles.container, color && { backgroundColor: color }]}
      activeOpacity={0.4}
      onPress={() => onClick()}
    >
      {icon && <Ionicons name={icon} size={16} color='white' />}
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
    backgroundColor: 'blue',
    minWidth: 150,
    gap: 10,
  },
  label: {
    fontSize: 16,
    color: 'white',
  },
});
