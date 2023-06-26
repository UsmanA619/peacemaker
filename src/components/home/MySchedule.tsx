import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useState} from 'react';
import {STYLES} from '../../styles/globalStyles';
import {COLORS} from '../../constants/colors';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/metrics';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../interface/types';

interface Challenge {
  id: string;
  content: string;
  color: string;
}

interface Props {
  schedule: Challenge[];
  title: string;
  titleColor?: string;
  isButton?: boolean;
  isSeeAll?: boolean;
}

type NavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'MyScheduleScreen'
>;

const MySchedule = ({
  schedule,
  title,
  titleColor,
  isButton,
  isSeeAll,
}: Props) => {
  const navigation = useNavigation<NavigationProp>();
  const [toggleCard, setToggleCard] = useState<boolean>(false);
  return (
    <View style={styles.scheduleContainer}>
      <View style={[styles.container, {borderBottomWidth: horizontalScale(1)}]}>
        <Text
          style={[
            STYLES.dev1__text15,
            {
              fontWeight: '100',
              fontFamily: 'Satoshi-Bold',
              color: titleColor ? titleColor : COLORS.mainGreen,
            },
          ]}>
          {title}
        </Text>
        <Text
          style={[
            STYLES.dev1__text13,
            {
              fontWeight: '500',
              color: COLORS.neutral300,
              fontFamily: 'GeneralSans-Medium',
            },
          ]}
          onPress={() => setToggleCard(!toggleCard)}>
          {isButton && toggleCard
            ? 'show'
            : isButton && !toggleCard
            ? 'hide'
            : ''}
        </Text>
      </View>
      <View
        style={{
          height: isButton && toggleCard ? 0 : isButton && !toggleCard && 190,
        }}>
        {schedule.map((challenge, index) => {
          console.log(index, schedule.length);
          return (
            <View
              style={[
                styles.container,
                {
                  borderBottomWidth:
                    !toggleCard && schedule.length - 1 != index
                      ? horizontalScale(1)
                      : horizontalScale(0),
                  paddingTop: verticalScale(20),
                  justifyContent: 'flex-start',
                  gap: 17,
                },
              ]}
              key={challenge.id}>
              <Icon
                name="hourglass-outline"
                size={20}
                color={challenge.color}
              />
              <Text
                style={[
                  STYLES.dev1__text13,
                  {
                    fontWeight: '400',
                    color: challenge.color,
                    fontFamily: 'GeneralSans-Medium',
                  },
                ]}>
                {challenge.content}
              </Text>
            </View>
          );
        })}
        {isSeeAll && (
          <TouchableOpacity
            onPress={() => navigation.navigate('MyScheduleScreen')}>
            <Text
              style={[
                STYLES.dev1__text13,
                {
                  color: COLORS.primary400,
                  paddingTop: verticalScale(20),
                  textAlign: 'center',
                  borderTopWidth: horizontalScale(1),
                  borderTopColor: toggleCard ? 'transparent' : '#EDEDED',
                  fontFamily: 'GeneralSans-Medium',
                },
              ]}>
              See all{' '}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default MySchedule;

const styles = StyleSheet.create({
  scheduleContainer: {
    marginTop: verticalScale(16),
    borderRadius: moderateScale(13),
    paddingVertical: verticalScale(18),
    paddingHorizontal: horizontalScale(10),
    backgroundColor: '#ffffff',
    elevation: 1,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: verticalScale(10),
    borderBottomColor: '#EDEDED',
    paddingHorizontal: horizontalScale(8),
  },
});
