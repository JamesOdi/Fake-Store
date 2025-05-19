import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { appWhite } from '../lib/colors';

export default function ViewWithKeyboardInput({
  children,
  backgroundColor = appWhite,
  onClickOutsideChildren,
}) {
  return (
    <KeyboardAvoidingView
      behavior='height'
      style={{ flex: 1, backgroundColor }}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          onClickOutsideChildren && onClickOutsideChildren();
          Keyboard.dismiss();
        }}
      >
        <View style={{ flex: 1 }} />
      </TouchableWithoutFeedback>
      <View style={StyleSheet.absoluteFill}>{children}</View>
    </KeyboardAvoidingView>
  );
}
