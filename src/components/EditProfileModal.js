import { Modal, StyleSheet, Text, View } from 'react-native';
import useUser from '../hooks/useUser';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import ViewWithKeyboardInput from './ViewWithKeyboardInput';
import MyInput from './MyInput';
import { Feather } from '@expo/vector-icons';
import SubmitAndValidateButton from './SubmitAndValidateButton';
import Button from './Button';
import { appGreen, appWhite, subtitleColor } from '../lib/colors';
import { getUser, updateUserProfile } from '../store/profile';

export default function EditProfileModal({
  currentUser,
  showModal = false,
  onDismissModal,
}) {
  const { updateUser } = useUser();
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
      setSuccessMessage('Your profile has been updated successfully');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }
  }, [updatedUser]);

  return (
    <Modal transparent={true} visible={showModal} animationType='fade'>
      <ViewWithKeyboardInput
        backgroundColor='rgba(0,0,0,0.5)'
        onClickOutsideChildren={() => onDismissModal()}
      >
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
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}
            >
              <Feather name='check-circle' size={20} color={appGreen} />
              <Text style={{ color: appGreen }}>{successMessage}</Text>
            </View>
          )}
          <View style={styles.actionButtonsContainer}>
            <SubmitAndValidateButton
              selector={getUser}
              label='Confirm'
              thunkApiFunction={() => updateUserProfile(form)}
            />
            <Button
              label='Cancel'
              buttonStyle='outline'
              onClick={() => onDismissModal()}
            />
          </View>
        </View>
      </ViewWithKeyboardInput>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    backgroundColor: appWhite,
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 30,
    width: '90%',
    margin: 'auto',
    borderRadius: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
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
