import { useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { appGray } from '../lib/colors';
import CartItem from '../components/CartItem';
import {
  decrementItemCount,
  getCart,
  incrementItemCount,
  loadCartData,
  removeFromCart,
} from '../store/cart';
import EmptyList from '../components/EmptyList';
import Button from '../components/Button';
import RenderLoadingErrorOrContent from '../components/RenderLoadingErrorOrContent';

export default function Cart({ navigation }) {
  const { cartData, isLoading, error } = useSelector(getCart);
  const { totalPrice, totalNumOfItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const footerSummaryMetrics = [
    {
      title: 'Items',
      value: totalNumOfItems,
    },
    { title: 'Total', value: totalPrice },
  ];

  useEffect(() => {
    dispatch(loadCartData());
  }, []);

  const onClickProduct = (id) => {
    // Reference to the usage of navigation between Tabs
    // https://stackoverflow.com/a/63566591
    navigation.navigate('HomeTab', {
      screen: 'ProductDetails',
      params: { id },
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <RenderLoadingErrorOrContent
        isLoading={isLoading}
        error={error}
        loadingText='Loading your cart...'
      >
        <FlatList
          data={cartData}
          renderItem={({ item }) => {
            return (
              <CartItem
                item={item}
                onClick={() => onClickProduct(item.id)}
                onIncrementItemCount={() => dispatch(incrementItemCount(item))}
                onDecrementItemCount={() => dispatch(decrementItemCount(item))}
                onDeleteItem={() => dispatch(removeFromCart(item))}
              />
            );
          }}
          contentContainerStyle={styles.containerGapStyle}
          ListEmptyComponent={
            <EmptyList
              icon='cart-outline'
              title='Your cart is empty'
              subtitle='No items in your cart'
            />
          }
          keyExtractor={(item) => item.id.toString()}
          ListFooterComponent={
            cartData.length > 0 && (
              <ListBottomFooterComponent
                bottom={footerSummaryMetrics}
                total={totalPrice}
                numOfCartItems={totalNumOfItems}
              />
            )
          }
          ListFooterComponentStyle={{ marginTop: 'auto' }}
        />
      </RenderLoadingErrorOrContent>
    </View>
  );
}

function ListBottomFooterComponent({ bottom, total, numOfCartItems }) {
  return (
    <View style={{ gap: 30, marginTop: 50 }}>
      <View style={styles.footerContainer}>
        {bottom.map((item) => {
          return (
            <View key={item.title} style={styles.numericValueContainer}>
              <Text style={styles.numericValue}>{item.title}:</Text>
              <Text style={styles.numericValue}>{item.value}</Text>
            </View>
          );
        })}
        <View style={styles.subtotalContainer}>
          <Text style={styles.subtotal}>Subtotal:</Text>
          <Text style={styles.subtotal}>{total}</Text>
        </View>
      </View>
      <Button
        icon='card-outline'
        label={`Proceed to Checkout (${numOfCartItems} items)`}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerGapStyle: {
    gap: 10,
    padding: 15,
    flexGrow: 1,
  },
  footerContainer: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: appGray,
  },
  numericValueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  numericValue: {
    fontSize: 18,
    fontWeight: 'semibold',
  },
  subtotalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  subtotal: {
    fontWeight: '900',
    fontSize: 24,
  },
});
