import { StyleSheet, Text, View } from 'react-native';
import ViewWithKeyboardInput from '../components/ViewWithKeyboardInput';
import useUser from '../hooks/useUser';
import { appGreen, subtitleColor } from '../lib/colors';
import { useEffect, useState } from 'react';
import MyInput from '../components/MyInput';
import SubmitAndValidateButton from '../components/SubmitAndValidateButton';
import { getUser, updateUserProfile } from '../store/profile';
import Button from '../components/Button';
import { useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';

export default function EditProfile({ navigation }) {
  const { user: currentUser, updateUser } = useUser();
  const { user: updatedUser } = useSelector(getUser);

  const [form, setForm] = useState(currentUser);

  const FORM_CONFIG = {
    title: 'Update Profile',
    subtitle: 'Update your profile name and password',
    inputFields: [
      {
        name: 'name',
        label: 'New username',
        placeholder: 'Enter your new username',
      },
      {
        name: 'password',
        label: 'New password',
        placeholder: 'Enter your new password',
        secureTextEntry: true,
      },
    ],
  };

  const [formUpdated, setFormUpdated] = useState(false);

  const updateForm = (name, text) => {
    setForm({ ...form, [name]: text, [`${name}Error`]: '' });
    setFormUpdated(true);
  };

  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (updatedUser && formUpdated) {
      updateUser({ name: updatedUser.name });
      setSuccessMessage(updatedUser.message);
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }
  }, [updatedUser]);

  return (
    <ViewWithKeyboardInput>
      <View style={styles.container}>
        <View style={{ marginBottom: 30 }}>
          <Text style={styles.title}>{FORM_CONFIG.title}</Text>
          <Text style={styles.subtitle}>{FORM_CONFIG.subtitle}</Text>
        </View>

        {FORM_CONFIG.inputFields.map(
          ({ name, label, placeholder, secureTextEntry }) => {
            return (
              <MyInput
                key={label}
                label={label}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                defaultValue={form[name]}
                onChangeText={(value) => updateForm(name, value)}
              />
            );
          }
        )}
        {successMessage && (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Feather name='check-circle' size={20} color={appGreen} />
            <Text style={{ color: appGreen }}>{successMessage}</Text>
          </View>
        )}
        <View style={styles.actionButtonsContainer}>
          <SubmitAndValidateButton
            selector={getUser}
            label='Update'
            thunkApiFunction={() => updateUserProfile(form)}
          />
          <Button
            label='Cancel'
            buttonStyle='outline'
            onClick={() => navigation.goBack()}
          />
        </View>
      </View>
    </ViewWithKeyboardInput>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '10%',
    gap: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 50,
  },
  subtitle: {
    fontSize: 18,
    color: subtitleColor,
  },
  actionButtonsContainer: {
    gap: 10,
    marginTop: 20,
  },
});
