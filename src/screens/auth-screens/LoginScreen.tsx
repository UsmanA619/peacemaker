import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import {STYLES} from '../../styles/globalStyles';
import {COLORS} from '../../constants/colors';
import CustomInput from '../../components/shared-components/CustomInput';
import CustomButton from '../../components/shared-components/CustomButton';
import CustomDivider from '../../components/shared-components/CustomDivider';
import {horizontalScale, verticalScale} from '../../utils/metrics';
import SocialIcons from '../../components/shared-components/SocialIcons';
import {useState} from 'react';
import {ApiService} from '../../utils/ApiService';
import {Formik} from 'formik';
import Toast from  'react-native-toast-message';
import {storeUserData} from '../../utils/helpers';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../interface/types';
import {useNavigation} from '@react-navigation/native';
import {loginSchema} from '../../validations';
import {ActivityIndicator} from 'react-native-paper';
import {useAppDispatch, useAppSelector} from '../../redux/app/hooks';
import {
  setAccessToken,
  setAuthenticated,
  setRefreshToken,
  setUserData,
} from '../../redux/features/user/userSlice';

type NavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'AccountabilityBuddies',
  'Home'
>;

interface FormValues {
  email: string;
  password: string;
}

const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [loginLoading, setLoginLoading] = useState<boolean>(false);
  const accessToken = useAppSelector(state => state.user.tokens.accessToken);
  const dispatch = useAppDispatch();

  const initialValues: FormValues = {
    email: '',
    password: '',
  };

  const handleSubmit = async (values: FormValues) => {
    setLoginLoading(true);

    // setting email to lowercase
    values.email = values.email.toLowerCase();

    try {
      const login = new ApiService('users/login', accessToken);
      const loginRes = await login.unsecuredPost(values);
      console.log("🚀 ~ file: LoginScreen.tsx:58 ~ handleSubmit ~ loginRes:", loginRes)
      
      if (loginRes?.status == 200) {
        // storing user data after successfull login
        
        dispatch(setUserData(loginRes?.user));
        dispatch(setAuthenticated(true));
        // dispatch(setAccessToken(loginRes?.data.tokens.accessToken));
        // dispatch(setRefreshToken(loginRes?.data.tokens.refreshToken));
        dispatch(setAccessToken(loginRes?.tokens.accessToken));
        dispatch(setRefreshToken(loginRes?.tokens.refreshToken));

        // storeUserData(loginRes?.data);
        navigation.navigate('DashboardScreen');

        Toast.show({
          type: 'success',
          text1: 'Successfully Logged-In!',
        });
        // navigation.navigate('DashboardScreen');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Login Un-Successful!',
          text2: 'Email or Password is incorrect.',
        });
      }
    } catch (error) {
      console.log(
        '🚀 ~ file: LoginScreen.tsx:82 ~ handleSubmit ~ error:',
        error,
      );
      Toast.show({type: 'error', text1: 'Unable To Login!'});
    }
    setLoginLoading(false);
  };

  return (
    <ScrollView
      contentContainerStyle={[
        {
          paddingHorizontal: horizontalScale(16),
          paddingVertical: verticalScale(10),
          backgroundColor: '#F9FAFA',
          paddingBottom: verticalScale(50),
          paddingTop: verticalScale(30),
        },
      ]}
      keyboardShouldPersistTaps="always">
      <View style={{alignItems: 'center'}}>
        <View
          style={{
            flex: 1,
            alignSelf: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={require('../../../assets/images/logo.png')}
            alt="logo"
            style={
              {
                // width: horizontalScale(194),
                // height: verticalScale(196),
              }
            }
          />
        </View>
        <Text
          style={[
            STYLES.dev1__text28,
            {color: COLORS.blue, paddingTop: 23.5, fontFamily: 'Satoshi-Bold'},
          ]}>
          Welcome Back!
        </Text>
      </View>
      <View style={{flex: 1}}>
        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}>
          {({
            handleChange,
            handleSubmit,
            handleBlur,
            submitForm,
            values,
            errors,
            touched,
            initialTouched,
          }) => (
            <>
              <View style={styles.formContainer}>
                <CustomInput
                  label="Email"
                  placeholder="Email"
                  value={values.email}
                  error={errors.email}
                  touched={touched.email}
                  initialTouched={true}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  onChange={handleChange('email')}
                  isCancel={true}
                />
                <CustomInput
                  label="Password"
                  placeholder="Password"
                  value={values.password}
                  error={errors.password}
                  touched={touched.password}
                  initialTouched={true}
                  onChange={handleChange('password')}
                  isIcon={true}
                />
              </View>
              <View>
                <Text
                  style={[
                    STYLES.dev1__text13,
                    {
                      color: COLORS.primary600,
                      textAlign: 'right',
                      paddingTop: verticalScale(8),
                      fontFamily: 'GeneralSans-Semibold',
                      position: 'absolute',
                      right: horizontalScale(0),
                      bottom: verticalScale(0),
                    },
                  ]}
                  onPress={() => navigation.navigate('ForgetPassword')}>
                  Forgot Password
                </Text>
              </View>

              <CustomDivider
                text="or sign in using"
                extraStyles={{paddingTop: verticalScale(46)}}
              />
              <SocialIcons
                extraStyles={{
                  paddingVertical: verticalScale(0),
                  paddingTop: verticalScale(28),
                }}
              />

              {loginLoading && (
                <ActivityIndicator style={{paddingTop: verticalScale(20)}} />
              )}
              <CustomButton
                extraStyles={{marginTop: verticalScale(32)}}
                onPress={handleSubmit}
                isDisabled={loginLoading}>
                Sign in
              </CustomButton>

              <Text
                style={[
                  STYLES.dev1__text13,
                  {
                    color: COLORS.primary600,
                    textAlign: 'center',
                    marginTop: verticalScale(31),
                    fontFamily: 'GeneralSans-Semibold',
                  },
                ]}>
                Don’t have an account?{' '}
                <Text
                  style={{
                    color: COLORS.primary400,
                    fontFamily: 'GeneralSans-Semibold',
                  }}
                  onPress={() => navigation.navigate('RegisterScreen')}>
                  Sign Up
                </Text>
              </Text>
            </>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    gap: 8,
    paddingTop: verticalScale(23.5),
  },
});
