import { StyleSheet, Text, View } from 'react-native';
import { subtitleColor } from '../lib/colors';
import Divider from './Divider';

export default function DividerWithText({ text }) {
  return (
    <View style={styles.container}>
      <Divider />
      <Text style={styles.dividerText}>{text}</Text>
      <Divider />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  dividerText: {
    color: subtitleColor,
    fontSize: 18,
  },
});
