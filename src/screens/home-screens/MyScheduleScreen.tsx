import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {STYLES} from '../../styles/globalStyles';
import MySchedule from '../../components/home/MySchedule';
import {TODAYSCHALLENGES, UPCOMINGCHALLENGES} from '../../../data/data';
import {Calendar} from 'react-native-calendars';
import {moderateScale} from '../../utils/metrics';
import {COLORS} from '../../constants/colors';
import moment from 'moment';

const MyScheduleScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');

  const handleDayPress = (day: any) => {
    const formattedDate = day.dateString;
    setSelectedDate(formattedDate);
  };

  const today = moment().format('YYYY-MM-DD');

  const markedDates = selectedDate
    ? {[selectedDate]: {selected: true, selectedColor: COLORS.mainGreen}}
    : {[today]: {selected: true, selectedColor: COLORS.mainGreen}};

  return (
    <ScrollView>
      <View style={STYLES.dev1__container}>
        <Calendar
          style={styles.calendar}
          onDayPress={handleDayPress}
          markedDates={markedDates}
        />
        <MySchedule title="Today" schedule={TODAYSCHALLENGES} />
        <MySchedule
          title="Upcoming"
          schedule={UPCOMINGCHALLENGES}
          titleColor="#d6d6d6"
        />
      </View>
    </ScrollView>
  );
};

export default MyScheduleScreen;

const styles = StyleSheet.create({
  calendar: {
    borderRadius: moderateScale(13),
    elevation: 1,
    color: COLORS.mainGreen,
  },
});
