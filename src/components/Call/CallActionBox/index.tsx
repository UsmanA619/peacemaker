import React, {useState} from 'react';
import {View, StyleSheet, Pressable, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CallActionBox = ({onHangupPress = () => null, onVideo}) => {
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVidOn, setIsVidOn] = useState(true);

  const onToggleCamera = () => {
    setIsCameraOn(currentValue => !currentValue);
  };

  const onToggleVideo = () => {
    setIsVidOn(currentValue => !currentValue);
    onVideo();
  };

  const onToggleMicrophone = () => {
    setIsMicOn(currentValue => !currentValue);
  };

  return (
    <View style={styles.mainContainer}>
      <View
        style={{
          backgroundColor: '#BEBEC0',
          width: 34,
          height: 5,
          borderRadius: 2.4,
          alignSelf: 'center',
          marginTop: 8,
          marginBottom: 29,
        }}
      />

      <View style={styles.buttonsContainer}>
        <View style={styles.btnContainer}>
          <Pressable onPress={onToggleMicrophone} style={styles.iconButton}>
            <MaterialCommunityIcons
              name={isMicOn ? 'microphone-off' : 'microphone'}
              size={27}
              color={'white'}
            />
          </Pressable>
          <Text style={styles.subText}>mute</Text>
        </View>
        <View style={styles.btnContainer}>
          <Pressable onPress={onToggleCamera} style={styles.iconButton}>
            <MaterialCommunityIcons
              name={isCameraOn ? 'camera-off' : 'camera'}
              size={27}
              color={'white'}
            />
          </Pressable>
          <Text style={styles.subText}>flip</Text>
        </View>
        <View style={styles.btnContainer}>
          <Pressable
            onPress={onHangupPress}
            style={[styles.iconButton, {backgroundColor: '#eb5545'}]}>
            <Feather name="x" size={27} color={'white'} />
          </Pressable>
          <Text style={styles.subText}>end</Text>
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <Pressable onPress={onToggleVideo} style={styles.iconButtonB}>
          <MaterialIcons
            name={isVidOn ? 'videocam-off' : 'videocam'}
            size={20}
            color={'white'}
          />
          <Text style={{fontSize: 13, fontWeight: '500', color: 'white'}}>
            Camera Off
          </Text>
        </Pressable>
        <Pressable style={styles.iconButtonB}>
          <Ionicons name="ios-volume-high" size={20} color={'white'} />
          <Text style={{fontSize: 13, fontWeight: '500', color: 'white'}}>
            Speaker
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'rgba(30, 30, 30, 0.5)',
    paddingHorizontal: 20,
    paddingBottom: 40,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  buttonsContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-around',
    justifyContent: 'center',
    marginTop: 'auto',
    gap: 35,
  },
  iconButton: {
    backgroundColor: '#3b4653',
    padding: 12,
    borderRadius: 50,
  },
  subText: {
    fontSize: 13,
    fontWeight: '400',
    color: 'white',
    marginTop: 5,
  },
  btnContainer: {
    alignItems: 'center',
  },
  iconButtonB: {
    width: 150,
    backgroundColor: '#3b4553',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    flexDirection: 'row',
    gap: 10,
    marginTop: 22,
    marginBottom: 10,
  },
});

export default CallActionBox;
