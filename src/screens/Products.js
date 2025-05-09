import { useEffect, useLayoutEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ProductItem from '../components/ProductItem';
import Button from '../components/Button';
import EmptyList from '../components/EmptyList';
import { capitalizeFirstLetterOfEachWord } from '../lib/utils';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, loadProductsData } from '../store/products';
import RenderLoadingErrorOrContent from '../components/RenderLoadingErrorOrContent';
import { appWhite } from '../lib/colors';

export default function Products({ navigation, route }) {
  const { category } = route.params;
  const [emptyState, setEmptyState] = useState({});

  const dispatch = useDispatch();
  const { products, isLoading, error } = useSelector(getProducts);

  useLayoutEffect(() => {
    const categoryLabel = capitalizeFirstLetterOfEachWord(category);
    navigation.setOptions({
      title: categoryLabel,
    });
    setEmptyState({
      title: `No items in "${categoryLabel}" category Found`,
      subtitle: 'Return to Categories list and explore another category',
      icon: 'clipboard-outline',
    });
  }, [navigation, category]);

  useEffect(() => {
    dispatch(loadProductsData(category));
  }, [category]);

  const onClickProduct = (id) => {
    navigation.navigate('ProductDetails', { id });
  };
  return (
    <View style={{ flex: 1, backgroundColor: appWhite }}>
      <RenderLoadingErrorOrContent
        isLoading={isLoading}
        loadingText='Loading products...'
        error={error}
      >
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <ProductItem item={item} onClick={() => onClickProduct(item.id)} />
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.containerGapStyle}
          ListFooterComponent={
            <View style={{ marginTop: 20 }}>
              <Button
                label='Back'
                icon='arrow-back-outline'
                onClick={() => navigation.goBack()}
              />
            </View>
          }
          ListFooterComponentStyle={{ marginTop: 'auto' }}
          ListEmptyComponent={
            <EmptyList
              title={emptyState.title}
              subtitle={emptyState.subtitle}
            />
          }
        />
      </RenderLoadingErrorOrContent>
    </View>
  );
}

const styles = StyleSheet.create({
  containerGapStyle: {
    gap: 20,
    flexGrow: 1,
    padding: 15,
  },
});
