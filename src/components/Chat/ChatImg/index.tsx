import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {COLORS} from '../../../constants/colors';
import placeholderImg from '../../../constants/extras';
import Navigation from '../../../utils/appNavigation';

interface Props {
  byMe: boolean;
  imgUri: string;
  index: number;
  group: number;
  caption?: string;
}

export default function ChatImg({byMe, index, imgUri, group, caption}: Props) {
  return (
    <TouchableWithoutFeedback
    //   onPress={
    // () =>
    // Navigation.navigate('ChatMediaImg', {
    //   state: [imgUri],
    //   currentIndex: 0,
    // })
    //   }
    >
      <View
        style={
          byMe
            ? styles.rightMessage
            : [styles.leftMessage, {marginLeft: group === 1 ? 38 : 20}]
        }
        key={index}>
        <Image
          style={{
            width: 250,
            height: 200,
            borderRadius: 5,
            // borderWidth: 3,
            // borderColor: byMe ? COLORS.mainGreen : '#e6e5eb',
          }}
          source={{
            uri: imgUri,
          }}
        />

        {caption !== '' ? (
          <Text
            style={{
              fontSize: 15,
              color: byMe ? '#fff' : '#000',
              fontWeight: '400',
              paddingTop: 2,
              paddingLeft: 2,
            }}>
            {caption}
          </Text>
        ) : null}

        {group === 1 && !byMe ? (
          <Image style={styles.img} source={placeholderImg} />
        ) : null}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  rightMessage: {
    backgroundColor: COLORS.mainGreen,
    padding: 3,
    borderRadius: 8,
    marginLeft: '45%',

    marginTop: 8,
    marginBottom: 8,
    marginRight: 20,
    maxWidth: '75%',
    alignSelf: 'flex-end',
  },

  leftMessage: {
    backgroundColor: '#e6e5eb',
    padding: 3,
    borderRadius: 8,
    

    marginTop: 8,
    marginBottom: 8,
    maxWidth: '75%',
    alignSelf: 'flex-start',
    //maxWidth: 500,
    //padding: 14,

    //alignItems:"center",
    // borderRadius: 10,
  },

  img: {
    width: 22,
    height: 22,
    borderRadius: 50,
    position: 'absolute',
    bottom: 0,
    left: -27,
  },
});
