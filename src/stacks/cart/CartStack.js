import { createStackNavigator } from '@react-navigation/stack';
import Cart from '../../screens/Cart';

export default function CartStack() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName='Cart'>
      <Stack.Screen
        name='Cart'
        component={Cart}
        options={{ title: 'Shopping Cart' }}
      />
      {/* <Stack.Screen
            name='Checkout'
            component={Checkout}
            options={{ title: 'Checkout' }}
        /> */}
    </Stack.Navigator>
  );
}
