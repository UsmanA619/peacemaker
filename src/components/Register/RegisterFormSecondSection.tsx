import {StyleSheet} from 'react-native';
import {View, Text, Image} from 'react-native';
import {verticalScale, moderateScale} from '../../utils/metrics';
import CustomButton from '../shared-components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import SocialIcons from '../shared-components/SocialIcons';
import {AuthStackParamList} from '../../interface/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ActivityIndicator} from 'react-native-paper';

interface Props {
  onSubmitForm: any;
  registerLoading: boolean;
}

type NavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'LoginScreen'
>;

function RegisterFormSecondSection({onSubmitForm, registerLoading}: Props) {
  const navigation = useNavigation<NavigationProp>();
  return (
    <View>
      <SocialIcons />
      <Text style={styles.termsText}>
        By signing in to you account, you are agree to our{' '}
        <Text style={styles.textLink}>Privacy & Policy</Text> and <Text></Text>
        <Text style={styles.textLink}>Terms & Conditions</Text>.
      </Text>

      <View>
        {registerLoading && (
          <ActivityIndicator style={{paddingTop: verticalScale(20)}} />
        )}
        <CustomButton
          onPress={onSubmitForm}
          extraStyles={{textAlign: 'center'}}
          isDisabled={registerLoading}>
          Create Account
        </CustomButton>
      </View>
      <Text style={styles.termsTextTwo}>
        Have an account?{' '}
        <Text
          style={styles.textLink}
          onPress={() => navigation.navigate('LoginScreen')}>
          Sign In
        </Text>
      </Text>
    </View>
  );
}

export default RegisterFormSecondSection;

const styles = StyleSheet.create({
  termsText: {
    textAlign: 'center',
    fontSize: moderateScale(13),
    fontWeight: '400',
    lineHeight: verticalScale(19),
    color: '#222222',
    fontFamily: 'GeneralSans-Regular'
  },
  termsTextTwo: {
    textAlign: 'center',
    fontSize: moderateScale(13),
    fontWeight: '600',
    lineHeight: verticalScale(19),
    paddingBottom: verticalScale(40),
    paddingVertical: verticalScale(20),
    color: '#265565',
    fontFamily: 'GeneralSans-Semibold'
  },

  textLink: {
    color: '#2791B5',
  },
});
