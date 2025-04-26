import { createStackNavigator } from '@react-navigation/stack';
import Home from '../../screens/Home';
import Products from '../../screens/Products';
import ProductDetails from '../../screens/ProductDetails';

export default function HomeStack() {
  const Stack = createStackNavigator();

  const stackScreens = [
    { name: 'Home', component: Home, title: 'Categories' },
    { name: 'Products', component: Products, title: 'Products' },
    {
      name: 'ProductDetails',
      component: ProductDetails,
      title: 'Product Details',
    },
  ];

  return (
    <Stack.Navigator initialRouteName='Home'>
      {stackScreens.map(({ name, component, title }) => (
        <Stack.Screen
          key={name}
          name={name}
          component={component}
          options={{ title }}
        />
      ))}
    </Stack.Navigator>
  );
}
