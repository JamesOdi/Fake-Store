import { createStackNavigator } from '@react-navigation/stack';
import Orders from '../../screens/Orders';

export default function OrdersStack() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName='Orders'>
      <Stack.Screen
        name='Orders'
        component={Orders}
        options={{ title: 'Orders' }}
      />
      {/* <Stack.Screen
            name='OrderDetails'
            component={OrderDetails}
            options={{ title: 'Order Details' }}
        /> */}
    </Stack.Navigator>
  );
}
