import { StyleSheet, Text, View } from 'react-native';
import { appRed, appWhite } from '../lib/colors';

export default function TabIconBadge({ count }) {
  return (
    <View style={styles.badgeContainer}>
      <Text style={styles.badgeText}>{count}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badgeContainer: {
    position: 'absolute',
    right: -10,
    top: -5,
    backgroundColor: appRed,
    borderRadius: 50,
    width: 17,
    height: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: appWhite,
    fontWeight: 'bold',
  },
});
