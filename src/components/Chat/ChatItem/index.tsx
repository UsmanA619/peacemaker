import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  TouchableHighlight,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {COLORS} from '../../../constants/colors';
import placeholderImg from '../../../constants/extras';

export default function ChatItem({
  isActive = false,
  group = false,
  img1 = placeholderImg,
  img2 = placeholderImg,
  title = '',
  time = '',
  text = '',
  renderRightActions = () => <></>,
  onPress
}) {
  return (
    <>
      <GestureHandlerRootView>
        <Swipeable renderRightActions={renderRightActions}>
          <TouchableHighlight onPress={onPress} >
            <View style={styles.chatItem}>
              {isActive ? (
                <View style={styles.activeIndicator} />
              ) : (
                <View style={styles.activeIndicatorZero} />
              )}
              {group ? (
                <View style={styles.groupChatImg}>
                  <Image
                    style={[styles.chatPicGrp, styles.chatPicGrp1]}
                    source={img1}
                  />
                  <Image
                    style={[styles.chatPicGrp, styles.chatPicGrp2]}
                    source={img2}
                  />
                </View>
              ) : (
                <Image
                  style={styles.chatPic}
                  source={img1}
                />
              )}
              <View style={styles.chatInfo}>
                <View style={styles.chatTopInfo}>
                  <Text style={styles.chatTitle}>{title}</Text>
                  <Text style={styles.chatTime}>{time}</Text>
                </View>
                <Text numberOfLines={2} style={styles.chatSubtitle}>
                  {text}
                  Nice. I don't know why people get all worked up about hawaiian
                  pizza. I know why people
                </Text>
              </View>
            </View>
          </TouchableHighlight>
        </Swipeable>
      </GestureHandlerRootView>
      <View style={styles.chatDivider} />
    </>
  );
}

const styles = StyleSheet.create({
  chatItem: {
    // marginHorizontal: 5,
    paddingHorizontal: 6.2,
    paddingVertical: 5,
    flexDirection: 'row',
    // borderBottomColor: '#e9e9e9',
    // borderBottomWidth: 1,
    alignItems: 'center',
    backgroundColor: "white",
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
    marginRight: -5
  },
  activeIndicator: {
    width: 10.5,
    height: 10.5,
    backgroundColor: COLORS.mainGreen,
    borderRadius: 50,
  },
  activeIndicatorZero: {
    width: 10.5,
    height: 10.5,
  },
  chatPic: {
    width: 43,
    height: 43,
    borderRadius: 50,
    marginHorizontal: 10,
  },
  groupChatImg: {
    width: 43,
    height: 43,
    marginHorizontal: 10,
    position: 'relative',
  },
  chatPicGrp: {
    width: 30,
    height: 30,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'white',
    position: 'absolute',
  },
  chatPicGrp1: {
    top: 0,
    left: 0,
  },
  chatPicGrp2: {
    bottom: 0,
    right: 0,
  },
  chatTopInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 25,
  },
  chatInfo: {
    width: '79%',
  },
  chatTitle: {
    color: 'black',
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '400',
  },
  chatTime: {
    fontSize: 14,
    lineHeight: 19,
    fontWeight: '400',
    color: '#88888c',
  },
  chatSubtitle: {
    fontSize: 15,
    lineHeight: 19,
    fontWeight: '400',
    color: '#88888c',
    marginRight: 60,
    paddingTop: 3,
  },
  chatDivider: {
    marginVertical: 3,
    height: 1.5,
    backgroundColor: '#e3e3e3',
    marginLeft: 5,
    width: '92%',
  },
});
