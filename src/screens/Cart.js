import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { GET_ALL_PRODUCTS } from '../lib/routes';
import { useSelector } from 'react-redux';
import { apiRequest, statusOk } from '../lib/api-request';
import { appGray } from '../lib/colors';
import CartItem from '../components/CartItem';

export default function Cart({ navigation }) {
  const data = [];
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const cartItems = useSelector((state) => state.cart.items);
  const bottom = [
    {
      title: 'Items',
      value: cartItems.reduce((acc, item) => acc + item.count, 0),
    },
    { title: 'Total', value: `$${total}` },
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
    const timer = setTimeout(() => {
      fetchData();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      setTotal(
        products.reduce((acc, product) => {
          const cartItem = cartItems.find((item) => item.id === product.id);
          if (cartItem) {
            return acc + product.price * cartItem.count;
          }
          return acc;
        }, 0)
      );
      products.forEach((product) => {
        const cartItem = cartItems.find((item) => item.id === product.id);
        if (cartItem) {
          data.push({
            ...product,
            count: cartItem.count,
          });
        }
      });
    }
  }, [products, cartItems]);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return <CartItem item={item} />;
        }}
        contentContainerStyle={styles.containerGapStyle}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={ListBottomFooterComponent({ bottom, total })}
        ListFooterComponentStyle={{ marginTop: 100 }}
      />
    </View>
  );
}

function ListBottomFooterComponent({ bottom, total }) {
  return (
    <View
      style={{
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: appGray,
      }}
    >
      {bottom.map((item) => {
        return (
          <View
            key={item.title}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text style={{ fontSize: 18 }}>{item.title}:</Text>
            <Text style={{ fontSize: 18 }}>{item.value}</Text>
          </View>
        );
      })}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
        }}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Subtotal:</Text>
        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>${total}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerGapStyle: {
    gap: 10,
    padding: 15,
  },
});
