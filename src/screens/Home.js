import { FlatList, StyleSheet } from 'react-native';
import { categories } from '../lib/constants';
import Category from '../components/Category';

export default function Home({ navigation }) {
  const onClickCategory = (category) => {
    navigation.navigate('Products', { category });
  };
  return (
    <FlatList
      data={categories}
      renderItem={({ item }) => (
        <Category item={item} onClick={() => onClickCategory(item.name)} />
      )}
      keyExtractor={(item) => item.name}
      contentContainerStyle={styles.containerGapStyle}
    ></FlatList>
  );
}

const styles = StyleSheet.create({
  containerGapStyle: {
    gap: 10,
    padding: 15,
  },
});
