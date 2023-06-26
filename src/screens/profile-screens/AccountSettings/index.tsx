import React, {useState} from 'react';
import {View, Text, Keyboard, ScrollView} from 'react-native';
import ProfileImg from '../../../components/profile/ProfileImg';
import CustomInput from '../../../components/shared-components/CustomInput';
import CustomButton from '../../../components/shared-components/CustomButton';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-root-toast';
import {useAppSelector} from '../../../redux/app/hooks';
import {COLORS} from '../../../constants/colors';

export default function AccountSettings() {
  const user = useAppSelector((state: any) => state.user.data);
  let dateOfBirth = new Date(user.DOB);
  let formattedDate = dateOfBirth.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });

  const [fName, setFName] = useState(user.firstName || '');
  const [lName, setLName] = useState(user.lastName || '');
  const [dob, setDOB] = useState(formattedDate);
  const [email, setEmail] = useState('');

  const successToast = () => {
    return (
      <View
        style={{
          paddingVertical: 8,
          paddingHorizontal: 20,
          backgroundColor: 'white',
          borderRadius: 8,
          flexDirection: 'row',
          opacity: 1,
          elevation: 1,
          alignItems: 'center',
        }}>
        <Icon name="ios-checkmark-circle-outline" size={23} color="#8EB26F" />
        <Text
          style={{
            color: '#576B74',
            fontSize: 15,
            fontWeight: '500',
            marginLeft: 12,
          }}>
          Account details saved changes
        </Text>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#F9FAFA', paddingHorizontal: 16}}>
      <View style={{alignItems: 'center', marginTop: 5}}>
        <ProfileImg size={80} txtSize={32} smallBoxSize={28} iconSize={11} />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginTop: 37, width: '100%', flex: 1}}>
        <CustomInput
          inActiveColor={
            fName === user.firstName ? '#94A5AB' : COLORS.neutral900
          }
          showLabelOnFocus
          label={'First name'}
          placeholder="First name"
          value={fName}
          error={''}
          touched={true}
          initialTouched={false}
          autoCapitalize="none"
          keyboardType="default"
          onChange={setFName}
          isCancel={true}
        />
        <CustomInput
          inActiveColor={
            lName === user.lastName ? '#94A5AB' : COLORS.neutral900
          }
          showLabelOnFocus
          label={'Last Name'}
          placeholder="Last name"
          value={lName}
          error={''}
          touched={true}
          initialTouched={false}
          autoCapitalize="none"
          keyboardType="default"
          onChange={setLName}
          isCancel={true}
        />
        <CustomInput
          inActiveColor={dob === formattedDate ? '#94A5AB' : COLORS.neutral900}
          showLabelOnFocus
          label={'DOB'}
          placeholder="11/02/1990"
          value={dob}
          error={''}
          touched={true}
          initialTouched={false}
          autoCapitalize="none"
          keyboardType="default"
          onChange={setDOB}
          isCancel={true}
        />
        <CustomInput
          disabled
          editable={false}
          label=""
          placeholder={user.email}
          value={email}
          error={''}
          touched={true}
          initialTouched={true}
          autoCapitalize="none"
          keyboardType="email-address"
          onChange={setEmail}
          isCancel={true}
        />
      </ScrollView>

      <CustomButton
        extraStyles={{marginTop: 0, marginBottom: 20, marginTop: 10}}
        onPress={() => {
          Toast.show(successToast(), {
            duration: 2000,
            position: Toast.positions.TOP,
            shadow: false,
            animation: false,
            hideOnPress: true,
            delay: 0,
            opacity: 1,
            backgroundColor: 'transparent',
          });
        }}>
        Save Changes
      </CustomButton>
    </View>
  );
}
