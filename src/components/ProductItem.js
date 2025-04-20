import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { appBlack, appWhite } from '../lib/colors';
import ProductImage from './ProductImage';

export default function ProductItem({ item, onClick }) {
  return (
    <TouchableOpacity
      activeOpacity={0.4}
      onPress={() => onClick()}
      style={styles.container}
    >
      <ProductImage imageUrl={item.image} imageWidth={100} />
      <View style={styles.col2}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>
          <Text style={{ fontWeight: 'bold' }}>Price: </Text>${item.price}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 20,
    width: '100%',
    backgroundColor: appWhite,
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: appBlack,
  },
  price: {
    fontSize: 16,
    color: appBlack,
  },
  col2: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    maxWidth: '62%',
    marginVertical: 5,
  },
});
