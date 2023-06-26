import React from 'react';
import {Image, Text, View, StyleSheet} from 'react-native';
import {COLORS} from '../../constants/colors';
import {STYLES} from '../../styles/globalStyles';
import CustomButton from '../../components/shared-components/CustomButton';
import {horizontalScale, verticalScale} from '../../utils/metrics';
import FastImage from 'react-native-fast-image';

interface Props {
  navigation: any;
}

const CompleteProfileScreen = ({navigation}: Props) => {
  return (
    <View style={[STYLES.dev1__container, {justifyContent: 'space-between'}]}>
      <View>
        <Text
          style={[
            STYLES.dev1__text28,
            {
              color: COLORS.neutral900,
              textAlign: 'center',
              fontFamily: 'GeneralSans-Semibold',
            },
          ]}>
          Profile Completed!
        </Text>
        <Text
          style={[
            STYLES.dev1__text13,
            {
              color: COLORS.neutral700,
              fontWeight: '500',
              marginTop: verticalScale(8),
              textAlign: 'center',
            },
          ]}>
          You’ve successfully completed your onboarding process, See you inside!
        </Text>
      </View>
      <View style={{flex: 1, alignSelf: 'center', justifyContent: 'center'}}>
        <Image source={require('../../../assets/images/amico.png')} alt="img" />
      </View>
      <View>
        <CustomButton
          onPress={() => {
            navigation.navigate('LoadingScreen');
          }}>
          Done
        </CustomButton>
      </View>
    </View>
  );
};

export default CompleteProfileScreen;
const styles = StyleSheet.create({
  image: {
    width: horizontalScale(313),
    height: verticalScale(345),
  },
});
