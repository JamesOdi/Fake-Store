import { Ionicons } from '@expo/vector-icons';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { appBlue, appWhite } from '../lib/colors';

export default function Button({
  label,
  icon,
  color = appBlue,
  onClick,
  iconColor = appWhite,
  disabled = false,
  minWidth = 150,
  buttonStyle = 'solid',
  isLoading = false,
}) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: buttonStyle === 'solid' ? color : appWhite,
          borderColor: buttonStyle === 'outline' ? color : undefined,
          borderWidth: buttonStyle === 'outline' ? 1 : 0,
        },
        { minWidth },
        { flexGrow: 1 },
        (isLoading || disabled) && { opacity: 0.6, elevation: 0 },
      ]}
      activeOpacity={0.4}
      disabled={disabled || isLoading}
      // if onClick is not passed, do not call it
      onPress={() => onClick && onClick()}
    >
      {isLoading ? (
        <ActivityIndicator
          color={buttonStyle == 'outline' ? color : appWhite}
        />
      ) : (
        <>
          {icon && <Ionicons name={icon} size={16} color={iconColor} />}
          <Text
            style={[
              { fontSize: 16 },
              { color: buttonStyle == 'outline' ? color : appWhite },
            ]}
          >
            {label}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    elevation: 4,
    gap: 10,
  },
});
