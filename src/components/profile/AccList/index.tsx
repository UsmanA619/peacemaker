import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

import Navigation from '../../../utils/appNavigation';

export default function AccountabilityList({
  btnTxt,
  peaceBox,
  name
}: {
  btnTxt: 'Add' | 'Remove';
  peaceBox: boolean;
  name: string;
}) {
  return (
    <TouchableWithoutFeedback
      onPress={() => Navigation.navigate('AccountablityBuddy')}>
      <View style={styles.container}>
        <Image
          style={styles.img}
          source={{
            uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80',
          }}
        />
        <View style={styles.titlePeaceContainer}>
          <Text style={styles.title}>{name}</Text>
          {peaceBox ? (
            <View style={styles.peacebox}>
              <Text style={styles.peaceboxTxt}>Peace Maker</Text>
            </View>
          ) : null}
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.btnTxt}>{btnTxt}</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 6,
  },
  img: {width: 43, height: 43, borderRadius: 50},
  titlePeaceContainer: {
    flexDirection: 'row',
    marginHorizontal: 8,
    flex: 1,
    alignItems: 'center',
    flexWrap: "wrap"
  },
  peacebox: {
    height: 32,
    paddingHorizontal: 8,
    borderRadius: 16,
    backgroundColor: 'rgba(142, 178, 111, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  peaceboxTxt: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8EB26F',
    textAlign: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '400',
    color: 'black',
    marginRight: 8,
  },
  button: {
    width: 75,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#D6D6D6',
    padding: 8,
  },
  btnTxt: {
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
    color: 'white',
  },
});
