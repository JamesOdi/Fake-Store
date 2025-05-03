import { StyleSheet, Text, View } from 'react-native';
import { appBlack, appLightGray, subtitleColor } from '../lib/colors';

export default function DividerWithText({ text }) {
  return (
    <View style={styles.container}>
      <View style={styles.divider} />
      <Text style={styles.dividerText}>{text}</Text>
      <View style={styles.divider} />
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
  divider: {
    height: 1,
    flexGrow: 1,
    flexDirection: 'row',
    backgroundColor: appLightGray,
  },
  dividerText: {
    color: subtitleColor,
    fontSize: 18,
  },
});
