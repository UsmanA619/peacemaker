import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView
} from 'react-native';
import CustomInput from '../../../components/shared-components/CustomInput';
import CustomButton from '../../../components/shared-components/CustomButton';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../utils/metrics';
import {Formik} from 'formik';
// import {newPasswordSchema} from '../../../validations';
import {BlurView} from '@react-native-community/blur';
import {STYLES} from '../../../styles/globalStyles';
import {COLORS} from '../../../constants/colors';
import * as Yup from 'yup';

const newPasswordSchema = Yup.object().shape({
  oldPassword: Yup.string().required('Old Password is required'),
  newPassword: Yup.string()
    .min(8, 'New password must be at least 8 characters')
    .required('New Password is required'),
  confirmPassword: Yup.string()
    .min(8, 'Confirm password must be at least 8 characters')
    .required('Confirm Password is required')
    .oneOf([Yup.ref('newPassword')], 'Password not the same with new password'),
});

interface FormValues {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function AccountSettings() {
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const initialValues: FormValues = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  let timeoutInterval: number;

  const handleNewPassword = (values: FormValues) => {
    setShowPopup(true);
    timeoutInterval = setTimeout(() => {
      setShowPopup(false);
    }, 1000);
  };
  return (
    <View style={{flex: 1, backgroundColor: '#F9FAFA', paddingHorizontal: 16}}>
      <Text
        style={{
          fontSize: 14,
          fontWeight: '400',
          color: '#576B74',
          letterSpacing: -0.5,
          marginTop: 5,
        }}>
        Make a new password that’s different with your old password.
      </Text>
      <View style={{marginTop: 37, width: '100%', flex: 1}}>
        <Formik
          initialValues={initialValues}
          validationSchema={newPasswordSchema}
          onSubmit={handleNewPassword}
          validateOnChange={false}
          validateOnBlur={true}>
          {({handleChange, submitForm, values, errors, touched}) => (
            <>
              <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
                <CustomInput
                  label="Old Password"
                  placeholder="Old Password"
                  value={values.oldPassword}
                  isIcon={true}
                  onChange={handleChange('oldPassword')}
                  touched={touched.oldPassword}
                  error={errors.oldPassword}
                  initialTouched={true}
                />
                <CustomInput
                  label="Create New Password"
                  placeholder="Create New Password"
                  value={values.newPassword}
                  isIcon={true}
                  onChange={handleChange('newPassword')}
                  touched={touched.newPassword}
                  error={errors.newPassword}
                  initialTouched={true}
                />
                <CustomInput
                  label="Confirm New Password"
                  placeholder="Confirm New Password"
                  value={values.confirmPassword}
                  isIcon={true}
                  onChange={handleChange('confirmPassword')}
                  touched={touched.confirmPassword}
                  error={errors.confirmPassword}
                  initialTouched={true}
                />
              </ScrollView>
              <CustomButton
                extraStyles={{marginTop: 10, marginBottom: 32}}
                onPress={submitForm}>
                Create New Password
              </CustomButton>
            </>
          )}
        </Formik>
      </View>
      {showPopup && (
        <BlurView
          style={styles.absolute}
          blurType="light"
          blurAmount={1}
          reducedTransparencyFallbackColor="white"
        />
      )}
      <Modal
        visible={showPopup}
        transparent
        statusBarTranslucent
        animationType="fade"
        onRequestClose={() => {
          clearInterval(timeoutInterval);
          setShowPopup(false);
        }}>
        <TouchableWithoutFeedback onPress={() => setShowPopup(false)}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback
              onPress={() => console.log('Inner view pressed')}>
              <View style={styles.modalInnerContainer}>
                <Image
                  source={require('../../../../assets/images/passchange.png')}
                  alt="img"
                />
                <Text
                  style={[
                    STYLES.dev1__text18,
                    {
                      color: COLORS.primary500,
                      textAlign: 'center',
                      marginTop: verticalScale(24),
                    },
                  ]}>
                  {' '}
                  Password has been successfully changed!
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalInnerContainer: {
    marginHorizontal: horizontalScale(16),
    position: 'absolute',
    bottom: verticalScale(55),
    backgroundColor: '#ffffff',
    width: horizontalScale(343),
    height: verticalScale(210),
    borderRadius: moderateScale(16),
    padding: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
