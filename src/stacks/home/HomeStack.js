import { createStackNavigator } from '@react-navigation/stack';
import Home from '../../screens/Home';
import Products from '../../screens/Products';
import ProductDetails from '../../screens/ProductDetails';

export default function HomeStack() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen
        name='Home'
        component={Home}
        options={{ title: 'Categories' }}
      />
      <Stack.Screen
        name='Products'
        component={Products}
        options={{ title: 'Products' }}
      />
      <Stack.Screen
        name='ProductDetails'
        component={ProductDetails}
        options={{ title: 'Product Details' }}
      />
    </Stack.Navigator>
  );
}
