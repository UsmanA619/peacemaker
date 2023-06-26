import React from 'react';
import {
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
  ScrollView,
} from 'react-native';

import Navigation from '../../../utils/appNavigation';

const IMAGES = [
  'https://images.unsplash.com/photo-1685374587390-74d79d19eaab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
  'https://images.unsplash.com/photo-1683731333542-b52cfe230b31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80',
  'https://images.unsplash.com/photo-1685111925914-ca3adea7c518?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80',
  'https://images.unsplash.com/photo-1685136262308-500924d99f70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
  'https://images.unsplash.com/photo-1685338680591-48461da961cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
  'https://images.unsplash.com/photo-1685369639280-a7af5cef2064?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
  'https://images.unsplash.com/photo-1685450186047-42c619545481?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
  'https://images.unsplash.com/photo-1685450185415-d205dc251d2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
  'https://images.unsplash.com/photo-1685338680591-48461da961cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
];

export default function ChatMedias() {
  return (
    <ScrollView
      contentContainerStyle={{
        paddingTop: 15,
        flex: 1,
        backgroundColor: '#f9fafa',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        // alignContent: "center"
        // borderWidth: 1,
      }}>
      {IMAGES.map((image, index) => (
        <TouchableWithoutFeedback
          onPress={() =>
            Navigation.navigate('ChatMediaImg', {
              state: IMAGES,
              currentIndex: index,
            })
          }>
          <Image
            key={index}
            style={styles.img}
            source={{
              uri: image,
            }}
          />
        </TouchableWithoutFeedback>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  img: {
    width: '32%',
    height: 117,
    // margin: 5.2,
    marginVertical: 5,
  },
});
