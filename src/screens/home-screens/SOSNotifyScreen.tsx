import {StyleSheet, Text, View} from 'react-native';
import {STYLES} from '../../styles/globalStyles';
import ScreenTitle from '../../components/shared-components/ScreenTitle';
import {COLORS} from '../../constants/colors';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/metrics';
import LinearGradient from 'react-native-linear-gradient';
import {useAppSelector} from '../../redux/app/hooks';

const SOSNotifyScreen = () => {
  const user = useAppSelector((state: any) => state.user.data);

  const accountabilityNetwork = user.accountabilityBuddies.filter(
    (buddy: {isPrimary: boolean}) => buddy.isPrimary == true,
  );

  console.log(user.accountabilityBuddies);

  const fullName = user.firstName + ' ' + user.lastName;

  return (
    <View style={[STYLES.dev1__container, {alignItems: 'center'}]}>
      <Text
        style={[
          STYLES.dev1__text28,
          {
            color: COLORS.neutral900,
            alignItems: 'center',
            textAlign: 'center',
            fontFamily: 'Satoshi-Bold',
          },
        ]}>
        Select Accountability Network To Notify
      </Text>
      <LinearGradient
        colors={['#99C077', '#73A34B']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.circleContainer}>
        <Text
          style={[
            STYLES.dev1__text48,
            {color: '#ffffff', fontFamily: 'GeneralSans-Semibold'},
          ]}>
          SOS
        </Text>
        <Text
          style={[
            STYLES.dev1__text15,
            {
              color: '#B6E58E',
              fontWeight: '100',
              fontFamily: 'GeneralSans-Bold',
            },
          ]}>
          {fullName}
        </Text>
      </LinearGradient>
      <LinearGradient
        colors={['#2791B5', '#7BEAFC']}
        start={{x: 0.5, y: 0}}
        end={{x: 0.5, y: 1}}
        locations={[0, 1.4107]}
        angle={180}
        style={[
          styles.circleContainer,
          {borderColor: '#3CA7CA', marginTop: verticalScale(24)},
        ]}>
        <Text
          style={[
            STYLES.dev1__text48,
            {color: '#ffffff', fontFamily: 'GeneralSans-Semibold'},
          ]}>
          SOS
        </Text>
        <Text
          style={[
            STYLES.dev1__text15,
            {
              color: '#3CA7CA',
              fontWeight: '100',
              fontFamily: 'GeneralSans-Bold',
            },
          ]}>
          YOUR NETWORK
        </Text>
      </LinearGradient>
    </View>
  );
};

export default SOSNotifyScreen;

const styles = StyleSheet.create({
  circleContainer: {
    marginTop: verticalScale(28),
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 100,
    borderWidth: horizontalScale(10),
    borderColor: '#A4D17D',
  },
});
