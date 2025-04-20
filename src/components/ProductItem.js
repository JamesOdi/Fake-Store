import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProductItem({ item, onClick }) {
  return (
    <TouchableOpacity
      activeOpacity={0.4}
      onPress={() => onClick()}
      style={styles.container}
    >
      <Image
        source={{ uri: item.image, cache: 'only-if-cached' }}
        style={styles.image}
        resizeMode='contain'
      />
      <View style={styles.col2}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 20,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    color: 'black',
  },
  price: {
    fontSize: 16,
    color: 'black',
  },
  col2: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    maxWidth: '62%',
  },
});
