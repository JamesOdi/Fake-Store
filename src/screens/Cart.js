import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { appLightGray, appWhite } from '../lib/colors';
import CartItem from '../components/CartItem';
import {
  addCartItem,
  decrementOrRemoveCartItem,
  getCart,
  loadCart,
} from '../store/cart';
import EmptyList from '../components/EmptyList';
import Button from '../components/Button';
import RenderLoadingErrorOrContent from '../components/RenderLoadingErrorOrContent';
import { getTotalNumberOfItems, getTotalPrice } from '../lib/format-number';
import SubmitAndValidateButton from '../components/SubmitAndValidateButton';
import { createNewOrder, getOrders, loadOrders } from '../store/orders';

export default function Cart({ navigation }) {
  const { cartData, isLoading, isComponentLoading, error } =
    useSelector(getCart);
  const [action, setAction] = useState({
    id: '',
    action: '',
  });

  const dispatch = useDispatch();

  const footerSummaryMetrics = [
    {
      title: 'Items',
      value: getTotalNumberOfItems(cartData),
    },
    { title: 'Total', value: getTotalPrice(cartData) },
  ];

  const onClickProduct = (id) => {
    // Reference to the usage of navigation between Tabs
    // https://stackoverflow.com/a/63566591
    navigation.navigate('HomeTab', {
      screen: 'ProductDetails',
      params: { id },
    });
  };

  useEffect(() => {
    dispatch(loadOrders());
    dispatch(loadCart());
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: appWhite }}>
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
                isActive={item.product.id === action.id}
                action={action.action}
                isComponentLoading={isComponentLoading}
                onClick={() => {
                  onClickProduct(item.product.id);
                }}
                onIncrementItemCount={() => {
                  setAction({ id: item.product.id, action: 'plus' });
                  dispatch(addCartItem(item.product));
                }}
                onDecrementItemCount={() => {
                  setAction({ id: item.product.id, action: 'minus' });
                  dispatch(decrementOrRemoveCartItem({ id: item.product.id }));
                }}
                onDeleteItem={() => {
                  setAction({ id: item.product.id, action: 'delete' });
                  dispatch(
                    decrementOrRemoveCartItem({
                      id: item.product.id,
                      action: 'remove',
                    })
                  );
                }}
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
          keyExtractor={(item) => item.product.id.toString()}
          ListFooterComponent={
            cartData.length > 0 && (
              <ListBottomFooterComponent
                bottom={footerSummaryMetrics}
                total={getTotalPrice(cartData)}
                numOfCartItems={getTotalNumberOfItems(cartData)}
                cartData={cartData}
              />
            )
          }
          ListFooterComponentStyle={{ marginTop: 'auto' }}
        />
      </RenderLoadingErrorOrContent>
    </View>
  );
}

function ListBottomFooterComponent({
  bottom,
  total,
  numOfCartItems,
  cartData,
}) {
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
      <SubmitAndValidateButton
        icon='card-outline'
        label={`Proceed to Checkout (${numOfCartItems} items)`}
        selector={getOrders}
        thunkApiFunction={() => createNewOrder(cartData)}
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
    borderColor: appLightGray,
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
