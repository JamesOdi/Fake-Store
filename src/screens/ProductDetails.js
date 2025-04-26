import { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList } from 'react-native';
import { apiRequest, statusOk } from '../lib/api-request';
import { GET_PRODUCT_BY_ID } from '../lib/routes';
import Loading from '../components/Loading';
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
import ProductNotFound from '../components/ProductNotFound';
import ProductImage from '../components/ProductImage';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/cart';

export default function ProductDetails({ navigation, route }) {
  const { id } = route.params;
  const [productDetail, setProductDetail] = useState(undefined);
  const [isLoading, setLoading] = useState(true);
  const imageWidth = getDeviceWidth() * 0.9; // 90% of screen width
  const [productMetrics, setProductMetrics] = useState([]);
  const [productInCart, setProductInCart] = useState(false);

  const fetchData = () => {
    setLoading(true);
    new Promise(async () => {
      const response = await apiRequest({
        route: GET_PRODUCT_BY_ID,
        routeParams: { id },
      });

      if (statusOk(response)) {
        // response.body is an object
        const data = response.body;
        setProductDetail(data);
      } else {
        setProductDetail(undefined);
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

  const defaultAddToCartButton = {
    label: 'Add to Cart',
    icon: 'cart-outline',
    color: appBlue,
    onClick: () => {
      handleAddToCart();
    },
  };

  const initialActionButtons = [
    {
      label: 'Back',
      icon: 'arrow-back-outline',
      color: appRed,
      onClick: () => {
        navigation.goBack();
      },
    },
    defaultAddToCartButton,
  ];

  const [actionButtons, setActionButtons] = useState(initialActionButtons);

  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    if (productDetail) {
      const { rating, price } = productDetail;
      const rate = rating?.rate || 0;
      const count = rating?.count || 0;
      setProductMetrics([
        { title: 'Rating', value: rate },
        { title: 'Count', value: count },
        { title: 'Price', value: `$${price}` },
      ]);
    }
  }, [productDetail]);

  const handleAddToCart = () => {
    dispatch(addToCart({ id, count: 1 }));
  };

  useEffect(() => {
    const isProductInCart = items.some((item) => item.id === id);
    setProductInCart(isProductInCart);
    if (isProductInCart) {
      actionButtons[1].label = 'Added to Cart';
      actionButtons[1].icon = 'checkmark-circle-outline';
      actionButtons[1].color = appGreen;
      actionButtons[1].disabled = true;
      setActionButtons(actionButtons);
    }
  }, [items]);

  return (
    <ScrollView style={styles.container}>
      {isLoading ? (
        <Loading loadingText='Loading product details...' />
      ) : productDetail ? (
        <>
          <View style={styles.imageHeaderContainer}>
            <ProductImage
              imageUrl={productDetail.image}
              imageWidth={imageWidth}
            />
          </View>
          <View style={styles.content}>
            <Text style={styles.title}>{productDetail.title}</Text>
            <View style={styles.priceRateCountContainer}>
              <FlatList
                data={productMetrics}
                renderItem={ProductMetric}
                keyExtractor={(item, index) => index.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                }}
              />
            </View>
            <View style={styles.actionButtonsContainer}>
              {actionButtons.map(
                (
                  { icon, color, iconColor, label, disabled, onClick },
                  index
                ) => (
                  <Button
                    key={index}
                    icon={icon}
                    color={color}
                    iconColor={iconColor}
                    disabled={disabled}
                    onClick={() => onClick()}
                    label={label}
                  />
                )
              )}
            </View>

            <View style={styles.productDescriptionContainer}>
              <Text style={styles.title}>Description</Text>
              <Text style={styles.description}>
                {productDetail.description}
              </Text>
            </View>
          </View>
        </>
      ) : (
        <ProductNotFound navigation={navigation} />
      )}
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
    gap: 30,
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
