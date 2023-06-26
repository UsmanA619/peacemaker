import {apple, facebook, google} from '../../constants/images';
import {Image, StyleSheet, View} from 'react-native';
import {horizontalScale, verticalScale} from '../../utils/metrics';
import FastImage from 'react-native-fast-image';

interface Props {
  extraStyles?: any;
}

const SocialIcons = ({extraStyles}: Props) => {
  return (
    <View style={[styles.iconsTray, extraStyles]}>
      <View style={styles.iconsContainer}>
        <FastImage source={google} style={{width: horizontalScale(41),height: verticalScale(41)}} resizeMode='contain' />
      </View>
      <View style={styles.iconsContainer}>
      <FastImage source={facebook} style={{width: horizontalScale(41),height: verticalScale(41)}} resizeMode='contain' />
      </View>
      <View style={styles.iconsContainer}>
      <FastImage source={apple} style={{width: horizontalScale(41),height: verticalScale(41)}} resizeMode='contain' />
      </View>
    </View>
  );
};

export default SocialIcons;

const styles = StyleSheet.create({
  iconsTray: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: verticalScale(24),
    justifyContent: 'center',
  },

  iconsContainer: {
    paddingHorizontal: horizontalScale(1),
  },
});
