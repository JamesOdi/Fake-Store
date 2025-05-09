import { StyleSheet, Text, View } from 'react-native';

export default function OrderHeaderText({ item }) {
  return (
    <View style={styles.container}>
      <Text>
        {item.label}: {item.value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
  },
});
