import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import ScreenTitle from '../../../components/shared-components/ScreenTitle';
import {STYLES} from '../../../styles/globalStyles';
import {verticalScale} from '../../../utils/metrics';
import {COLORS} from '../../../constants/colors';

export default function TermAndConditions() {
  return (
    <ScrollView>
        <View style={{flex: 1, backgroundColor: '#F9FAFA', paddingHorizontal: 16}}>
      <ScreenTitle
        title="Terms and conditions"
        description="Download as PDF here. To view our previous terms download it here."
      />

      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: '#c7c8c8',
          alignItems: 'center',
          paddingBottom: 10,
          marginTop: 18,
        }}>
        <Text style={{fontSize: 16, fontWeight: '600', color: '#000', flex: 1}}>
          USA
        </Text>

        <MaterialIcons name="keyboard-arrow-down" size={25} color={'#3C3C43'} />
      </View>

      <Text
        style={[
          STYLES.dev1__text13,
          {
            fontWeight: '500',
            paddingTop: verticalScale(8),
            color: COLORS.neutral700,
            fontFamily: 'GeneralSans-Medium',
          },
        ]}>
        Effective date: 30 June 2023
      </Text>

      <Text
        style={{
          fontSize: 17,
          fontWeight: '600',
          color: '#15141F',
          marginTop: 32,
        }}>
        The basics
      </Text>

      <Text style={{lineHeight: 23, fontSize: 14, color: "#656565"}}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Imperdiet sed
        euismod nisi porta lorem. Maecenas sed enim ut sem viverra aliquet. Duis
        convallis convallis tellus id. Ultrices tincidunt arcu non sodales neque
        sodales ut. Non blandit massa enim nec dui. Iaculis urna id volutpat
        lacus. Convallis aenean et tortor at risus viverra. Sagittis purus sit
      </Text>

      <Text
        style={{
          fontSize: 19,
          fontWeight: '800',
          color: 'black',
          marginTop: 20,
        }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </Text>
      <Text style={{lineHeight: 23, fontSize: 14, marginTop: 20, color: "#656565"}}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Imperdiet sed
        euismod nisi porta lorem. Maecenas sed enim ut sem viverra aliquet. Duis
        convallis convallis tellus id. Ultrices tincidunt arcu non sodales neque
        sodales ut. Non blandit massa enim nec dui. Iaculis urna id volutpat
        lacus. Convallis aenean et tortor at risus viverra. Sagittis purus sit
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis
        voluptate quas minima sit blanditiis voluptatibus numquam vero saepe! In
        molestiae quos cumque autem nesciunt maxime voluptatibus facere officiis
        error? Corporis? Lorem, ipsum dolor sit amet consectetur adipisicing
        elit. Praesentium consequatur magnam voluptatum ratione, corrupti
        accusantium molestiae veniam vero laudantium odio dolor quisquam
        aspernatur, officia explicabo minus? Nisi similique animi provident.
      </Text>
    </View>
    </ScrollView>
  );
}
