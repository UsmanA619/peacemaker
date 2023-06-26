import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../interface/types';
import RNDateTimePicker from '@react-native-community/datetimepicker';

import NotifyCard from './NotifyCard';
import {moderateScale, verticalScale} from '../../utils/metrics';
import {COLORS} from '../../constants/colors';

type NavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'DailyStateMap'
>;

const ManualSetCard = () => {
  const navigation = useNavigation<NavigationProp>();
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [switchValue1, setSwitchValue1] = useState<boolean>(false);
  const [switchValue2, setSwitchValue2] = useState<boolean>(false);
  const [switchValue3, setSwitchValue3] = useState<boolean>(false);
  const [isShowCalender, setIsShowCalender] = useState<boolean>(false);
  const [isShowClock, setIsShowClock] = useState<boolean>(false);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string>('');

  const handleDayPress = (day: any) => {
    const date = new Date(day.timestamp);

    const dayOfMonth = date.getDate();
    const month = date.toLocaleString('default', {month: 'short'});
    const year = date.getFullYear();

    const formattedDate = `${dayOfMonth} ${month} ${year}`;
    setSelectedDate(formattedDate);
    setIsShowCalender(false);
  };

  const today = moment().format('DD-MM-YYYY');
  const markedDates = selectedDate
    ? {[selectedDate]: {selected: true, selectedColor: COLORS.mainGreen}}
    : {[today]: {selected: true, selectedColor: COLORS.mainGreen}};


  const selectTimeHandler = (event: any, selected: Date | undefined) => {
    if (event.type === 'dismissed') {
      setSelectedTime(prev => prev);
      setIsShowClock(false);
    } else if (selected) {
      setSelectedTime(selected);
      setIsShowClock(false);
    }
  };

  const navigationHandler = () => {
    setSwitchValue3(true)
    navigation.navigate('DailyStateMap', {setLocation: setSelectedLocation});
  };

  return (
    <View>
      <TouchableOpacity
        style={[
          styles.container,
          {borderBottomRightRadius: 0, borderBottomLeftRadius: 0},
        ]}
        onPress={() => { setIsShowCalender(!isShowCalender), setSwitchValue1(true)} }>
        <NotifyCard
          switchValue={switchValue1}
          setSwitchValue={setSwitchValue1}
          content={'Date'}
          iconName="calendar"
          value={selectedDate}
        />
      </TouchableOpacity>
      {isShowCalender && (
        <Calendar
          style={styles.calendar}
          onDayPress={handleDayPress}
          markedDates={markedDates}
        />
      )}
      <TouchableOpacity
        style={[
          styles.container,
          {marginTop: 0, borderTopRightRadius: 0, borderTopLeftRadius: 0},
        ]}
        onPress={() =>{ setIsShowClock(true), setSwitchValue2(true)}}>
        <NotifyCard
          switchValue={switchValue2}
          setSwitchValue={setSwitchValue2}
          content={'Time'}
          iconName="alarm-outline"
          value={selectedTime && selectedTime.toLocaleTimeString()}
        />
      </TouchableOpacity>
      {isShowClock && (
        <RNDateTimePicker
          value={selectedTime || new Date()} 
          mode="time"
          is24Hour={true}
          display="clock"
          onChange={selectTimeHandler}
        />
      )}
      <TouchableOpacity style={[styles.container]} onPress={navigationHandler}>
        <NotifyCard
          switchValue={switchValue3}
          setSwitchValue={setSwitchValue3}
          content={'Location'}
          iconName="navigate-outline"
          value={selectedLocation}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ManualSetCard;

const styles = StyleSheet.create({
  container: {
    marginTop: verticalScale(16),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    elevation: 1,
    borderRadius: 16,
  },
  calendar: {
    elevation: 1,
    color: COLORS.mainGreen,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.inActive,
  },
});
