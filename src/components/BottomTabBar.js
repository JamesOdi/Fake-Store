import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import { appBlue, appLightGray } from '../lib/colors';
import HomeStack from '../stacks/home/HomeStack';
import CartStack from '../stacks/cart/CartStack';
import { BackHandler, StyleSheet, View } from 'react-native';
import OrdersStack from '../stacks/orders/OrdersStack';
import ProfileStack from '../stacks/profile/ProfileStack';
import { useSelector } from 'react-redux';
import TabIconBadge from './TabIconBadge';
import useUser from '../hooks/useUser';
import { showErrorAlertDialog } from '../lib/api-request';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useEffect } from 'react';

export default function BottomTabNavBar() {
  const Tab = createBottomTabNavigator();
  const totalNumOfItems = useSelector((state) => state.cart.totalNumOfItems);
  const { user } = useUser();

  const badgeCounts = new Map([
    ['CartTab', totalNumOfItems],
    ['OrdersTab', 1],
  ]);

  const BadgeIcon = ({ routeName }) => {
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

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (!user) {
          return true;
        }
        return false;
      };
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      );
      return () => backHandler.remove();
    }, [user])
  );

  const navigation = useNavigation();

  // useEffect(() => {
  //   if (!user) {
  //     navigation.navigate('ProfileTab', { screen: 'Profile' });
  //   }
  // }, [navigation, user]);

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
      initialRouteName={user ? undefined : 'ProfileTab'}
      screenListeners={({ navigation }) => ({
        state: (e) => {
          return null;
          // navigation.
        },
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
            // Usability of listeners found at: https://reactnavigation.org/docs/navigation-events/?config=dynamic#listeners-prop-on-screen
            listeners={{
              tabPress: (e) => {
                // Disable all tabs when the user is unauthorized
                if (name != 'ProfileTab' && !user) {
                  e.preventDefault();
                  showErrorAlertDialog({
                    title: 'Not Logged In',
                    message: 'You must log in to view this tab',
                  });
                }
              },
            }}
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
