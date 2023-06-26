import {View, Text, StyleSheet} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/metrics';
import FastImage, {Source} from 'react-native-fast-image';

interface Props {
  imageUrl: number | Source;
  content: string;
  backgroundColor: string;
  extraStyles?: any
}

const CustomRoundCard = ({content, imageUrl, backgroundColor,extraStyles}: Props) => {
  return (
    <View
      style={[styles.roundCardContainer, extraStyles, {backgroundColor: backgroundColor}]}>
      <View style={styles.roundCard}>
        <FastImage
          source={imageUrl}
          resizeMode="contain"
          style={{
            width: horizontalScale(40.3),
            height: verticalScale(40.3),
          }}
        />
        <Text style={{fontSize: moderateScale(8.5), color: '#ffffff',fontFamily:'GeneralSans-Medium'}}>
          {content}
        </Text>
      </View>
    </View>
  );
};

export default CustomRoundCard;

const styles = StyleSheet.create({
  roundCardContainer: {
    marginTop: verticalScale(16),
    width: 80,
    height: 80,
    borderRadius: 40,
    flex: 1,
  },
  roundCard: {
    paddingTop: verticalScale(13),
    justifyContent: 'center',
    alignItems: 'center',
    gap: verticalScale(2.6),
  },
});
