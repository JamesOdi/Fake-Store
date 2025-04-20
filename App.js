import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/Home';
import Products from './src/screens/Products';
import ProductDetails from './src/screens/ProductDetails';

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
}
