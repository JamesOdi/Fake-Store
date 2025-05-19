import { StyleSheet, View } from 'react-native';
import useUser from '../hooks/useUser';
import { appRed, appWhite, borderColor } from '../lib/colors';
import Section from '../components/Section';
import Button from '../components/Button';
import { showErrorAlertDialog } from '../lib/api-request';
import EditProfileModal from '../components/EditProfileModal';
import { useState } from 'react';

export default function Profile({ navigation }) {
  const { user, logout } = useUser();

  const showSignoutDialog = () => {
    showErrorAlertDialog({
      title: 'Confirm Sign Out',
      message:
        'Are you sure you want to sign out? This will clear your session data.',
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Sign Out',
          onPress: () => {
            logout(navigation);
            return true;
          },
        },
      ],
    });
  };

  const [showEditProfileDialog, setShowEditProfileDialog] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        {user && (
          <>
            <Section title='Username' subtitle={user.name} />
            <Section title='Email' subtitle={user.email} />
          </>
        )}

        <View style={styles.actionButtonsContainer}>
          <Button
            label='Update'
            buttonStyle='outline'
            minWidth={undefined}
            onClick={() => setShowEditProfileDialog(true)}
          />
          <Button
            label='Sign Out'
            color={appRed}
            onClick={showSignoutDialog}
            minWidth={undefined}
          />
        </View>
      </View>
      <EditProfileModal
        currentUser={user}
        showModal={showEditProfileDialog}
        onDismissModal={() => setShowEditProfileDialog(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: appWhite,
  },
  detailsContainer: {
    borderWidth: 2,
    borderRadius: 25,
    borderColor: borderColor,
    padding: 15,
    gap: 20,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginTop: 20,
    flexGrow: 1,
  },
});
