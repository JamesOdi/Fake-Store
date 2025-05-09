import { useDispatch, useSelector } from 'react-redux';
import { appBlue, appRed, appWhite } from '../lib/colors';
import Button from './Button';
import { Text, View } from 'react-native';

export default function SubmitAndValidateButton({
  label,
  icon,
  color = appBlue,
  iconColor = appWhite,
  disabled = false,
  minWidth = 150,
  buttonStyle = 'solid',
  selector,
  thunkApiFunction,
}) {
  const { isComponentLoading, error } = useSelector(selector);
  const dispatch = useDispatch();
  return (
    <View style={{ flexDirection: 'column', gap: 10, flexGrow: 1 }}>
      {error && (
        <View
          style={{
            backgroundColor: appRed,
            borderRadius: 5,
            paddingVertical: 8,
            paddingHorizontal: 15,
          }}
        >
          <Text style={{ color: appWhite, fontSize: 16 }}>
            {'\u25CF'} {error}
          </Text>
        </View>
      )}
      <Button
        isLoading={isComponentLoading}
        label={label}
        icon={icon}
        color={color}
        iconColor={iconColor}
        minWidth={minWidth}
        buttonStyle={buttonStyle}
        disabled={disabled}
        onClick={() => dispatch(thunkApiFunction())}
      />
    </View>
  );
}
