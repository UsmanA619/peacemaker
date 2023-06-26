import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Platform,
  PermissionsAndroid,
  TouchableOpacity,
  Image,
  Keyboard,
  Alert,
  Text,
  Dimensions,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {
  CameraRoll,
  PhotoIdentifier,
} from '@react-native-camera-roll/camera-roll';
import {useIsFocused} from '@react-navigation/native';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';

import Navigation from '../../../utils/appNavigation';
import placeholderImg from '../../../constants/extras';
import {useIsKeyboardShowing} from '../../../utils/Hooks/useIsKeyboard';

interface Props {
  route: any;
}

export default function NewMessage({route}: Props) {
  const [galleryImages, setGalleryImages] = React.useState<PhotoIdentifier[]>(
    [],
  );
  const [showImages, setShowImages] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [currentSheetIndex, setCurrentSheetIndex] = React.useState(0);
  const [toTxt, setToTxt] = React.useState('');
  const [toTags, setToTags] = React.useState<string[]>([]);
  const [snapPoints, setSnapPoints] = React.useState<string[]>([
    `${Math.floor((46 / Dimensions.get('screen').height) * 100 + 8)}%`,
    '50%',
    '80%',
  ]);

  const isFocused = useIsFocused();
  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const inputRef = React.useRef();

  const isKeyboard = useIsKeyboardShowing();

  React.useEffect(() => {
    const tempSnapPoints = [
      `${Math.floor(
        (46 / Dimensions.get('screen').height) * 100 + (isKeyboard ? 8 : 4),
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
    if (!toTags.length) if (toTxt == '') return;

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
    // showImagesWithAnimation();
  };

  React.useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  }, []);

  React.useEffect(() => {
    if (!isFocused) {
      setShowImages(false);
      setCurrentSheetIndex(0);
    }
  }, [isFocused]);

  return (
    <View style={{flex: 1, backgroundColor: '#f9fafa'}}>
      <View style={{flex: 1}}>
        <View
          style={{
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: '#EAEAEA',
            flexDirection: 'row',
            marginTop: 10,
            alignItems: 'center',
            paddingVertical: 5,
            maxWidth: '100%',
            flexWrap: 'wrap',
            rowGap: 5,
          }}>
          <Text
            style={{
              marginLeft: 19,
              fontSize: 16,
              fontWeight: '400',
              color: '#9C9C9C',
            }}>
            To:
          </Text>
          {toTags.map((t, i) => (
            <View
              key={i}
              style={{
                backgroundColor: 'rgba(142, 178, 111, 0.3)',
                borderRadius: 50,
                borderWidth: 1,
                borderColor: '#8EB26F',
                flexDirection: 'row',
                padding: 4,
                alignItems: 'center',
                paddingHorizontal: 7,
                marginLeft: 7,
              }}>
              <Image
                style={{width: 22, height: 22, borderRadius: 50}}
                source={placeholderImg}
              />
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '400',
                  color: 'black',
                  marginLeft: 8,
                }}>
                {t}
              </Text>
            </View>
          ))}
          <TextInput
            ref={inputRef}
            style={{
              marginLeft: 6,
              color: 'black',
              //   height: '100%',
              flex: 1,
              padding: 0,
              paddingLeft: 3,
            }}
            value={toTxt}
            onChangeText={setToTxt}
            onKeyPress={e => {
              if (e.nativeEvent.key === ' ') {
                toTags.push(toTxt);
                setToTags([...toTags]);
                setTimeout(() => {
                  setToTxt('');
                }, 100);
              } else if (e.nativeEvent.key === 'Backspace' && toTxt === '') {
                toTags.pop();
                setToTags([...toTags]);
              }
            }}
          />
        </View>
      </View>

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
              height: 46,
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
                  if (!message || !toTags.length)
                    if (toTxt == '' || !message) return;
                  Navigation.navigate('ChatMessagesScreen', {
                    group: toTags.length > 1 ? 1 : 0,
                    title:
                      toTags.length > 1
                        ? `${toTags[0]} and ${toTags[1]}`
                        : `${toTxt == '' ? toTags[0] : toTxt}`,
                    provider: 0,
                  });
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
                    paddingHorizontal: 0,
                    // paddingTop: 20
                  }}>
                  {galleryImages?.map(image => (
                    <TouchableOpacity
                      onPress={() => {
                        Navigation.navigate('ImagePreview', {
                          img: image.node.image.uri,
                          recentParams: {
                            group: toTags.length > 1 ? 1 : 0,
                            title:
                              toTags.length > 1
                                ? `${toTags[0]} and ${toTags[1]}`
                                : `${toTxt == '' ? toTags[0] : toTxt}`,
                            provider: 0,
                          },
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
    height: '100%',
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
