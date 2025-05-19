import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import { appBlue, appLightGray } from '../lib/colors';
import HomeStack from '../stacks/home/HomeStack';
import CartStack from '../stacks/cart/CartStack';
import { StyleSheet, View } from 'react-native';
import OrdersStack from '../stacks/orders/OrdersStack';
import ProfileStack from '../stacks/profile/ProfileStack';
import { useDispatch, useSelector } from 'react-redux';
import TabIconBadge from './TabIconBadge';
import useUser from '../hooks/useUser';
import { showErrorAlertDialog } from '../lib/api-request';
import { useEffect } from 'react';
import { getTotalNumberOfItems } from '../lib/format-number';
import { loadCart } from '../store/cart';
import { loadOrders } from '../store/orders';

export default function BottomTabNavBar() {
  const Tab = createBottomTabNavigator();
  const { cartData } = useSelector((state) => state.cart);
  const ordersData = useSelector((state) => state.orders.orders);
  const dispatch = useDispatch();
  const { user } = useUser();

  const badgeCounts = new Map([
    ['CartTab', getTotalNumberOfItems(cartData)],
    [
      'OrdersTab',
      ordersData.filter((order) => !order.is_paid && !order.is_delivered)
        .length,
    ],
  ]);

  const BadgeIcon = ({ routeName }) => {
    const count = badgeCounts.get(routeName);
    if (user && count) {
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

  useEffect(() => {
    if (user) {
      dispatch(loadCart());
      dispatch(loadOrders());
    } else {
    }
  }, [user]);

  const initialRouteName = user ? 'HomeTab' : 'ProfileTab';

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
            // Create a pill shape
            <View style={{ position: 'relative' }}>
              <AntDesign name={iconName} size={size} color={color} />
              <BadgeIcon routeName={route.name} />
            </View>
          );
        },
        tabBarActiveTintColor: appBlue,
        tabBarInactiveTintColor: appLightGray,
        headerShown: false,
        tabBarStyle: [styles.tabBarStyle /*{ display: 'none' } */],
      })}
      initialRouteName={initialRouteName}
      screenListeners={({ route }) => {
        if (route.name != 'ProfileTab' && !user) {
          return {
            tabPress: (e) => {
              e.preventDefault();
              showErrorAlertDialog({
                title: 'Not Logged In',
                message: 'You must log in to view this tab',
              });
            },
          };
        }
      }}
    >
      {/* Render all the tab screens */}
      {tabScreens.map(({ name, component, title }) => {
        return (
          <Tab.Screen
            key={name}
            name={name}
            component={component}
            options={{ title }}
            // Usability of listeners found at: https://reactnavigation.org/docs/navigation-events/?config=dynamic#listeners-prop-on-screen
          />
        );
      })}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 70,
    paddingTop: 7,
  },
});
