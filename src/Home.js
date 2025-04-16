import { FlatList, StyleSheet } from 'react-native';
import Category from '../components/Category';
import { categories } from '../lib/constants';

export default function Home({ navigation }) {
  return (
    <FlatList
      data={categories}
      renderItem={Category}
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
