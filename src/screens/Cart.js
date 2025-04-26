import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { GET_ALL_PRODUCTS } from '../lib/routes';
import { useDispatch, useSelector } from 'react-redux';
import { apiRequest, statusOk } from '../lib/api-request';
import { appGray } from '../lib/colors';
import CartItem from '../components/CartItem';
import {
  decrementItemCount,
  incrementItemCount,
  removeFromCart,
} from '../store/cart';
import { formatCurrency } from '../lib/format-number';
import EmptyList from '../components/EmptyList';
import Button from '../components/Button';
import Loading from '../components/Loading';

export default function Cart({ navigation }) {
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const cartItems = useSelector((state) => state.cart.items);
  const [numOfItems, setNumOfItems] = useState(0);
  const dispatch = useDispatch();

  const footerSummaryMetrics = [
    {
      title: 'Items',
      value: numOfItems,
    },
    { title: 'Total', value: total },
  ];

  const fetchData = () => {
    new Promise(async () => {
      const response = await apiRequest({
        route: GET_ALL_PRODUCTS,
      });
      if (statusOk(response)) {
        setProducts(response.body);
      }
    });
  };

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      fetchData();
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      setTotal(
        formatCurrency(
          products.reduce((acc, product) => {
            const cartItem = cartItems.find((item) => item.id === product.id);
            if (cartItem) {
              return acc + product.price * cartItem.count;
            }
            return acc;
          }, 0)
        )
      );
      setNumOfItems(cartItems.reduce((acc, item) => acc + item.count, 0));
      const cartItemsData = [];
      products.forEach((product) => {
        const cartItem = cartItems.find((item) => item.id === product.id);
        if (cartItem) {
          cartItemsData.push({
            ...product,
            count: cartItem.count,
          });
        }
      });
      setData(cartItemsData);
    }
  }, [products, cartItems]);

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
      {isLoading ? (
        <Loading loadingText='Loading your cart...' />
      ) : (
        <FlatList
          data={data}
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
            data.length > 0 && (
              <ListBottomFooterComponent
                bottom={footerSummaryMetrics}
                total={total}
                numOfCartItems={numOfItems}
              />
            )
          }
          ListFooterComponentStyle={{ marginTop: 'auto' }}
        />
      )}
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
