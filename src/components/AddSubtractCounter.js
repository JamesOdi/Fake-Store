import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { appBlue, appWhite } from '../lib/colors';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';

export default function AddSubtractCounter({
  count,
  onAdd,
  onSubtract,
  isActive,
  isComponentLoading = false,
  action,
}) {
  // This add and subtract counter component is used only on the cart page
  const showLoading = (componentName = '') => {
    return isActive && componentName == action && isComponentLoading;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          onSubtract();
        }}
        disabled={isComponentLoading}
        style={[styles.button, styles.subtractButton]}
      >
        {showLoading('minus') ? (
          <ActivityIndicator size='small' color={appWhite} />
        ) : (
          <Feather name='minus' color={appWhite} />
        )}
      </TouchableOpacity>
      <Text style={styles.count}>{count}</Text>
      <TouchableOpacity
        onPress={() => {
          onAdd();
        }}
        disabled={isComponentLoading}
        style={[styles.button, styles.addButton]}
      >
        {showLoading('plus') ? (
          <ActivityIndicator size='small' color={appWhite} />
        ) : (
          <Feather name='plus' color={appWhite} />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    width: 'auto',
    borderRadius: 50,
    paddingHorizontal: 10,
    borderColor: appBlue,
    gap: 15,
  },
  button: {
    width: 20,
    height: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    backgroundColor: '#4CAF50', // Green
  },
  subtractButton: {
    backgroundColor: '#F44336', // Red
  },
  count: {
    fontSize: 16,
  },
});
