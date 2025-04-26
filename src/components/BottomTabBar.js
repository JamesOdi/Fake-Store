import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import { appBlue, appLightGray, appRed, appWhite } from '../lib/colors';
import HomeStack from '../stacks/home/HomeStack';
import CartStack from '../stacks/cart/CartStack';
import { StyleSheet, Text, View } from 'react-native';
import OrdersStack from '../stacks/orders/OrdersStack';
import ProfileStack from '../stacks/profile/ProfileStack';
import { useSelector } from 'react-redux';

export default function BottomTabNavBar() {
  const Tab = createBottomTabNavigator();
  const cartItems = useSelector((state) => state.cart.items);
  const badgeCounts = new Map([
    ['CartTab', cartItems.length],
    ['OrdersTab', 1],
  ]);

  const renderBadgeIcon = (routeName) => {
    const count = badgeCounts.get(routeName);
    if (count) {
      return <Badge count={count} />;
    }
    return null;
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
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
      <Tab.Screen
        name='HomeTab'
        component={HomeStack}
        options={{ title: 'Products' }}
      />
      <Tab.Screen
        name='CartTab'
        component={CartStack}
        options={{ title: 'My Cart' }}
      />
      <Tab.Screen
        name='OrdersTab'
        component={OrdersStack}
        options={{ title: 'My Orders' }}
      />
      <Tab.Screen
        name='ProfileTab'
        component={ProfileStack}
        options={{ title: 'User Profile' }}
      />
    </Tab.Navigator>
  );
}

function Badge({ count }) {
  return (
    <View style={styles.badgeContainer}>
      <Text style={styles.badgeText}>{count}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 60,
    paddingTop: 7,
  },
  badgeContainer: {
    position: 'absolute',
    right: -10,
    top: -5,
    backgroundColor: appRed,
    borderRadius: 50,
    width: 17,
    height: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: appWhite,
    fontWeight: 'bold',
  },
});
