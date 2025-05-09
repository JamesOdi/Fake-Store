import { StyleSheet, View } from 'react-native';
import { appLightGray } from '../lib/colors';

export default function Divider() {
  return <View style={styles.divider} />;
}

const styles = StyleSheet.create({
  divider: {
    height: 1,
    flexGrow: 1,
    flexDirection: 'row',
    backgroundColor: appLightGray,
  },
});
