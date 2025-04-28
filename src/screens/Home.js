import { FlatList, StyleSheet, View } from 'react-native';
import Category from '../components/Category';
import { useEffect } from 'react';
import EmptyList from '../components/EmptyList';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, loadCategoriesData } from '../store/categories';
import RenderLoadingErrorOrContent from '../components/RenderLoadingErrorOrContent';

export default function Home({ navigation }) {
  const onClickCategory = (category) => {
    navigation.navigate('Products', { category });
  };

  const dispatch = useDispatch();
  const { categories, isLoading, error } = useSelector(getCategories);

  useEffect(() => {
    dispatch(loadCategoriesData());
  }, []);

  return (
    <View style={{ height: '100%' }}>
      <RenderLoadingErrorOrContent isLoading={isLoading} error={error}>
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
      </RenderLoadingErrorOrContent>
    </View>
  );
}

const styles = StyleSheet.create({
  containerGapStyle: {
    gap: 10,
    padding: 15,
  },
});
