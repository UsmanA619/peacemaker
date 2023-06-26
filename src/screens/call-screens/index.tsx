import React from 'react';
import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import CallActionBox from '../../components/Call/CallActionBox';
import LinearGradient from 'react-native-linear-gradient';
import placeholderImg from '../../constants/extras';

const CallingScreen = ({route}) => {
  const [isMyVid, setIsMyVid] = React.useState(false);
  return (
    <LinearGradient
      colors={['#3b5266', '#0e2646', '#0e2646']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      locations={[0, 0.5, 1]}
      style={styles.page}>
      {route.params.isGroup !== 1 ? (
        <>
          <View style={styles.cameraPreview}>
            <View style={styles.info}>
              <Image
                style={styles.image}
                source={placeholderImg}
              />
              <View style={{paddingHorizontal: 12}}>
                <Text style={styles.name}>Thomas Edison</Text>
                <Text style={styles.phoneNumber}>connecting...</Text>
              </View>
            </View>
          </View>

          {isMyVid ? (
            <View style={styles.secondCamera}>
              <View style={styles.nameBox}>
                <Text style={{fontSize: 14, fontWeight: '700', color: 'white'}}>
                  AK
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '500',
                  color: 'white',
                  marginTop: 3,
                }}>
                You
              </Text>
            </View>
          ) : null}
        </>
      ) : (
        <View
          style={{
            flex: 1,
            marginTop: 60,
            // paddingHorizontal: 15,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            columnGap: 15,
            marginBottom: 1,
            // backgroundColor: "red"
          }}>
          {[...Array(3)].map((_, index) => (
            <View
              key={index}
              style={[styles.secondCamera, styles.grpSecondCamera]}>
              <View style={[styles.nameBox, {width: 47, height: 47}]}>
                <Text style={{fontSize: 14, fontWeight: '700', color: 'white'}}>
                  AK
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '500',
                  color: 'white',
                  marginTop: 5,
                }}>
                You
              </Text>
            </View>
          ))}
        </View>
      )}

      <CallActionBox
        onVideo={() => setIsMyVid(!isMyVid)}
        onHangupPress={() => null}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  secondCamera: {
    width: 134,
    height: 192,
    borderRadius: 12,
    backgroundColor: 'black',
    alignSelf: 'flex-end',
    marginRight: 12,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  grpSecondCamera: {
    width: '45%',
    marginRight: 0,
    marginBottom: '2.5%',
    height: `${95 / 2}%`,
    backgroundColor: 'rgba(242, 242, 242, 0.11)',
    alignSelf: "auto"
  },
  nameBox: {
    width: 42,
    height: 42,
    borderRadius: 50,
    backgroundColor: '#2791B5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  page: {
    height: '100%',
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 80,
    marginLeft: 25,
  },
  cameraPreview: {
    flex: 1,
    padding: 10,
    paddingHorizontal: 10,
  },
  image: {
    width: 55,
    height: 55,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#D8D8D8',
  },
  name: {
    fontSize: 30,
    fontWeight: '400',
    color: 'white',
    marginBottom: 5,
  },
  phoneNumber: {
    fontSize: 20,
    color: 'white',
    fontWeight: '400',
    marginLeft: 1,
  },
});

export default CallingScreen;
