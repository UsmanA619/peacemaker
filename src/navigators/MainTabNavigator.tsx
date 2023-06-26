import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home-screens';
import ChallengeScreen from '../screens/challenge-screens/ChallengeScreen';
import JournalScreen from '../screens/journal-screens/JournalScreen';
import DailyStateScreen from '../screens/dailystate-screens';
import ProfileScreen from '../screens/profile-screens/ProfileScreen';
import {horizontalScale, verticalScale} from '../utils/metrics';
import Icon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';

import {COLORS} from '../constants/colors';
import {View, Text} from 'react-native';
import { useAppSelector } from '../redux/app/hooks';
const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  const user = useAppSelector((state: any) => state.user.data);
  const fullName = user.firstName?.slice(0,1).toUpperCase() + user.lastName?.slice(0,1).toUpperCase();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
        tabBarActiveTintColor: COLORS.primary500,
        tabBarInactiveTintColor: COLORS.inActive,
        tabBarStyle: {
          backgroundColor: '#F1F1F1',
          height: verticalScale(82),
          paddingTop: 20,
          paddingBottom: 20,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <>
              <View
                style={{
                  borderTopWidth: focused ? 4 : 0,
                  width: '100%',
                  height: '100%',
                  borderColor: COLORS.mainGreen,
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  top: -verticalScale(22),
                }}></View>
              <Icon
                name={focused ? 'home' : 'home-outline'}
                size={18}
                color={focused ? COLORS.mainGreen : COLORS.inActive}
                style={{marginTop: -verticalScale(12)}}
              />
            </>
          ),
        }}
      />
      <Tab.Screen
        name="Challenge"
        component={ChallengeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <>
              <View
                style={{
                  borderTopWidth: focused ? 4 : 0,
                  width: '100%',
                  height: '100%',
                  borderColor: COLORS.mainGreen,
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  top: -verticalScale(22),
                }}></View>
              <Icon
                name={focused ? 'flash' : 'flash-outline'}
                size={18}
                color={focused ? COLORS.mainGreen : COLORS.inActive}
                style={{marginTop: -verticalScale(12)}}
              />
            </>
          ),
        }}
      />
      <Tab.Screen
        name="Journal"
        component={JournalScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <>
              <View
                style={{
                  borderTopWidth: focused ? 4 : 0,
                  width: '100%',
                  height: '100%',
                  borderColor: COLORS.mainGreen,
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  top: -verticalScale(22),
                }}></View>
              <FeatherIcon
                name={focused ? 'edit-3' : 'edit-3'}
                size={18}
                color={focused ? COLORS.mainGreen : COLORS.inActive}
                style={{marginTop: -verticalScale(12)}}
              />
            </>
          ),
        }}
      />
      <Tab.Screen
        name="DailyStateScreen"
        component={DailyStateScreen}
        options={{
          title: 'Daily State',
          tabBarIcon: ({focused}) => (
            <>
              <View
                style={{
                  borderTopWidth: focused ? 4 : 0,
                  width: '100%',
                  height: '100%',
                  borderColor: COLORS.mainGreen,
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  top: -verticalScale(22),
                }}></View>
              <FeatherIcon
                name={focused ? 'calendar' : 'calendar'}
                size={18}
                color={focused ? COLORS.mainGreen : COLORS.inActive}
                style={{marginTop: -verticalScale(12)}}
              />
            </>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <>
              <View
                style={{
                  borderTopWidth: focused ? 4 : 0,
                  width: '100%',
                  height: '100%',
                  borderColor: COLORS.mainGreen,
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  top: -verticalScale(22),
                }}></View>
              {/* <Icon
                name={focused ? 'person' : 'person-outline'}
                size={18}
                color={focused ? COLORS.mainGreen : COLORS.inActive}
                style={{marginTop: -verticalScale(12)}}
              /> */}
              <View
                style={{
                  width: 21,
                  height: 21,
                  borderRadius: 50,
                  backgroundColor: focused ? COLORS.mainGreen : COLORS.inActive,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: -verticalScale(12)
                }}>
                <Text
                  style={{
                    fontSize: 9,
                    fontWeight: '600',
                    color: 'white',
                  }}>
                  {fullName}
                </Text>
              </View>
            </>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
