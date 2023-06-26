import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {STYLES} from '../../styles/globalStyles';
import StateCard from '../../components/daily-state/StateCard';
import {COLORS} from '../../constants/colors';
import HorizontalMeter from '../../components/daily-state/HorizontalMeter';
import {verticalScale} from '../../utils/metrics';
import CustomRoundCard from '../../components/home/CustomRoundCard';
import CustomButton from '../../components/shared-components/CustomButton';

const StateDetailsScreen = ({route}: any) => {
  return (
    <ScrollView>
      <View
        style={[
          STYLES.dev1__homeContainer,
          {alignItems: 'center', justifyContent: 'space-between'},
        ]}>
        <View>
          <StateCard
            name={route.params?.name}
            bgColor={route.params?.bgColor}
            imageurl={route?.params?.imageurl}
          />
        </View>
        <HorizontalMeter />
        <View
          style={{
            borderTopColor: COLORS.inActive,
            borderTopWidth: 1,
            width: '100%',
          }}>
          <Text
            style={[
              STYLES.dev1__text18,
              {
                fontFamily: 'GeneralSans-Medium',
                color: COLORS.neutral900,
                paddingTop: verticalScale(30),
              },
            ]}>
            Activities
          </Text>

          <View style={{flexDirection: 'row', gap: 12}}>
            <CustomRoundCard
              content="Daily Challenges"
              imageUrl={require('../../../assets/images/challenge.png')}
              backgroundColor="#6B9EA6"
              extraStyles={{flex: 0}}
            />
            <CustomRoundCard
              content="Journal"
              imageUrl={require('../../../assets/images/journal.png')}
              backgroundColor="#559177"
              extraStyles={{flex: 0}}
            />
          </View>
        </View>

        <View style={{width: '100%'}}>
          <CustomButton>Update</CustomButton>
        </View>
      </View>
    </ScrollView>
  );
};

export default StateDetailsScreen;
