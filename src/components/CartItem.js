import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ProductImage from './ProductImage';
import { appBlack, appRed, appWhite } from '../lib/colors';
import AddSubtractCounter from './AddSubtractCounter';
import Button from './Button';

export default function CartItem({
  item,
  onClick,
  onIncrementItemCount,
  onDecrementItemCount,
  onDeleteItem,
  isActive = false,
  isComponentLoading = false,
  action,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onClick && onClick()}
      style={styles.container}
    >
      <ProductImage imageUrl={item.product.image} imageWidth={100} />
      <View style={styles.col2}>
        <View style={{ gap: 2 }}>
          <Text style={styles.title}>{item.product.title}</Text>
          <Text style={styles.price}>${item.product.price}</Text>
        </View>

        <View style={styles.itemActionContainer}>
          <AddSubtractCounter
            isComponentLoading={isComponentLoading}
            count={item.count}
            onAdd={() => onIncrementItemCount()}
            onSubtract={() => onDecrementItemCount()}
            isActive={isActive}
            action={action}
          />
          <Button
            label='Delete'
            minWidth={0}
            color={appRed}
            isLoading={isActive && isComponentLoading && action == 'delete'}
            buttonStyle='outline'
            onClick={() => onDeleteItem()}
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
  itemActionContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 10,
    gap: 15,
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
