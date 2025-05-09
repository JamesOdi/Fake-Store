import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { formatCurrency } from '../lib/format-number';
import { appGreen, appWhite } from '../lib/colors';
import { AntDesign } from '@expo/vector-icons';

export default function OrderHeader({ item, isOpened, onClickOrder }) {
  const headers = [
    { label: 'Order ID', value: item.id },
    { label: 'Items', value: item.item_numbers },
    { label: 'Total', value: formatCurrency(item.total_price / 100) },
  ];

  return (
    <TouchableOpacity onPress={() => onClickOrder()}>
      <View style={styles.container}>
        {headers.map(({ label, value }) => {
          return (
            <View key={label} style={styles.orderHeader}>
              <Text>
                {label}: {value}
              </Text>
            </View>
          );
        })}
        <AntDesign
          name={isOpened ? 'caretup' : 'caretdown'}
          size={16}
          color={appGreen}
          style={{ marginLeft: 'auto' }}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
  },
  orderHeader: {
    width: '30%',
  },
});
