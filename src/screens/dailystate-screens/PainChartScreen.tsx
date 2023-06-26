import React, {useState} from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {STYLES} from '../../styles/globalStyles';
import {moderateScale, verticalScale} from '../../utils/metrics';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/colors';
import DailyStateModal from '../../components/daily-state/DailyStateModal';
import {PROBLEMS_DATA, TIMES} from '../../../data/data';
import {BlurView} from '@react-native-community/blur';

const PainChartScreen = ({navigation}: any) => {
  const [showProblemModal, setShowProblemModal] = useState(false);
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  const handleHideModal = (modalName: string) => {
    modalName == 'time' ? setShowTimeModal(false) : setShowProblemModal(false);
    selectedProblem == '' || selectedTime == ''
      ? ''
      : navigation.navigate('SummaryScreen', {
          problem: selectedProblem,
          time: selectedTime,
        });
  };

  return (
    <View
      style={[
        STYLES.dev1__homeContainer,
        {gap: 16, alignItems: 'center'},
      ]}>
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => setShowProblemModal(true)}>
        <Text style={[STYLES.dev1__text15, {color: '#4F4F4F'}]}>
          {selectedProblem == '' ? 'Tell us what you feel' : selectedProblem}
        </Text>
        <Icon
          name="chevron-forward-outline"
          size={24}
          color={COLORS.primary400}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.cardContainer]}
        onPress={() => setShowTimeModal(true)}>
        <Text style={[STYLES.dev1__text15, {color: '#4F4F4F'}]}>
          {selectedTime == '' ? 'How long are you feeling this?' : selectedTime}
        </Text>
        <Icon
          name="chevron-forward-outline"
          size={24}
          color={COLORS.primary400}
        />
      </TouchableOpacity>
      <Image
        source={require('../../../assets/images/daily-state-images/character-2.png')}
      />

      <DailyStateModal
        data={PROBLEMS_DATA}
        visible={showProblemModal}
        onClose={() => handleHideModal('problems')}
        onCancel={() => setShowProblemModal(false)}
        setSelectedValue={setSelectedProblem}
      />
      <DailyStateModal
        data={TIMES}
        visible={showTimeModal}
        onClose={() => handleHideModal('time')}
        onCancel={() => setShowTimeModal(false)}
        setSelectedValue={setSelectedTime}
      />
    </View>
  );
};

export default PainChartScreen;

const styles = StyleSheet.create({
  blurred: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  cardContainer: {
    backgroundColor: '#FDFDFD',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: moderateScale(16),
    elevation: 1,
    width: '100%',
  },
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },

});
