import React from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Navigation from '../../../utils/appNavigation';
import MediaItem from '../../../components/Chat/MediaItem';
import ProfileInfo from '../../../components/Chat/ProfileInfo';

export default function ChatInfo({route}) {
  return (
    <View style={{paddingTop: 15, flex: 1, backgroundColor: '#f9fafa'}}>
      <ProfileInfo
        group={false}
        provider={false}
        title={route.params?.title ? route.params?.title : 'Stephen Carl'}
      />

      <MediaItem
        onPress={() => Navigation.navigate('ChatMedias')}
        title="Medias (10)"
        icon
      />
      <MediaItem title="Mute Conversation" />
      <MediaItem title="Delete" color="#FD003A" />
    </View>
  );
}
