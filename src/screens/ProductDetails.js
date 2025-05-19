import { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList } from 'react-native';
import { getDeviceWidth } from '../lib/utils';
import ProductMetric from '../components/ProductMetric';
import Button from '../components/Button';
import {
  appBlack,
  appBlue,
  appGreen,
  appRed,
  appWhite,
  borderColor,
  subtitleColor,
} from '../lib/colors';
import ProductImage from '../components/ProductImage';
import { useDispatch, useSelector } from 'react-redux';
import { addCartItem, getCart } from '../store/cart';
import { getProduct, loadProductData } from '../store/product';
import RenderLoadingErrorOrContent from '../components/RenderLoadingErrorOrContent';
import SubmitAndValidateButton from '../components/SubmitAndValidateButton';
import { formatCurrency } from '../lib/format-number';

export default function ProductDetails({ navigation, route }) {
  const { id } = route.params;
  const imageWidth = getDeviceWidth() * 0.9; // 90% of screen width
  const [productMetrics, setProductMetrics] = useState([]);
  const dispatch = useDispatch();
  const { product, isLoading, error } = useSelector(getProduct);

  useEffect(() => {
    dispatch(loadProductData(id));
  }, [id]);

  const defaultAddToCartButton = {
    label: 'Add to Cart',
    icon: 'cart-outline',
    color: appBlue,
  };

  const [addToCartButton, setAddToCartButton] = useState(
    defaultAddToCartButton
  );

  const cartItems = useSelector((state) => state.cart.cartData);

  useEffect(() => {
    if (product) {
      const { rating, price } = product;
      const rate = rating?.rate || 0;
      const count = rating?.count || 0;
      setProductMetrics([
        { title: 'Rating', value: rate },
        { title: 'Count', value: count },
        { title: 'Price', value: formatCurrency(price) },
      ]);
    } else {
      navigation.goBack();
    }
  }, [product]);

  useEffect(() => {
    const isProductInCart = cartItems.some((item) => item.product.id === id);
    if (isProductInCart) {
      setAddToCartButton({
        label: 'Added to Cart',
        icon: 'checkmark-circle-outline',
        color: appGreen,
        disabled: true,
      });
    } else {
      setAddToCartButton(defaultAddToCartButton);
    }
  }, [cartItems]);

  return (
    <ScrollView style={styles.container}>
      <RenderLoadingErrorOrContent
        isLoading={isLoading}
        error={error}
        loadingText='Loading product details...'
      >
        <>
          <View style={styles.imageHeaderContainer}>
            <ProductImage imageUrl={product.image} imageWidth={imageWidth} />
          </View>
          <View style={styles.content}>
            <Text style={styles.title}>{product.title}</Text>
            <View style={styles.priceRateCountContainer}>
              <FlatList
                data={productMetrics}
                renderItem={ProductMetric}
                keyExtractor={(_, index) => index.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.productMetricsListContainerStyle}
              />
            </View>
            <View style={styles.actionButtonsContainer}>
              <Button
                icon='arrow-back-outline'
                color={appRed}
                minWidth={undefined}
                onClick={() => {
                  if (navigation.canGoBack()) {
                    navigation.goBack();
                  } else {
                    navigation.replace('Home');
                  }
                }}
                label='Back'
              />

              <SubmitAndValidateButton
                icon={addToCartButton.icon}
                label={addToCartButton.label}
                color={addToCartButton.color}
                disabled={addToCartButton.disabled}
                selector={getCart}
                minWidth={undefined}
                thunkApiFunction={() => addCartItem(product)}
              />
            </View>

            <View style={styles.productDescriptionContainer}>
              <Text style={styles.title}>Description</Text>
              <Text style={styles.description}>{product.description}</Text>
            </View>
          </View>
        </>
      </RenderLoadingErrorOrContent>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
  content: {
    flex: 1,
    height: '100%',
    paddingHorizontal: '5%',
    paddingTop: 20,
    paddingBottom: 100,
    marginStart: 'auto',
    marginEnd: 'auto',
    marginTop: 10,
    gap: 15,
    backgroundColor: appWhite,
  },
  productMetricsListContainerStyle: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  imageHeaderContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: appWhite,
    elevation: 1,
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: appBlack,
  },
  priceRateCountContainer: {
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: borderColor,
    borderBottomColor: borderColor,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    width: '100%',
  },
  productDescriptionContainer: {
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: borderColor,
    borderBottomColor: borderColor,
  },
  description: {
    padding: 5,
    fontSize: 16,
    color: subtitleColor,
  },
});
