import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { appBlack, appLightGray, subtitleColor } from '../lib/colors';

export default function Section({ title, subtitle }) {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.4}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 2,
    backgroundColor: appLightGray,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 15,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: appBlack,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: subtitleColor,
  },
});
