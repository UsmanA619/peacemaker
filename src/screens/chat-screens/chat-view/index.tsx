import React from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  PermissionsAndroid,
  Dimensions,
  TouchableOpacity,
  Image,
  Keyboard,
  Animated,
  Alert,
  Text,
  KeyboardEventListener,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {
  CameraRoll,
  PhotoIdentifier,
} from '@react-native-camera-roll/camera-roll';
import {useIsFocused} from '@react-navigation/native';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import ChatBubble from '../../../components/Chat/ChatBubble';
import ChatImg from '../../../components/Chat/ChatImg';
import Navigation from '../../../utils/appNavigation';
import {useIsKeyboardShowing} from '../../../utils/Hooks/useIsKeyboard';

interface Props {
  route: any;
}

type chatData = {
  isImg?: boolean;
  imgUri?: string;
  text?: string;
  messageSent: boolean;
  captions?: string;
};

export default function ChatMessagesScreen({route}: Props) {
  const [chat_log, setChat_log] = React.useState<chatData[]>([
    {
      messageSent: true,
      text: 'Hey Stephen. I am really down today and can’t use the app.',
    },
    {
      messageSent: false,
      text: "Nice. I don't know why people get all worked up about Hawaiian pizza. Would you like me to give you there, mate?",
    },
    {
      messageSent: true,
      text: 'Hey Stephen. I am really down today and can’t use the app.',
    },
    {
      messageSent: false,
      text: "Nice. I don't know why people get all worked up about Hawaiian pizza. Would you like me to give you there, mate?",
    },
    {
      messageSent: true,
      text: 'Hey Stephen. I am really down today and can’t use the app.',
    },
    {
      messageSent: false,
      text: "Nice. I don't know why people get all worked up about Hawaiian pizza. Would you like me to give you there, mate?",
    },
    {
      messageSent: true,
      text: 'Hey Stephen. I am really down today and can’t use the app.',
    },
    {
      messageSent: false,
      text: "Nice. I don't know why people get all worked up about Hawaiian pizza. Would you like me to give you there, mate?",
    },
    {
      messageSent: true,
      text: 'Hey Stephen. I am really down today and can’t use the app.',
    },
    {
      messageSent: false,
      text: "Nice. I don't know why people get all worked up about Hawaiian pizza. Would you like me to give you there, mate?",
    },
    {
      messageSent: true,
      text: 'Hey Stephen. I am really down today and can’t use the app.',
    },
    {
      messageSent: false,
      text: "Nice. I don't know why people get all worked up about Hawaiian pizza. Would you like me to give you there, mate?",
    },
    {
      messageSent: true,
      text: 'Hey Stephen. I am really down today and can’t use the app.',
    },
    {
      messageSent: false,
      text: "Nice. I don't know why people get all worked up about Hawaiian pizza. Would you like me to give you there, mate?",
    },
    {
      messageSent: true,
      text: 'Hey Stephen. I am really down today and can’t use the app.',
    },
    {
      messageSent: false,
      text: "Nice. I don't know why people get all worked up about Hawaiian pizza. Would you like me to give you there, mate?",
    },
  ]);
  const [galleryImages, setGalleryImages] = React.useState<PhotoIdentifier[]>(
    [],
  );
  const [showImages, setShowImages] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [currentSheetIndex, setCurrentSheetIndex] = React.useState(0);

  const {group} = route?.params;
  const isFocused = useIsFocused();
  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const [snapPoints, setSnapPoints] = React.useState<string[]>([
    `${Math.floor((46 / Dimensions.get('screen').height) * 100 + 8)}%`,
    '50%',
    '80%',
  ]);
  const isKeyboard = useIsKeyboardShowing();

  React.useEffect(() => {
    const tempSnapPoints = [
      `${Math.floor(
        (50 / Dimensions.get('screen').height) * 100 + (isKeyboard ? 8 : 4),
      )}%`,
      '50%',
      '80%',
    ];
    setSnapPoints(tempSnapPoints);
  }, [isKeyboard]);

  const handleSheetChange = React.useCallback((index: number) => {
    setCurrentSheetIndex(index);
    index === 0 ? setShowImages(false) : null;
  }, []);


  async function hasAndroidPermission() {
    const permission =
      Platform.Version >= '33'
        ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
        : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }

  const handleShowMedia = async () => {
    if (showImages) return;
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      Alert.alert('Permission denied', 'Allow permission to access images');
      return;
    }
    Keyboard.dismiss();

    CameraRoll.getPhotos({
      first: 20,
      assetType: 'Photos',
    })
      .then(r => {
        setGalleryImages(r.edges);
      })
      .catch(err => {
        console.error(err);
      });

    setShowImages(!showImages);
  };


  React.useEffect(() => {
    if (!isFocused) {
      setShowImages(false);
      setCurrentSheetIndex(0);
    }
  }, [isFocused]);

  React.useEffect(() => {
    if (isFocused && route.params?.fromPreview) {
      route.params.fromPreview = false;
      chat_log.unshift({
        messageSent: true,
        isImg: true,
        imgUri: route.params.imgageUri,
        captions: route.params.caption,
      });
      setChat_log([...chat_log]);
    }
  }, [isFocused]);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: '#f9fafa'}}>
        <View style={{flex: 1}}>
          <FlatList
            inverted
            style={{flexGrow: 0}}
            data={chat_log}
            renderItem={({item, index}) =>
              item.isImg ? (
                <ChatImg
                  group={group}
                  index={index}
                  imgUri={item.imgUri || ''}
                  byMe={item.messageSent}
                  caption={item.captions}
                />
              ) : (
                <ChatBubble
                  group={group}
                  index={index}
                  text={item.text || ''}
                  byMe={item.messageSent}
                />
              )
            }
            keyExtractor={(item, index) => index.toString()}
          />
        </View>

        <View
          style={{
            height: snapPoints[currentSheetIndex],
          }}
        />

        <BottomSheet
          onChange={handleSheetChange}
          enableContentPanningGesture={!showImages ? false : true}
          handleIndicatorStyle={{display: 'none'}}
          ref={bottomSheetRef}
          handleStyle={{display: 'none'}}
          index={!showImages ? 0 : 1}
          style={{borderWidth: 0}}
          snapPoints={snapPoints}>
          <View style={styles.contentContainer}>
            <View
              style={{
                backgroundColor: 'white',
                flexDirection: 'row',
                paddingHorizontal: 17,
                alignItems: 'center',
                height: 50,
                // marginTop: -8,
              }}>
              <TouchableOpacity onPress={handleShowMedia}>
                <FontAwesome
                  style={{marginRight: 16}}
                  name="camera"
                  color="#8b8b8b"
                  size={26}
                />
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  borderColor: '#c8c8cc',
                  borderWidth: 1,
                  borderRadius: 16,
                  height: 33,
                  alignItems: 'center',
                  paddingRight: 12,
                  paddingLeft: 5,
                }}>
                <TextInput
                  onPressIn={() => {
                    if (showImages) {
                      setShowImages(false);
                      setCurrentSheetIndex(0);
                    }
                  }}
                  value={message}
                  onChangeText={setMessage}
                  style={styles.input}
                  placeholder="Type here.."
                  placeholderTextColor=" rgba(60, 60, 67, 0.3)"
                />
                <TouchableOpacity
                  onPress={() => {
                    if (!message) return;
                    chat_log.unshift({
                      messageSent: true,
                      text: message,
                    });
                    setChat_log([...chat_log]);
                    setMessage('');
                  }}>
                  <Feather name="send" color="#C8C8CC" size={20} />
                </TouchableOpacity>
              </View>
            </View>

            {showImages ? (
              <>
                <View
                  style={{
                    backgroundColor: '#BEBEC0',
                    width: 34,
                    height: 5,
                    borderRadius: 2.4,
                    alignSelf: 'center',
                    marginTop: 6,
                    marginBottom: 8,
                  }}
                />
                <BottomSheetScrollView>
                  <View
                    style={{
                      backgroundColor: '#fefffe',
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                      paddingHorizontal: 10,
                      // paddingTop: 20
                    }}>
                    {galleryImages?.map(image => (
                      <TouchableOpacity
                        onPress={() => {
                          Navigation.navigate('ImagePreview', {
                            img: image.node.image.uri,
                            recentParams: route.params,
                          });
                        }}
                        style={styles.imgCont}
                        key={image.node.timestamp}>
                        <Image
                          style={styles.img}
                          resizeMode="cover"
                          source={{
                            uri: image.node.image.uri,
                          }}
                        />
                      </TouchableOpacity>
                    ))}
                  </View>
                </BottomSheetScrollView>
              </>
            ) : null}
          </View>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  imgCont: {
    width: '32%',
    height: 117,
    marginBottom: 8,
  },
  img: {
    width: '100%',
    height: '100%',
    // margin: 5.2,
  },
  input: {
    flex: 1,
    height: 33,
    fontSize: 17,
    paddingTop: 0,
    marginTop: 10,
    color: 'black',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
});
