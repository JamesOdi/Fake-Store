import { useEffect, useLayoutEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { categories } from '../lib/constants';
import { apiRequest, statusOk } from '../lib/api-request';
import { GET_ALL_PRODUCTS } from '../lib/routes';
import ProductItem from '../components/ProductItem';
import Button from '../components/Button';
import EmptyProductList from '../components/EmptyProductsList';

export default function Products({ navigation, route }) {
  const { category } = route.params;
  const [items, setItems] = useState([]);
  const [emptyState, setEmptyState] = useState({
    title: 'No Products Found',
    subtitle: 'Start by adding a new product!',
    icon: 'clipboard-outline',
  });

  useLayoutEffect(() => {
    const item = categories.find(({ name }) => name == category);
    if (item) {
      navigation.setOptions({
        title: item.label,
      });
      setEmptyState({
        title: `No items in "${item.label}" category Found`,
        subtitle: `Return to Categories list and explore another category`,
        icon: 'clipboard-outline',
      });
    }
  }, [navigation, category]);

  useEffect(() => {
    new Promise(async () => {
      const response = await apiRequest({ route: GET_ALL_PRODUCTS });
      if (statusOk(response)) {
        // response.body is an array
        const data = response.body.filter((item) => item.category == category);
        setItems(data);
      }
    });
  }, [category]);

  const onClickProduct = (id) => {
    //
  };
  return (
    <View>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <ProductItem item={item} onClick={() => onClickProduct(item.id)} />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.containerGapStyle}
        ListFooterComponent={
          <View
            style={{
              height: 100,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Button
              label='Back'
              icon='chevron-back'
              onClick={() => navigation.goBack()}
            />
          </View>
        }
        ListEmptyComponent={
          <EmptyProductList
            title={emptyState.title}
            subtitle={emptyState.subtitle}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerGapStyle: {
    gap: 20,
    padding: 15,
  },
});
