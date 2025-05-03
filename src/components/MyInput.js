import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { appBlack, appBlue, appRed, appWhite } from '../lib/colors';
import { useState } from 'react';

export default function MyInput({
  label,
  placeholder = '',
  error,
  onChangeText,
  required = false,
  defaultValue = '',
  secureTextEntry = false,
  inputMode = 'text',
}) {
  const [isActive, setIsActive] = useState(false);
  const [showSecureText, setShowSecureText] = useState(false);
  return (
    <View>
      <Text style={styles.labelText}>
        {label} <Text style={{ color: appRed }}>{required && '*'}</Text>
      </Text>
      <View style={{ position: 'relative' }}>
        <TextInput
          style={[
            styles.textInputContainer,
            error && styles.errorTextInputContainer,
            isActive && styles.activeInputContainer,
          ]}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry && !showSecureText}
          onChangeText={onChangeText}
          inputMode={inputMode}
          value={defaultValue}
          onFocus={() => setIsActive(true)}
          onBlur={() => {
            setShowSecureText(false);
            setIsActive(false);
          }}
        />
        {isActive && secureTextEntry && (
          <TouchableOpacity
            style={styles.viewHiddenTextContainer}
            onPress={() => setShowSecureText(!showSecureText)}
          >
            <Feather
              name={showSecureText ? 'eye-off' : 'eye'}
              size={20}
              style={styles.viewHiddenTextIcon}
              color={appBlue}
            />
          </TouchableOpacity>
        )}
      </View>

      {error && (
        <View style={styles.errorMessageContainer}>
          <Feather name='info' color={appRed} />
          <Text style={styles.errorMessage}>{error}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  viewHiddenTextContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    top: 0,
    paddingRight: 15,
  },
  viewHiddenTextIcon: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  textInputContainer: {
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 5,
    paddingHorizontal: 10,
    textAlignVertical: 'top',
    paddingTop: '4%',
    paddingBottom: '4%',
    paddingRight: 50,
  },
  activeInputContainer: {
    borderColor: appBlue,
    borderWidth: 1.5,
    backgroundColor: appWhite,
    shadowColor: appBlue,
    elevation: 6,
  },
  labelText: {
    color: appBlack,
    fontWeight: 'bold',
    fontSize: 18,
    paddingStart: 5,
  },
  errorMessage: {
    color: appRed,
  },
  errorTextInputContainer: {
    borderColor: appRed,
  },
  errorMessageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
});
