import {View, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {STYLES} from '../../styles/globalStyles';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/metrics';
import {COLORS} from '../../constants/colors';
import Header from '../../components/home/Header';
import CustomCard from '../../components/home/CustomCard';
import CustomRoundCard from '../../components/home/CustomRoundCard';
import MySchedule from '../../components/home/MySchedule';
import {CHALLENGES} from '../../../data/data';
import DailyState from '../../components/home/DailyState';

const HomeScreen = ({navigation}: any) => {
  return (
    <ScrollView>
      <View style={STYLES.dev1__homeContainer}>
        {/* <View style={{ height: 19}} /> */}
        <Header />
        <View style={styles.cardContainer}>
          <CustomCard
            content="100 Daily Points"
            imageUrl={require('../../../assets/images/points.png')}
          />
          <CustomCard
            content="10 Entries"
            imageUrl={require('../../../assets/images/entries.png')}
          />
        </View>
        <View style={styles.roundCardContainer}>
          <CustomRoundCard
            content="Daily Challenge"
            imageUrl={require('../../../assets/images/challenge.png')}
            backgroundColor={COLORS.green}
          />
          <CustomRoundCard
            content="Journal"
            imageUrl={require('../../../assets/images/journal.png')}
            backgroundColor="#6B9EA6"
          />
          <CustomRoundCard
            content="Accountability"
            imageUrl={require('../../../assets/images/accountability.png')}
            backgroundColor="#A4DAD2"
          />
          <CustomRoundCard
            content="Intervention"
            imageUrl={require('../../../assets/images/intervention.png')}
            backgroundColor="#4C5980"
          />
        </View>
        <MySchedule
          title="MY SCHEDULE"
          isButton={true}
          isSeeAll={true}
          schedule={CHALLENGES}
        />
        <TouchableOpacity
          style={styles.dailyStateContainer}
          onPress={() => navigation.navigate('DailyStateScreen')}>
          <DailyState />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: verticalScale(14),
    flexDirection: 'row',
    gap: horizontalScale(13),
  },
  card: {
    width: horizontalScale(165),
    height: verticalScale(57),
    backgroundColor: '#FDFDFD',
    borderWidth: horizontalScale(1),
    borderColor: '#F4F4F4',
    borderRadius: moderateScale(10),
    paddingHorizontal: horizontalScale(16),
    alignItems: 'center',
    flexDirection: 'row',
    gap: horizontalScale(4),
    flex: 1,
  },
  roundCardContainer: {
    flexDirection: 'row',
    gap: horizontalScale(9),
  },
  dailyStateContainer: {
    marginTop: verticalScale(16),
    borderRadius: moderateScale(13),
    paddingVertical: verticalScale(18),
    paddingHorizontal: horizontalScale(8),
    backgroundColor: '#ffffff',
    elevation: 1,
  },
});
