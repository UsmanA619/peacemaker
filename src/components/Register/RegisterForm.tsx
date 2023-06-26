import {Formik} from 'formik';
import {
  View,
  Image,
  TouchableWithoutFeedback,
  PermissionsAndroid,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {verticalScale, horizontalScale} from '../../utils/metrics';
import CustomDivider from '../shared-components/CustomDivider';
import CustomInput from '../shared-components/CustomInput';
import {ApiService} from '../../utils/ApiService';
import {useNavigation, useRoute} from '@react-navigation/native';
import {AuthStackParamList} from '../../interface/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import RegisterFormSecondSection from './RegisterFormSecondSection';
import {signupSchema} from '../../validations';
import {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {format} from 'date-fns';

import Geocoder from 'react-native-geocoding';
import MapScreen from '../../screens/auth-screens/MapScreen';
import {COLORS} from '../../constants/colors';
import {
  setAccessToken,
  setAuthenticated,
  setRefreshToken,
  setUserData,
} from '../../redux/features/user/userSlice';
import {useAppDispatch} from '../../redux/app/hooks';
import {TouchableOpacity} from 'react-native-gesture-handler';

type NavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'AccountabilityBuddies',
  'MapScreen'
>;
interface Props {
  userLocation: any;
}

interface FormValues {
  firstName: string;
  lastName: string;
  DOB: string;
  height?: number;
  weight?: number;
  location: string;
  email: string;
  password: string;
  refreshToken: string;
  // delegateAccountability: object;
  // accountabilityBuddies: string[];
}

function RegisterForm({userLocation}: Props) {
  const navigation = useNavigation<NavigationProp>();

  const [registerLoading, setRegisterLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const initialValues: FormValues = {
    firstName: '',
    lastName: '',
    DOB: '',
    height: undefined,
    weight: undefined,
    location: '',
    email: '',
    password: '',
    refreshToken: "refresh-token"
    // delegateAccountability: {
    //   partner: '6468ae0dd33a1bfe787975d0',
    //   relationship: 'friend',
    // },
    // accountabilityBuddies: [
    //   '6468ae0dd33a1bfe787975d0',
    //   '6468ae0dd33a1bfe787975d0',
    //   '6468ae0dd33a1bfe787975d0',
    // ],
  };

  const handleSubmit = async (values: FormValues) => {

    setRegisterLoading(true);
    values.email = values.email.toLowerCase();
    values.height = Number(values.height);
    values.weight = Number(values.weight);
    try {
      const register = new ApiService('users/signup', "");
      const response = await register.unsecuredPost(values);
      console.log(response?.status);

      if (response?.status == 201) {
        dispatch(setUserData(response?.result));
        dispatch(setAuthenticated(true));
        dispatch(setAccessToken(response?.tokens.accessToken));
        dispatch(setRefreshToken(response?.tokens.refreshToken));
        Toast.show({
          type: 'success',
          text1: 'Successfully Registered!',
          text2: 'Your Account Has Been Created. Login To Your Account.',
        });
        navigation.navigate('AccountabilityBuddies');
      } else if (response?.status == 409) {
        Toast.show({type: 'info', text1: 'User Already Registered!'});
      } else {
        Toast.show({
          type: 'error',
          text1: 'Server Error!',
          text2: 'Please Try Again Later.',
        });
      }
    } catch (error) {
      console.log(error);
      Toast.show({type: 'error', text1: 'Server Error!'});
    }
    setRegisterLoading(false);
  };

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    console.log('hide');
    setDatePickerVisible(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signupSchema}
      onSubmit={handleSubmit}>
      {({
        handleChange,
        submitForm,
        setFieldValue,
        values,
        errors,
        touched,
        initialTouched,
        isSubmitting,
      }) => (
        <View style={{gap: 8}}>
          <CustomInput
            placeholder="First Name"
            label="First Name"
            value={values.firstName}
            error={errors.firstName}
            touched={touched.firstName}
            initialTouched={true}
            onChange={handleChange('firstName')}
            isSubmitted={isSubmitting}
            isCancel={true}
          />
          <CustomInput
            placeholder="Last Name"
            label="Last Name"
            value={values.lastName}
            error={errors.lastName}
            touched={touched.lastName}
            initialTouched={true}
            onChange={handleChange('lastName')}
            isSubmitted={isSubmitting}
            isCancel={true}
          />
          <TouchableWithoutFeedback onPress={showDatePicker}>
            <View style={{position: 'relative'}}>
              <CustomInput
                placeholder="Date of Birth"
                label="Date of Birth (DD-MM-YYYY)"
                value={values.DOB}
                error={errors.DOB}
                touched={touched.DOB}
                initialTouched={true}
                onChange={handleChange('DOB')}
                editable={true}
                isSubmitted={isSubmitting}
              />
              <Icon
                name="calendar-outline"
                size={23}
                color={COLORS.neutral900}
                style={{
                  position: 'absolute',
                  right: horizontalScale(18),
                  top: verticalScale(18),
                }}
              />
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={(e: any) => {
                  const formattedDate = format(e, 'dd-MM-yyyy');
                  setFieldValue('DOB', formattedDate);
                  hideDatePicker();
                }}
                onCancel={hideDatePicker}
              />
            </View>
          </TouchableWithoutFeedback>

          <View style={{position: 'relative'}}>
            <CustomInput
              placeholder="Location"
              label="Location"
              value={values.location}
              error={errors.location}
              touched={touched.location}
              initialTouched={true}
              onChange={handleChange('location')}
              isSubmitted={isSubmitting}
            />
            <TouchableWithoutFeedback
              onPress={() =>
                navigation.navigate('MapScreen', {setFieldValue: setFieldValue})
              }>
              <Image
                source={require('../../../assets/icons/location.png')}
                alt="icon"
                style={{
                  position: 'absolute',
                  right: horizontalScale(18),
                  top: verticalScale(20),
                }}
              />
            </TouchableWithoutFeedback>
          </View>

          <View style={{flexDirection: 'row', gap: 8}}>
            <View style={{flex: 1}}>
              <CustomInput
                placeholder="Height(cm)"
                label="Height (cm)"
                keyboardType="numeric"
                value={values.height}
                error={errors.height}
                touched={touched.height}
                initialTouched={true}
                onChange={handleChange('height')}
                isSubmitted={isSubmitting}
                isCancel={true}
              />
            </View>
            <View style={{flex: 1}}>
              <CustomInput
                placeholder="Weight(lbs)"
                label="Weight (lbs)"
                keyboardType="numeric"
                value={values.weight}
                error={errors.weight}
                touched={touched.weight}
                initialTouched={true}
                onChange={handleChange('weight')}
                isSubmitted={isSubmitting}
                isCancel={true}
              />
            </View>
          </View>
          <CustomInput
            placeholder="Email"
            label="Email"
            value={values.email}
            error={errors.email}
            touched={touched.email}
            keyboardType="email-address"
            autoCapitalize="none"
            initialTouched={true}
            onChange={handleChange('email')}
            isSubmitted={isSubmitting}
            isCancel={true}
          />
          <CustomInput
            placeholder="Password"
            label="Password"
            isIcon={true}
            value={values.password}
            error={errors.password}
            touched={touched.password}
            initialTouched={true}
            onChange={handleChange('password')}
            isSubmitted={isSubmitting}
          />

          <CustomDivider
            text="or create using"
            extraStyles={{paddingTop: verticalScale(24)}}
          />
          <RegisterFormSecondSection
            registerLoading={registerLoading}
            onSubmitForm={submitForm}
          />
        </View>
      )}
    </Formik>
  );
}

export default RegisterForm;
