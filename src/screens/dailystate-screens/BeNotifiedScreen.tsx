import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {STYLES} from '../../styles/globalStyles';
import {COLORS} from '../../constants/colors';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/metrics';
import NotifyCard from '../../components/daily-state/NotifyCard';
import ManualSetCard from '../../components/daily-state/ManualSetCard';

const BeNotifiedScreen = () => {
  const [switchValue1, setSwitchValue1] = useState<boolean>(false);
  const [switchValue2, setSwitchValue2] = useState<boolean>(false);

  const [switchValue3, setSwitchValue3] = useState<boolean>(false);

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#F6F7F7'}}>
      <View
        style={[
          STYLES.dev1__homeContainer,
          {borderTopWidth: 1, borderTopColor: COLORS.inActive},
        ]}>
        <Text
          style={[
            STYLES.dev1__text28,
            {fontFamily: 'Satoshi-Black', color: COLORS.neutral900},
          ]}>
          Be Notified
        </Text>
        <View style={{paddingTop: verticalScale(19)}}>
          <Text
            style={[
              STYLES.dev1__text16,
              {
                color: COLORS.neutral900,
                opacity: 0.5,
                fontFamily: 'Satoshi-Medium',
              },
            ]}>
            Default
          </Text>
          <View style={styles.notifyContainer}>
            <NotifyCard
              switchValue={switchValue1}
              setSwitchValue={setSwitchValue1}
              content="7:00 AM"
              iconName="alarm-outline"
            />
            <NotifyCard
              switchValue={switchValue2}
              setSwitchValue={setSwitchValue2}
              content="12:00 AM"
              iconName="alarm-outline"
            />
            <NotifyCard
              switchValue={switchValue3}
              setSwitchValue={setSwitchValue3}
              content="8:00 AM"
              iconName="alarm-outline"
              extraStyles={{borderBottomWidth: 0}}
            />
          </View>
          <View style={{paddingTop: verticalScale(19)}}>
            <Text
              style={[
                STYLES.dev1__text16,
                {
                  color: COLORS.neutral900,
                  opacity: 0.5,
                  fontFamily: 'Satoshi-Medium',
                },
              ]}>
              Set Manually
            </Text>
            <ManualSetCard />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default BeNotifiedScreen;

const styles = StyleSheet.create({
  notifyContainer: {
    marginTop: verticalScale(15),
    width: horizontalScale(343),
    borderRadius: moderateScale(15),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    elevation: 1,
  },
});
