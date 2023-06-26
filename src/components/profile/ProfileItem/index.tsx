import React from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import ToggleSwitch from '../IOSToggle';

export default function ProfileItem({
  img,
  imgSize = 26,
  text,
  showToggle = false,
  onPress = () => null,
}: {
  img: any;
  imgSize?: number;
  text: string;
  showToggle?: boolean;
  onPress?: (() => void) | undefined;
}) {
  const [switchValue, setSwitchValue] = React.useState<boolean>(false);

  return (
    <>
      <TouchableOpacity onPress={onPress} style={styles.profileItem}>
        <View style={styles.profileItemImgCont}>
          <Image style={{width: imgSize, height: imgSize}} source={img} />
        </View>

        <Text style={styles.profileItemTxt}>{text}</Text>

        {showToggle ? (
          <ToggleSwitch
            isOn={switchValue}
            onColor="#8eb26f"
            offColor="#d6dadb"
            size="medium"
            onToggle={(isOn: boolean) => setSwitchValue(isOn)}
          />
        ) : null}
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  profileItem: {
    marginHorizontal: 2,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  profileItemImgCont: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: '#EAF3E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileItemTxt: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '500',
    color: '#0C212C',
  },
});
