import { useEffect, useLayoutEffect } from 'react';
import { Text, View } from 'react-native';
import { categories } from '../lib/constants';
import { apiRequest } from '../lib/api-request';
import { GET_ALL_PRODUCTS } from '../lib/routes';

export default function Products({ navigation, route }) {
  const { category } = route.params;

  useLayoutEffect(() => {
    const item = categories.find(({ name }) => name == category);
    if (item) {
      navigation.setOptions({
        title: item.label,
      });
    }
  }, [navigation, category]);

  useEffect(() => {
    new Promise(async () => {
      const response = await apiRequest({ route: GET_ALL_PRODUCTS });
    });
  }, [category]);
  return (
    <View>
      <Text>Products Page</Text>
    </View>
  );
}
