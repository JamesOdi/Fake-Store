import { useEffect, useLayoutEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { apiRequest, statusOk } from '../lib/api-request';
import { GET_ALL_PRODUCTS_BY_CATEGORY } from '../lib/routes';
import ProductItem from '../components/ProductItem';
import Button from '../components/Button';
import EmptyList from '../components/EmptyProductsList';
import Loading from '../components/Loading';
import { capitalizeFirstLetterOfEachWord } from '../lib/utils';

export default function Products({ navigation, route }) {
  const [isLoading, setLoading] = useState(true);
  const { category } = route.params;
  const [items, setItems] = useState([]);
  const [emptyState, setEmptyState] = useState({});

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

  const fetchData = () => {
    setLoading(true);
    new Promise(async () => {
      const response = await apiRequest({
        route: GET_ALL_PRODUCTS_BY_CATEGORY,
        routeParams: { category },
      });
      if (statusOk(response)) {
        // response.body is an array
        setItems(response.body);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 500); // Adjust time to your preference
    return () => clearTimeout(timer);
  }, [category]);

  const onClickProduct = (id) => {
    navigation.navigate('ProductDetails', { id });
  };
  return (
    <View>
      {isLoading ? (
        <Loading />
      ) : (
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
                icon='arrow-back-outline'
                onClick={() => navigation.goBack()}
              />
            </View>
          }
          ListEmptyComponent={
            <EmptyList
              title={emptyState.title}
              subtitle={emptyState.subtitle}
            />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  containerGapStyle: {
    gap: 20,
    padding: 15,
  },
});
