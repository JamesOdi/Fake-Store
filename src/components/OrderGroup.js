import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { appBlue, appWhite } from '../lib/colors';
import { AntDesign } from '@expo/vector-icons';
import Order from './Order';
import { useState } from 'react';

export default function OrderGroup({
  item,
  onClickGroup,
  onClickProduct,
  isOpened,
}) {
  const [openedOrderList, setOpenedOrderList] = useState(undefined);

  const handleOpenedOrderList = (id) => {
    if (openedOrderList == id) {
      setOpenedOrderList(undefined);
    } else {
      setOpenedOrderList(id);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.orderItemTitleContainer,
          isOpened ? styles.orderItemTitleContainerOpened : undefined,
        ]}
        onPress={() => onClickGroup()}
        activeOpacity={0.4}
      >
        <Text style={styles.orderItemTitle}>
          {item.title} ({item.orders.length})
        </Text>
        <AntDesign
          name={isOpened ? 'caretup' : 'caretdown'}
          size={16}
          color={appWhite}
        />
      </TouchableOpacity>
      <View style={{ display: isOpened ? 'contents' : 'none' }}>
        {item.orders.map((order) => (
          <Order
            key={order.id}
            item={order}
            buttonDetails={item.buttonDetails}
            isOpened={openedOrderList == order.id}
            onClickOrder={() => handleOpenedOrderList(order.id)}
            onClickProduct={(id) => onClickProduct(id)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    flexDirection: 'column',
    backgroundColor: appWhite,
    elevation: 4,
    borderRadius: 15,
  },
  orderListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  orderItemTitleContainer: {
    flexDirection: 'row',
    backgroundColor: appBlue,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  orderItemTitleContainerOpened: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  orderItemTitle: {
    fontSize: 20,
    color: appWhite,
    fontWeight: 'bold',
  },
  containerGapStyle: {},
});
