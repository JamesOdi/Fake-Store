import { FlatList, StyleSheet, View } from 'react-native';
import Category from '../components/Category';
import { useEffect, useState } from 'react';
import { GET_ALL_CATEGORIES } from '../lib/routes';
import { apiRequest, statusOk } from '../lib/api-request';
import { capitalizeFirstLetterOfEachWord } from '../lib/utils';
import Loading from '../components/Loading';

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
        // \b([a-z])
        const data = response.body.map((item) => ({
          name: item,
          // capitalize first letter of each word
          label: capitalizeFirstLetterOfEachWord(item),
        }));
        setCategories(data);
      }
    });
    setLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{ flex: 1 }}>
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
