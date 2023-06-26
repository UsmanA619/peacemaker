import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {COLORS} from '../../../constants/colors';
import placeholderImg from '../../../constants/extras';

interface Props {
  byMe: boolean;
  text: string;
  index: number;
  group: number;
}

export default function ChatBubble({byMe, text, index, group}: Props) {
  return (
    <View
      style={
        byMe ? styles.rightMessage : [styles.leftMessage, {marginLeft: group === 1? 38: 20}]
      }
      key={index}>
      <Text
        style={{fontSize: 15, color: byMe ? '#fff' : '#000', fontWeight: '400'}}
        key={index}>
        {text}
      </Text>
      <View style={byMe ? styles.rightArrow : styles.leftArrow}></View>
      <View
        style={
          byMe ? styles.rightArrowOverlap : styles.leftArrowOverlap
        }></View>

      {group === 1 && !byMe ? (
        <Image
          style={styles.img}
          source={placeholderImg}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  rightMessage: {
    backgroundColor: COLORS.mainGreen,
    padding: 10,
    marginLeft: '45%',

    marginTop: 8,
    marginBottom: 8,
    marginRight: 20,
    maxWidth: '75%',
    alignSelf: 'flex-end',
    borderRadius: 14,
  },
  rightArrow: {
    position: 'absolute',
    backgroundColor: COLORS.mainGreen,
    //backgroundColor:"red",
    width: 20,
    height: 25,
    bottom: 0,
    borderBottomLeftRadius: 10,
    right: -10,
  },

  rightArrowOverlap: {
    position: 'absolute',
    backgroundColor: '#fff',
    //backgroundColor:"green",
    width: 20,
    height: 35,
    bottom: -6,
    borderBottomLeftRadius: 18,
    right: -20,
  },

  leftMessage: {
    backgroundColor: '#e6e5eb',
    padding: 10,
    marginTop: 8,
    marginBottom: 8,
    maxWidth: '75%',
    alignSelf: 'flex-start',
    //maxWidth: 500,
    //padding: 14,

    //alignItems:"center",
    borderRadius: 14,
  },
  /*Arrow head for recevied messages*/
  leftArrow: {
    position: 'absolute',
    backgroundColor: '#e6e5eb',
    //backgroundColor:"red",
    width: 20,
    height: 25,
    bottom: 0,
    borderBottomRightRadius: 10,
    left: -10,
  },

  leftArrowOverlap: {
    position: 'absolute',
    backgroundColor: '#fff',
    //backgroundColor:"green",
    width: 20,
    height: 35,
    bottom: -6,
    borderBottomRightRadius: 18,
    left: -20,
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
