import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import { appBlue, appLightGray } from '../lib/colors';
import HomeStack from '../stacks/home/HomeStack';
import CartStack from '../stacks/cart/CartStack';
import { StyleSheet, View } from 'react-native';
import OrdersStack from '../stacks/orders/OrdersStack';
import ProfileStack from '../stacks/profile/ProfileStack';
import { useSelector } from 'react-redux';
import TabIconBadge from './TabIconBadge';

export default function BottomTabNavBar() {
  const Tab = createBottomTabNavigator();
  const cartItems = useSelector((state) => state.cart.items);
  const badgeCounts = new Map([
    ['CartTab', cartItems.reduce((acc, item) => acc + item.count, 0)],
    ['OrdersTab', 1],
  ]);

  const renderBadgeIcon = (routeName) => {
    const count = badgeCounts.get(routeName);
    if (count) {
      return <TabIconBadge count={count} />;
    }
    return null;
  };

  const tabScreens = [
    { name: 'HomeTab', component: HomeStack, title: 'Products' },
    { name: 'CartTab', component: CartStack, title: 'My Cart' },
    { name: 'OrdersTab', component: OrdersStack, title: 'My Orders' },
    { name: 'ProfileTab', component: ProfileStack, title: 'User Profile' },
  ];

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case 'HomeTab':
              iconName = 'home';
              break;
            case 'CartTab':
              iconName = 'shoppingcart';
              break;
            case 'OrdersTab':
              iconName = 'gift';
              break;
            case 'ProfileTab':
              iconName = 'user';
              break;
          }
          return (
            <View style={{ position: 'relative' }}>
              <AntDesign name={iconName} size={size} color={color} />
              {renderBadgeIcon(route.name)}
            </View>
          );
        },
        tabBarActiveTintColor: appBlue,
        tabBarInactiveTintColor: appLightGray,
        headerShown: false,
        tabBarStyle: styles.tabBarStyle,
      })}
    >
      {/* Render all the tab screens */}
      {tabScreens.map(({ name, component, title }) => {
        return (
          <Tab.Screen
            key={name}
            name={name}
            component={component}
            options={{ title }}
          />
        );
      })}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 60,
    paddingTop: 7,
  },
});
