import {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  PermissionsAndroid,
  Text,
  Image,
} from 'react-native';
import {STYLES} from '../../styles/globalStyles';
import {COLORS} from '../../constants/colors';
import Geolocation from 'react-native-geolocation-service';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/metrics';
import Icon from 'react-native-vector-icons/Ionicons';
import CheckIcon from 'react-native-vector-icons/FontAwesome';

import MapView, {Region, Marker} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import LocationPinIcon from '../../../assets/icons/LocationPinIcon';

const DailyStateMap = ({route}: any) => {
  const [initialRegion, setInitialRegion] = useState<Region | undefined>(
    undefined,
  );
  const [userCurrentLocation, setUserCurrentLocation] = useState<Region | undefined>(
    undefined,
  );
  const [currentLocation, setCurrentLocation] = useState('');
  const [homeLocation, setHomeLocation] = useState('');
  const [selectedLocationText, setSelectedLocationText] = useState({
    place: '',
    city: '',
    country: '',
  });
  const [markerCoordinate, setMarkerCoordinate] = useState<Region | undefined>(
    undefined,
  );

  Geocoder.init('AIzaSyCcARqn352hXLxMlwBAM4UcgJxz1u-W7wM');

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app requires access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          position => {
            const location: Region = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            };
            setInitialRegion(location);
            setUserCurrentLocation(location);
          },
          error => {
            console.warn(error.message);
          },
          {enableHighAccuracy: true, timeout: 20000, maximumAge: 2000},
        );
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    console.log("useEffct")
    if (
      initialRegion &&
      initialRegion.latitude &&
      initialRegion.longitude
    ) {
      const {latitude, longitude} = initialRegion;
     
      convertLocationToReadable(latitude, longitude).then(
        ([currentLocation, homeLocation, place, city, country]) => {
          setCurrentLocation(currentLocation);
          setHomeLocation(homeLocation);
          setSelectedLocationText({place, city, country});
        },
      );
    }
  }, [initialRegion]);

  async function convertLocationToReadable(
    latitude: number,
    longitude: number,
  ) {
    try {
      const response = await Geocoder.from(latitude, longitude);
      console.log(response.results[1].address_components);
      const addressComponents = response.results[0].address_components;

      let fullAddress = '';
      let city = '';
      let country = '';

      for (let component of addressComponents) {
        fullAddress += `${component.long_name}, `;

        if (component.types.includes('locality')) {
          city = component.long_name;
        }

        if (component.types.includes('country')) {
          country = component.long_name;
        }
      }

      const place = addressComponents[0].long_name;
      const homeLocation = `${city}, ${country}`;
      const currentLocation = fullAddress?.slice(0, -2);

      return [currentLocation, homeLocation, place, city, country];
    } catch (error) {
      console.log(error);
      return ['', '', '', '', ''];
    }
  }

  const handleMapPress = async (event: any) => {
    const location: Region = {
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    };

    try {
      const [currentLocation, homeLocation, place, city, country] =
        await convertLocationToReadable(location.latitude, location.longitude);

      setSelectedLocationText({place, city, country});
      setMarkerCoordinate(location);
    } catch (error) {
      console.log(error);
      setSelectedLocationText({place: '', city: '', country: ''});
      setMarkerCoordinate(location);
    }
  };
  if (selectedLocationText.place) {
    route?.params?.setLocation(selectedLocationText.city);
  }
  return (
    <View
      style={[
        STYLES.dev1__homeContainer,
        {
          borderTopWidth: 1,
          borderTopColor: COLORS.inActive,
          paddingHorizontal: 0,
          flex: 1,
          backgroundColor: '#F6F7F7',
        },
      ]}>
      <View
        style={{
          borderRadius: moderateScale(12),
          paddingTop: 0,
          position: 'absolute',
          right: verticalScale(0),
          left: 0,
          top: verticalScale(10),
          zIndex: 1,
          // flexDirection: 'row',
          // alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'rgba(118, 118, 128, 0.12);',
          gap: horizontalScale(10),
          marginHorizontal: horizontalScale(16),
        }}>
        <Icon
          name="mic"
          color="#818286"
          size={22}
          style={{position: 'absolute', right: 10, top: 8}}
        />
        <Icon
          name="search"
          color="#818286"
          size={20}
          style={{position: 'absolute', left: 10, top: 9}}
        />
        <GooglePlacesAutocomplete
          styles={{
            textInput: {
              height: verticalScale(38),
              color: '#000',
              paddingTop: verticalScale(13),
              borderColor: COLORS.inActive,
              backgroundColor: 'transparent',
              paddingLeft: horizontalScale(36),
            },
            description: {
              color: '#000',
            },
          }}
          textInputProps={{
            placeholderTextColor: 'rgba(60, 60, 67, 0.6)',
          }}
          placeholder="Search"
          onPress={async (data, details = null) => {
            if (details) {
              // 'data' is the selected place, 'details' is the details of the place
              const {lat, lng} = details.geometry.location;
              const location: Region = {
                latitude: lat,
                longitude: lng,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              };

              try {
                const [currentLocation, homeLocation, place, city, country] =
                  await convertLocationToReadable(lat, lng);

                setSelectedLocationText({place, city, country});
                setMarkerCoordinate(location);
                setUserCurrentLocation(location);
              } catch (error) {
                console.log(error);
                setSelectedLocationText({place: '', city: '', country: ''});
                setMarkerCoordinate(location);
                // setSelectedLocation(location);
              }
            }
          }}
          query={{
            key: 'AIzaSyCcARqn352hXLxMlwBAM4UcgJxz1u-W7wM',
            language: 'en',
            types: '(cities)',
          }}
          listViewDisplayed={false}
          fetchDetails={true}
        />
      </View>

      <View>
        <View
          style={[
            styles.location,
            {
              marginTop: verticalScale(50),
            },
          ]}>
          <View
            style={{
              width: horizontalScale(47),
              height: verticalScale(47),
              borderRadius: moderateScale(23.5),
              backgroundColor: '#F0F0F0',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              gap: 4,
            }}>
            <Icon name="navigate" size={24} color="#B8B8B8" />
          </View>
          <View>
            <Text
              style={[
                STYLES.dev1__text13,
                {color: '#7B8D95', fontFamily: 'GeneralSans-Medium'},
              ]}>
              {' '}
              Current Location{' '}
            </Text>
            <Text
              style={[
                STYLES.dev1__text13,
                {
                  color: '#7B8D95',
                  fontFamily: 'GeneralSans-Medium',
                  marginTop: verticalScale(3),
                  paddingRight: horizontalScale(40),
                },
              ]}>
              {' '}
              {currentLocation == '' ? 'Loading...' : currentLocation}
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.location,
            {
              borderTopWidth: 0,
              marginVertical: 0,
              paddingVertical: 0,
              paddingBottom: verticalScale(8),
            },
          ]}>
          <View
            style={{
              width: horizontalScale(47),
              height: verticalScale(47),
              borderRadius: moderateScale(23.5),
              backgroundColor: '#F0F0F0',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              gap: 4,
            }}>
            <Icon name="home-outline" size={24} color="#B8B8B8" />
          </View>
          <View>
            <Text
              style={[
                STYLES.dev1__text13,
                {color: '#7B8D95', fontFamily: 'GeneralSans-Medium'},
              ]}>
              {' '}
              Home{' '}
            </Text>
            <Text
              style={[
                STYLES.dev1__text13,
                {
                  color: '#7B8D95',
                  fontFamily: 'GeneralSans-Medium',
                  marginTop: verticalScale(3),
                  paddingRight: horizontalScale(40),
                },
              ]}>
              {homeLocation == '' ? 'Loading...' : homeLocation}
            </Text>
          </View>
        </View>
        {markerCoordinate && (
          <View
            style={[styles.location, {borderTopWidth: 0, marginVertical: 0}]}>
            <View
              style={{
                width: horizontalScale(47),
                height: verticalScale(47),
                borderRadius: moderateScale(23.5),
                backgroundColor: '#F0F0F0',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                gap: 4,
              }}>
              {/* <Icon name="pin-outline" size={24} color="#B8B8B8" /> */}
              <LocationPinIcon />
            </View>
            <View>
              <Text
                style={[
                  STYLES.dev1__text13,
                  {
                    color: '#7B8D95',
                    fontFamily: 'GeneralSans-Medium',
                    paddingRight: horizontalScale(60),
                  },
                ]}>
                {' '}
                {!selectedLocationText.place
                  ? 'Loading...'
                  : selectedLocationText.city}
              </Text>
              <Text
                style={[
                  STYLES.dev1__text13,
                  {
                    color: '#7B8D95',
                    fontFamily: 'GeneralSans-Medium',
                    marginTop: verticalScale(3),
                    paddingRight: horizontalScale(60),
                  },
                ]}>
                {!selectedLocationText.place
                  ? 'Loading...'
                  : selectedLocationText.city}
                , {selectedLocationText.country}
              </Text>
            </View>
            <CheckIcon
              name="check"
              color={'#8EB26F'}
              size={moderateScale(20)}
              style={{position: 'absolute', right: horizontalScale(30)}}
            />
          </View>
        )}
      </View>

      <View
        style={{
          height: verticalScale(400),
          marginTop: markerCoordinate ?  verticalScale(100): verticalScale(180),
        }}>
        {initialRegion && userCurrentLocation ? (
          <MapView
            style={{flex: 1}}
            showsUserLocation={true}
            showsMyLocationButton={true}
            followsUserLocation={true}
            showsCompass={true}
            scrollEnabled={true}
            zoomEnabled={true}
            pitchEnabled={true}
            rotateEnabled={true}
            initialRegion={initialRegion}
            region={userCurrentLocation ?? initialRegion}
            onPress={handleMapPress}>
            {markerCoordinate && <Marker coordinate={markerCoordinate} />}
          </MapView>
        ) : null}
      </View>
    </View>
  );
};

export default DailyStateMap;

const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: horizontalScale(8),
    borderRadius: moderateScale(10),
    backgroundColor: 'rgba(118, 118, 128, 0.12)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    color: 'black',
    fontSize: moderateScale(17),
    width: '100%',
  },
  location: {
    marginVertical: verticalScale(8),
    borderTopWidth: 1,
    borderTopColor: COLORS.inActive,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.inActive,
    paddingVertical: verticalScale(8),
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: horizontalScale(16),
  },
});
