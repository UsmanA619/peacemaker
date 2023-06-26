import {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {STYLES} from '../../styles/globalStyles';
import {Image} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/metrics';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../interface/types';
import CustomModal from '../shared-components/CustomModal';

interface Props {
  name: string;
  imageurl: any;
  percentage?: number | undefined;
  lastUpdateTime?: string;
  bgColor: string;
}

type NavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'StateDetailsScreen',
  'PainChartScreen'
>;

const imageUrl = require('../../../assets/images/daily-state-images/reception-bell.png');

const StateCard = ({
  name,
  imageurl,
  percentage,
  lastUpdateTime,
  bgColor,
}: Props) => {
  const navigation = useNavigation<NavigationProp>();
  const [painChartModalVisible, setPainChartModalVisible] =
    useState<boolean>(false);

  const handleClick = () => {
    if (percentage! > 25) {
      console.log('tue');
      navigation.navigate('StateDetailsScreen', {
        name,
        imageurl,
        bgColor,
      });
    } else if (percentage == undefined) {
      return;
    } else {
      setPainChartModalVisible(true);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.stateCardContainer, {backgroundColor: bgColor}]}
      activeOpacity={percentage == undefined ? 1 : 0.7}
      onPress={handleClick}>
      <Text
        style={[
          STYLES.dev1__text16,
          {fontFamily: 'Satoshi-Black', color: '#ffffff'},
        ]}>
        {name}
      </Text>
      <Image
        source={{uri: imageurl}}
        resizeMode="contain"
        style={{width: horizontalScale(95), height: verticalScale(95)}}
      />
      {percentage != null && (
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: horizontalScale(38),
              gap: horizontalScale(3),
            }}>
            <Text
              style={[
                STYLES.dev1__text18,
                {
                  fontWeight: '700',
                  fontFamily: 'GeneralSans-Bold',
                  color: '#FFFFFF',
                },
              ]}>
              {percentage}
            </Text>
            <Text
              style={[
                STYLES.dev1__text13,
                {
                  fontWeight: '400',
                  fontFamily: 'GeneralSans-Regular',
                  color: '#FFFFFF',
                  width: '100%',
                },
              ]}>
              %
            </Text>
          </View>

          <Text
            style={[
              STYLES.dev1__text13,
              {
                opacity: 7,
                color: '#ffffff',
                fontFamily: 'GeneralSans-Regular',
                paddingLeft: horizontalScale(38),
              },
            ]}>
            last update {lastUpdateTime}
          </Text>
        </View>
      )}

      <CustomModal
        visible={painChartModalVisible}
        close={() => setPainChartModalVisible(!painChartModalVisible)}
        title="Physical is less than 25%"
        description="Would you like to record and tell 
us what’s hurting you?"
        color="#000"
        icon="x"
        btnBgColor="#8EB26F"
        onConfirm={() => {
          setPainChartModalVisible(!painChartModalVisible),
            navigation.navigate('PainChartScreen');
        }}
        imageUrl={imageUrl}
      />
    </TouchableOpacity>
  );
};

export default StateCard;
const styles = StyleSheet.create({
  stateCardContainer: {
    width: horizontalScale(166),
    height: verticalScale(240),
    borderRadius: moderateScale(16),
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: verticalScale(20),
  },
});
