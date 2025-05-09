import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { appBlue, appWhite, subtitleColor } from '../lib/colors';
import MyInput from '../components/MyInput';
import ViewWithKeyboardInput from '../components/ViewWithKeyboardInput';
import DividerWithText from '../components/DividerWithText';
import { useEffect, useState } from 'react';
import { AuthenticationForm } from '../lib/forms';
import { getUser, signInUser, signUpUser } from '../store/profile';
import SubmitAndValidateButton from '../components/SubmitAndValidateButton';
import useUser from '../hooks/useUser';
import { useSelector } from 'react-redux';

export default function Authentication({ navigation }) {
  const FORM_CONFIG = {
    signIn: {
      isSignInMode: true,
      title: 'Sign In',
      subtitle: 'Please login to continue to your account',
      inputFields: [
        {
          name: 'email',
          label: 'Email',
          placeholder: 'Enter your email address',
          inputMode: 'email',
        },
        {
          name: 'password',
          label: 'Password',
          placeholder: 'Enter your password',
          secureTextEntry: true,
        },
      ],
      footerPrompt: 'Need an account?',
      footerLinkText: 'Create one',
    },
    signUp: {
      isSignInMode: false,
      title: 'Sign Up',
      subtitle: 'Create a new account to begin',
      inputFields: [
        {
          name: 'name',
          label: 'Username',
          placeholder: 'Enter your username',
        },
        {
          name: 'email',
          label: 'Email',
          placeholder: 'Enter your email address',
          inputMode: 'email',
        },
        {
          name: 'password',
          label: 'Password',
          placeholder: 'Enter your password',
          secureTextEntry: true,
        },
      ],
      footerPrompt: 'Already have an account?',
      footerLinkText: 'Login',
    },
  };

  const { user } = useSelector(getUser);
  const { login } = useUser();

  const [form, setForm] = useState(new AuthenticationForm());

  const updateForm = (name, text) => {
    setForm({ ...form, [name]: text, [`${name}Error`]: '' });
  };

  const [pageConfig, setPageConfig] = useState(FORM_CONFIG.signIn);

  const toggleAuthMode = () => {
    setPageConfig(
      pageConfig.isSignInMode ? FORM_CONFIG.signUp : FORM_CONFIG.signIn
    );
  };

  const clearForm = () => {
    setForm(new AuthenticationForm());
  };

  useEffect(() => {
    if (user) {
      login(user, navigation);
    }
  }, [user]);

  return (
    <ViewWithKeyboardInput>
      <View style={styles.container}>
        <View style={{ marginBottom: 30 }}>
          <Text style={styles.title}>{pageConfig.title}</Text>
          <Text style={styles.subtitle}>{pageConfig.subtitle}</Text>
        </View>

        {pageConfig.inputFields.map(
          ({ name, label, placeholder, secureTextEntry, inputMode }) => {
            return (
              <MyInput
                key={label}
                label={label}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                inputMode={inputMode}
                defaultValue={form[name]}
                onChangeText={(value) => updateForm(name, value)}
              />
            );
          }
        )}

        <TouchableOpacity
          style={[{ marginLeft: 'auto', marginRight: 5 }]}
          activeOpacity={0.6}
          onPress={() => clearForm()}
        >
          <Text style={styles.footerLinkText}>Clear</Text>
          <View style={styles.footerLinkTextBorder} />
        </TouchableOpacity>

        <View style={{ marginVertical: 10 }}>
          <SubmitAndValidateButton
            selector={getUser}
            label={pageConfig.title}
            thunkApiFunction={() =>
              pageConfig.isSignInMode ? signInUser(form) : signUpUser(form)
            }
          />
        </View>

        <DividerWithText text='or' />

        <View style={styles.footerContainer}>
          <Text style={styles.footerPrompt}>{pageConfig.footerPrompt}</Text>
          <TouchableOpacity
            style={styles.footerLinkTextContainer}
            activeOpacity={0.6}
            onPress={() => toggleAuthMode()}
          >
            <Text style={styles.footerLinkText}>
              {pageConfig.footerLinkText}
            </Text>
            <View style={styles.footerLinkTextBorder} />
          </TouchableOpacity>
        </View>
      </View>
    </ViewWithKeyboardInput>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerLinkTextContainer: {
    flexDirection: 'column',
    padding: 5,
  },
  footerPrompt: {
    fontSize: 18,
    paddingVertical: 5,
  },
  footerLinkText: {
    color: appBlue,
    fontSize: 18,
  },
  footerLinkTextBorder: {
    height: 1,
    backgroundColor: appBlue,
  },
});
