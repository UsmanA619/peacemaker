import React from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Navigation from '../../../utils/appNavigation';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import MediaItem from '../../../components/Chat/MediaItem';
import ProfileInfo from '../../../components/Chat/ProfileInfo';
import placeholderImg from '../../../constants/extras';

export default function GroupInfo({route}) {
  return (
    <View style={{paddingTop: 15, flex: 1, backgroundColor: '#f9fafa'}}>
      <ProfileInfo
        group
        provider={false}
        title={route.params?.title ? route.params?.title : 'Kyle and Aaron'}
      />

      <MediaItem view title="Group Name" color="#000" />
      <MediaItem
        onPress={() => Navigation.navigate('ChatMedias')}
        title="Media (10)"
        icon
      />

      <View
        style={{
          alignItems: 'center',
          marginTop: 16,
          borderRadius: 10,
          overflow: 'hidden',
          backgroundColor: 'white',
          width: '90%',
          alignSelf: 'center',
        }}>
        <MediaItem
          view
          title="Akiza Kei"
          img={placeholderImg}
          fontWeight="500"
        />
        <MediaItem
          view
          title="Aaron Vlademir"
          img={placeholderImg}
          fontWeight="500"
        />
        <MediaItem
          view
          title="Kyle Smith"
          img={placeholderImg}
          fontWeight="500"
        />
      </View>

      <MediaItem title="Exit Group Chat" color="#FD003A" fontWeight="500" />
    </View>
  );
}
