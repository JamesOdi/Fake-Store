import { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { appBlack, appWhite } from '../lib/colors';
import ProductImage from './ProductImage';
import { formatCurrency } from '../lib/format-number';

export default function OrderProductItem({ item, onClickProduct }) {
  const metrics = [
    { label: 'Price', value: formatCurrency(item.price) },
    { label: 'Quantity', value: item.quantity },
  ];
  return (
    <TouchableOpacity
      activeOpacity={0.4}
      style={styles.container}
      onPress={() => onClickProduct()}
    >
      <ProductImage imageUrl={item.product.image} imageWidth={40} />
      <View style={styles.col2}>
        <Text style={styles.title}>{item.product.title}</Text>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          {metrics.map((metric) => (
            <Text key={metric.label} style={styles.metric}>
              <Text style={{ fontWeight: 'bold' }}>{metric.label}: </Text>
              {metric.value}
            </Text>
          ))}
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
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 2,
  },
  title: {
    fontSize: 14,
    color: appBlack,
  },
  col2: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    maxWidth: '70%',
    gap: 10,
  },
  metric: {
    fontSize: 14,
    color: appBlack,
  },
});
