import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import OrderGroup from '../components/OrderGroup';
import { appWhite } from '../lib/colors';
import { payOrder } from '../store/orders';

export default function Orders({ navigation }) {
  const ordersData = useSelector((state) => state.orders.orders);
  const [orderGroups, setOrderGroups] = useState([]);
  const [openedOrderGroup, setOpenedOrderGroup] = useState(undefined);

  useEffect(() => {
    setOrderGroups([
      {
        title: 'New Orders',
        orders: ordersData.filter(
          ({ is_paid, is_delivered }) => !is_paid && !is_delivered
        ),
        buttonDetails: {
          label: 'Pay',
          icon: 'card-outline',
        },
      },
      {
        title: 'Paid Orders',
        orders: ordersData.filter(
          ({ is_paid, is_delivered }) => is_paid && !is_delivered
        ),
        buttonDetails: {
          label: 'Receive',
          icon: 'car-sport-outline',
        },
      },
      {
        title: 'Delivered Orders',
        orders: ordersData.filter(
          ({ is_paid, is_delivered }) => is_paid && is_delivered
        ),
        buttonDetails: undefined,
      },
    ]);
  }, [ordersData]);

  const handleOpenedGroup = (title) => {
    if (title == openedOrderGroup) {
      setOpenedOrderGroup(undefined);
    } else {
      setOpenedOrderGroup(title);
    }
  };

  const onClickProduct = (id) => {
    navigation.navigate('HomeTab', {
      screen: 'ProductDetails',
      params: { id },
    });
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={orderGroups}
        renderItem={({ item }) => (
          <OrderGroup
            item={item}
            isOpened={openedOrderGroup == item.title}
            onClickGroup={() => handleOpenedGroup(item.title)}
            onClickProduct={(id) => onClickProduct(id)}
          />
        )}
        keyExtractor={(item) => item.title}
        contentContainerStyle={styles.containerGapStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appWhite,
  },
  containerGapStyle: {
    gap: 10,
    padding: 15,
  },
});
