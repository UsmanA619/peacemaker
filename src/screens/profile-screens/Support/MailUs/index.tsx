import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {STYLES} from '../../../../styles/globalStyles';
import {COLORS} from '../../../../constants/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../../../../components/shared-components/CustomButton';

export default function MailUs() {
  return (
    <View style={{flex: 1, backgroundColor: '#F9FAFA', paddingHorizontal: 16}}>
      <View style={{ flex: 1}}>
          <Text style={{fontSize: 28, fontWeight: '800', color: '#15141F'}}>
            Let’s take care of this
          </Text>
          <Text
            style={[
              STYLES.dev1__text13,
              {
                fontWeight: '500',
                color: COLORS.neutral700,
                fontFamily: 'GeneralSans-Medium',
              },
            ]}>
            Tell us as much as you can about the problem, and we’ll be in touch
            soon.
          </Text>
          <Text
            style={{
              fontSize: 21,
              fontWeight: '800',
              color: '#004852',
              marginTop: 24,
            }}>
            Message
          </Text>
          <TextInput
            multiline={true}
            placeholder="Hi, I need some help with..."
            numberOfLines={15}
            placeholderTextColor={'#94A5AB'}
            style={{
              padding: 14,
              backgroundColor: 'white',
              borderRadius: 8,
              borderWidth: 1,
              borderColor: '#CECECE',
              fontSize: 14,
              fontWeight: '500',
              marginTop: 8,
              textAlignVertical: 'top',
              color: "black"
            }}
          />
      </View>

      <CustomButton extraStyles={{marginTop: 0, marginBottom: 40}}>
        Send Message
      </CustomButton>
    </View>
  );
}

const styles = StyleSheet.create({
  supportItemContainer: {
    flexDirection: 'row',
    height: 80,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 8,
  },
  supportItemTxtContainer: {marginLeft: 0, flex: 1},
  supportItemTxt1: {fontSize: 16, fontWeight: '500', color: '#1f2c37'},
  supportItemTxt2: {
    fontSize: 13,
    fontWeight: '500',
    color: '#576B74',
    lineHeight: 18,
  },
});
