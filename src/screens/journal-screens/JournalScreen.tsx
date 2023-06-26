import React from 'react';
import {View, Text} from 'react-native';
import {STYLES} from '../../styles/globalStyles';

const JournalScreen = () => {
  return (
    <View
      style={[
        STYLES.dev1__homeContainer,
        {justifyContent: 'center', alignItems: 'center'},
      ]}>
      <Text>Coming Soon</Text>
    </View>
  );
};

export default JournalScreen;
