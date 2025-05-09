import { StyleSheet, View } from 'react-native';
import OrderHeader from './OrderHeader';
import { appBlack, appBlue, appLightGray, appWhite } from '../lib/colors';
import OrderProductItem from './OrderProductItem';
import SubmitAndValidateButton from './SubmitAndValidateButton';
import { deliverOrder, getOrders, payOrder } from '../store/orders';

export default function Order({
  item,
  buttonDetails,
  isOpened,
  onClickOrder,
  onClickProduct,
}) {
  return (
    <View
      style={[
        styles.container,
        isOpened ? styles.activeOrderContainer : undefined,
      ]}
    >
      <OrderHeader
        item={item}
        onClickOrder={() => onClickOrder()}
        isOpened={isOpened}
      />
      <View style={{ display: isOpened ? 'contents' : 'none' }}>
        {item.order_items.map((item, idx) => (
          <OrderProductItem
            key={`${idx}_${item.prodID}`}
            item={item}
            onClickProduct={() => onClickProduct(item.product.id)}
          />
        ))}
        {buttonDetails && (
          <View
            style={{
              paddingHorizontal: 50,
              paddingVertical: 20,
              backgroundColor: appWhite,
              borderColor: appLightGray,
              borderTopWidth: 1,
            }}
          >
            <SubmitAndValidateButton
              icon={buttonDetails.icon}
              label={buttonDetails.label}
              color={appBlack}
              selector={getOrders}
              thunkApiFunction={() =>
                buttonDetails.label == 'Pay'
                  ? payOrder(item.id)
                  : deliverOrder(item.id)
              }
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderColor: appLightGray,
  },
  activeOrderContainer: {
    borderWidth: 2,
    borderTopWidth: 2,
    borderColor: appBlue,
  },
});
