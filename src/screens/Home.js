import { FlatList, StyleSheet, View } from 'react-native';
import Category from '../components/Category';
import { useEffect, useState } from 'react';
import { GET_ALL_CATEGORIES } from '../lib/routes';
import { apiRequest, statusOk } from '../lib/api-request';
import { capitalizeFirstLetterOfEachWord } from '../lib/utils';
import Loading from '../components/Loading';
import EmptyList from '../components/EmptyProductsList';

export default function Home({ navigation }) {
  const onClickCategory = (category) => {
    navigation.navigate('Products', { category });
  };

  const [categories, setCategories] = useState([]);

  const [isLoading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    new Promise(async () => {
      const response = await apiRequest({
        route: GET_ALL_CATEGORIES,
      });
      if (statusOk(response)) {
        // response.body is an array
        const data = response.body.map((item) => ({
          name: item,
          // capitalize first letter of each word
          label: capitalizeFirstLetterOfEachWord(item),
        }));
        setCategories(data);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{ height: '100%' }}>
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={categories}
          renderItem={({ item }) => (
            <Category item={item} onClick={() => onClickCategory(item.name)} />
          )}
          keyExtractor={(item) => item.name}
          contentContainerStyle={styles.containerGapStyle}
          ListEmptyComponent={
            <EmptyList title='No Categories' subtitle='No categories found' />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  containerGapStyle: {
    gap: 10,
    padding: 15,
  },
});
