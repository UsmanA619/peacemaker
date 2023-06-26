import React, {useState} from 'react';
import {Text, View,TouchableOpacity} from 'react-native';
import {STYLES} from '../../styles/globalStyles';
import {horizontalScale, verticalScale} from '../../utils/metrics';
import {COLORS} from '../../constants/colors';
import CustomButton from '../../components/shared-components/CustomButton';
import CustomModal from '../../components/shared-components/CustomModal';
import FeatherIcon from "react-native-vector-icons/Feather"

const imageUrl = require('../../../assets/images/daily-state-images/reception-bell.png');

const SummaryScreen = ({route, navigation}: any) => {
  const [isSaveData, setIsSaveData] = useState<boolean>(false);
  return (
    <View
      style={[STYLES.dev1__homeContainer, {justifyContent: 'space-between'}]}>
      <View>
        <View style={{gap: 16}}>
          <Text
            style={[
              STYLES.dev1__text15,
              {color: '#324C51', fontFamily: 'GeneralSans-Medium'},
            ]}>
            Head
          </Text>
          <View style={{flexDirection: 'row', gap: 20}}>
            <Text
              style={[
                STYLES.dev1__text15,
                {color: '#324C51', fontFamily: 'GeneralSans-Regular'},
              ]}>
              What you feel:{' '}
            </Text>
            <Text
              style={[
                STYLES.dev1__text15,
                {
                  color: '#324C51',
                  fontFamily: 'GeneralSans-Medium',
                  width: horizontalScale(200),
                },
              ]}>
              {route.params.problem}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 50}}>
            <Text
              style={[
                STYLES.dev1__text15,
                {color: '#324C51', fontFamily: 'GeneralSans-Regular'},
              ]}>
              How long:{' '}
            </Text>
            <Text
              style={[
                STYLES.dev1__text15,
                {color: '#324C51', fontFamily: 'GeneralSans-Medium'},
              ]}>
              {route.params.time}
            </Text>
          </View>

          <Text
            style={[
              STYLES.dev1__text15,
              {color: '#324C51', fontFamily: 'GeneralSans-Medium'},
            ]}>
            Parent
          </Text>
        </View>
        <View style={{gap: 16, marginTop: verticalScale(32)}}>
          <Text
            style={[
              STYLES.dev1__text15,
              {color: COLORS.primary400, fontFamily: 'GeneralSans-Medium'},
            ]}>
            Time & Date
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 50}}>
            <Text
              style={[
                STYLES.dev1__text15,
                {color: '#324C51', fontFamily: 'GeneralSans-Regular'},
              ]}>
              Time:
            </Text>
            <Text
              style={[
                STYLES.dev1__text15,
                {color: '#324C51', fontFamily: 'GeneralSans-Medium'},
              ]}>
              9:00 AM
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center' ,gap: 25}}>
            <Text
              style={[
                STYLES.dev1__text15,
                {color: '#324C51', fontFamily: 'GeneralSans-Regular'},
              ]}>
              Location:
            </Text>
            <Text
              style={[
                STYLES.dev1__text15,
                {color: '#324C51', fontFamily: 'GeneralSans-Medium'},
              ]}>
              San Francisco Hi-way
            </Text>
            <TouchableOpacity>
            <FeatherIcon
                name="edit-3"
                size={18}
                color="#000"
                style={{marginLeft: horizontalScale(50)}}
              />
              </TouchableOpacity>
          </View>
        </View>
      </View>
      <CustomButton onPress={() => setIsSaveData(true)}>Save</CustomButton>
      <CustomModal
        visible={isSaveData}
        close={() => setIsSaveData(false)}
        title="Save to Journal Entry"
        description="Would you like to save this record 
to you journal entry, you would be able
to access it later on. "
        icon="x"
        color="#000"
        btnBgColor="#8EB26F"
        onConfirm={() => navigation.navigate('DailyStateScreen')}
        imageUrl={imageUrl}
      />
    </View>
  );
};

export default SummaryScreen;
