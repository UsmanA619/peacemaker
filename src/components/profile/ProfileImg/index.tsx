import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {COLORS} from '../../../constants/colors';
import {moderateScale} from '../../../utils/metrics';

export default function ProfileImg({
  size = 58,
  txtSize = moderateScale(22),
  smallBoxSize = 22,
  iconSize = 9,
}) {
  return (
    <View style={[styles.box1NameBox, { width: size, height: size}]}>
      <Text style={[styles.box1NameBoxTxt, { fontSize: txtSize}]}>AK</Text>
      <View
        style={{
          width: smallBoxSize,
          height: smallBoxSize,
          borderRadius: 50,
          backgroundColor: COLORS.mainGreen,
          borderWidth: 2,
          alignItems: 'center',
          justifyContent: 'center',
          borderColor: 'white',
          position: 'absolute',
          bottom: -6,
          right: 3,
        }}>
        <Icon size={iconSize} name="camera" color="white" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box1NameBox: {
    borderRadius: 50,
    backgroundColor: '#EAF3E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box1NameBoxTxt: {
    fontWeight: '700',
    color: '#15141F',
  },
});
