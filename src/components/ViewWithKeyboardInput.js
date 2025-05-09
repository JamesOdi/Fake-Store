import { KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { appWhite } from '../lib/colors';

export default function ViewWithKeyboardInput({ children }) {
  return (
    <KeyboardAvoidingView
      behavior='height'
      style={{ flex: 1, backgroundColor: appWhite }}
    >
      <TouchableWithoutFeedback>{children}</TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
