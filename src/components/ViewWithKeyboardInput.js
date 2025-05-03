import { KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';

export default function ViewWithKeyboardInput({ children }) {
  return (
    <KeyboardAvoidingView behavior='height' style={{ flex: 1 }}>
      <TouchableWithoutFeedback>{children}</TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
