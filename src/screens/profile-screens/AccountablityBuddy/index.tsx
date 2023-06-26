import React from 'react';
import {Image, Text, View, StyleSheet, ScrollView} from 'react-native';
import ToggleSwitch from '../../../components/profile/IOSToggle';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../utils/metrics';
import DailyState from '../../../components/home/DailyState';
import CustomButton from '../../../components/shared-components/CustomButton';
import Navigation from '../../../utils/appNavigation';

export default function AccountablityBuddy() {
  const [switchValue, setSwitchValue] = React.useState(true);
  const [switchValue1, setSwitchValue1] = React.useState(false);
  const [switchValue2, setSwitchValue2] = React.useState(false);
  return (
    <ScrollView style={{flex: 1, backgroundColor: '#F9FAFA'}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 20,
        }}>
        <Image
          style={{width: 47, height: 47, borderRadius: 50}}
          source={{
            uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80',
          }}
        />
        <Text
          style={{
            fontSize: 24,
            fontWeight: '700',
            color: '#15141F',
            marginLeft: 8,
          }}>
          Stephen Carl
        </Text>
      </View>

      <View style={{height: 24}} />

      <View style={styles.notificationsettingcontainer}>
        <Text style={styles.notificationsettingtxt}>
          Notify me when there is good progress
        </Text>

        <ToggleSwitch
          isOn={switchValue}
          onColor="#8eb26f"
          offColor="#e7eaeb"
          size="medium"
          onToggle={(isOn: boolean) => setSwitchValue(isOn)}
        />
      </View>
      <View style={styles.notificationsettingcontainer}>
        <Text style={styles.notificationsettingtxt}>
          Notify me when there is bad progress
        </Text>

        <ToggleSwitch
          isOn={switchValue1}
          onColor="#8eb26f"
          offColor="#e7eaeb"
          size="medium"
          onToggle={(isOn: boolean) => setSwitchValue1(isOn)}
        />
      </View>
      <View style={styles.notificationsettingcontainer}>
        <Text style={styles.notificationsettingtxt}>Be Notified</Text>

        <ToggleSwitch
          isOn={switchValue2}
          onColor="#8eb26f"
          offColor="#e7eaeb"
          size="medium"
          onToggle={(isOn: boolean) => setSwitchValue2(isOn)}
        />
      </View>

      <View style={styles.dailyStateContainer}>
        <DailyState />
      </View>

      <CustomButton
        extraStyles={{
          marginTop: verticalScale(32),
          marginBottom: verticalScale(66),
          marginHorizontal: 16,
        }}
        onPress={() => Navigation.navigate('WeeklySummary')}
        // isDisabled={loginLoading}
      >
        Weekly Summary
      </CustomButton>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  notificationsettingcontainer: {
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 16,
    paddingHorizontal: 17,
    marginBottom: 10,
  },
  notificationsettingtxt: {
    fontSize: 15,
    fontWeight: '500',
    letterSpacing: -0.5,
    color: '#7B8D95',
    flex: 1,
    paddingRight: 5,
  },
  dailyStateContainer: {
    marginTop: verticalScale(16),
    borderRadius: moderateScale(13),
    paddingVertical: verticalScale(18),
    paddingHorizontal: horizontalScale(8),
    backgroundColor: '#ffffff',
    elevation: 1,
    marginHorizontal: 16,
  },
});
