import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ProductImage from './ProductImage';
import { appBlack, appRed, appWhite } from '../lib/colors';
import AddSubtractCounter from './AddSubtractCounter';
import Button from './Button';

export default function CartItem({ item, onClick }) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onClick && onClick()}
      style={styles.container}
    >
      <ProductImage imageUrl={item.image} imageWidth={100} />
      <View style={styles.col2}>
        <View style={{ gap: 2 }}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.price}>${item.price}</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            marginTop: 10,
          }}
        >
          <AddSubtractCounter count={item.count} />
          <Button
            label='Delete'
            minWidth={0}
            color={appRed}
            buttonStyle='outline'
          />
        </View>
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
    fontSize: 15,
    color: appBlack,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: appBlack,
  },
  col2: {
    flexDirection: 'column',
    maxWidth: '62%',
    justifyContent: 'space-between',
    gap: 5,
  },
});
