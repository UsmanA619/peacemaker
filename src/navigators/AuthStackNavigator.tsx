import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {
  TouchableOpacity,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {COLORS} from '../constants/colors';
import AccountabilityBuddies from '../screens/auth-screens/AccountabilityBuddies';
import AccountabilityPartners from '../screens/auth-screens/AccountabilityPartner';
import WelcomeScreen from '../screens/WelcomeScreen';
import CompleteProfileScreen from '../screens/auth-screens/CompleteProfile';
import RegisterScreen from '../screens/auth-screens/RegisterScreen';
import LoginScreen from '../screens/auth-screens/LoginScreen';
import ForgetPassword from '../screens/auth-screens/ForgetPassword';
import VerifyScreen from '../screens/auth-screens/VerifyScreen';
import CreateNewPassword from '../screens/auth-screens/CreateNewPassword';
import LoadingScreen from '../screens/auth-screens/LoadingScreen';

import HomeScreen from '../screens/home-screens';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import ChatScreen from '../screens/chat-screens';

import Icon from 'react-native-vector-icons/Feather';
import CloseIcon from 'react-native-vector-icons/Ionicons';

import ChatMessagesScreen from '../screens/chat-screens/chat-view';
import ChatInfo from '../screens/chat-screens/chat-info';
import navigation from '../utils/appNavigation';
import ChatMedias from '../screens/chat-screens/chat-media';
import GroupInfo from '../screens/chat-screens/chat-info/group';
import ProviderInfo from '../screens/chat-screens/chat-info/provider';
import {chatHeaderTitle} from '../components/Chat/HeaderTitle';
import CallingScreen from '../screens/call-screens';

import {useEffect, useState} from 'react';
import {AuthStackParamList} from '../interface/types';
import MainTabNavigator from './MainTabNavigator';
import SOSNotifyScreen from '../screens/home-screens/SOSNotifyScreen';
import MyScheduleScreen from '../screens/home-screens/MyScheduleScreen';
import {moderateScale} from '../utils/metrics';
import {useAppDispatch} from '../redux/app/hooks';
import {localServer} from '../redux/features/server/serverSlice';
import {chatHeaderRight} from '../components/Chat/HeaderTitle/HeaderRight';
import MapScreen from '../screens/auth-screens/MapScreen';
import AccountablityNetwork from '../screens/profile-screens/AccountablityNetwork';
import AccountablityBuddy from '../screens/profile-screens/AccountablityBuddy';
import WeeklySummary from '../screens/profile-screens/WeeklySummary';
import ProgressBarView from '../components/Register/ProgressBarView';
import StateDetailsScreen from '../screens/dailystate-screens/StateDetailsScreen';
import BeNotifiedScreen from '../screens/dailystate-screens/BeNotifiedScreen';
import ProfileSettings from '../screens/profile-screens/ProfileSettings';
import ChatMediaImg from '../screens/chat-screens/media-view';
import ImagePreview from '../screens/chat-screens/image-preview';
import DailyStateMap from '../screens/dailystate-screens/DailyStateMap';
import PainChartScreen from '../screens/dailystate-screens/PainChartScreen';
import SummaryScreen from '../screens/dailystate-screens/SummaryScreen';
import AccountSettings from '../screens/profile-screens/AccountSettings';
import ChangePassword from '../screens/profile-screens/ChangePassword';
import PrivacyPolicy from '../screens/profile-screens/PrivacyPolicy';
import TermAndConditions from '../screens/profile-screens/TermsAndConditions';
import Support from '../screens/profile-screens/Support';
import CallUs from '../screens/profile-screens/Support/CallUs';
import MailUs from '../screens/profile-screens/Support/MailUs';
import ChatWithUs from '../screens/profile-screens/Support/ChatWithUs';
import SupportChat from '../screens/chat-screens/support-chat';
import MeetingProvider from '../screens/call-screens/MeetingProviderScreen';
import MeetingProviderScreen from '../screens/call-screens/MeetingProviderScreen';
import NewMessage from '../screens/chat-screens/create-chat';

const Stack = createNativeStackNavigator();

type NavigationProp = NativeStackNavigationProp<AuthStackParamList>;

const AuthStackNavigator = () => {
  const navigation = useNavigation<NavigationProp>();

  const [minDataSelected, setMinDataSelected] = useState(false);

  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'slide_from_right',
        animationDuration: 5000,
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        headerTintColor: COLORS.primary400,
        headerStyle: {
          backgroundColor: '#F9FAFA',
        },
        statusBarStyle: 'dark',
        statusBarColor: 'white',
      }}
      initialRouteName="DashboardScreen"
      // initialRouteName="WelcomeScreen"
    >
      <Stack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AccountabilityBuddies"
        // component={}
        children={() => (
          <AccountabilityBuddies setMinDataSelected={setMinDataSelected} />
        )}
        options={{
          headerTitle: () => <ProgressBarView progress={0.5} />,
          headerStyle: {backgroundColor: '#F9FAFA'},
          headerRight: () => {
            return (
              minDataSelected && (
                <TouchableOpacity
                  onPress={() => navigation.navigate('AccountabilityPartner')}>
                  <Text style={{color: 'black'}}>Done</Text>
                </TouchableOpacity>
              )
            );
          },
        }}
      />
      <Stack.Screen
        name="AccountabilityPartner"
        component={AccountabilityPartners}
        options={{
          headerTitle: () => <ProgressBarView progress={0.7} />,
          headerStyle: {backgroundColor: '#F9FAFA'},
        }}
      />
      <Stack.Screen
        name="CompleteProfile"
        component={CompleteProfileScreen}
        options={{
          headerTitle: () => <ProgressBarView progress={1} />,
          headerStyle: {backgroundColor: '#F9FAFA'},
        }}
      />

      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          headerTitle: () => <ProgressBarView progress={0.25} />,
          headerStyle: {backgroundColor: '#F9FAFA'},
        }}
      />

      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgetPassword"
        component={ForgetPassword}
        options={{
          headerShown: true,
          title: '',
          headerTintColor: COLORS.primary400,
        }}
      />
      <Stack.Screen
        name="VerifyScreen"
        component={VerifyScreen}
        options={{
          headerShown: true,
          title: '',
        }}
      />
      <Stack.Screen
        name="CreateNewPassword"
        component={CreateNewPassword}
        options={{
          headerShown: true,
          title: '',
          headerTintColor: COLORS.primary400,
        }}
      />
      <Stack.Screen
        name="LoadingScreen"
        component={LoadingScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DashboardScreen"
        component={MainTabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AccountablityNetwork"
        component={AccountablityNetwork}
        options={{
          headerTitleStyle: {
            color: 'black',
          },
          headerStyle: {
            backgroundColor: '#f9fafa',
          },
          headerTitle: 'Accountability Network',
          statusBarColor: '#f9fafa',
        }}
      />
      <Stack.Screen
        name="AccountablityBuddy"
        component={AccountablityBuddy}
        options={{
          headerTitleStyle: {
            color: 'black',
          },
          headerStyle: {
            backgroundColor: '#f9fafa',
          },
          headerTitle: 'Your Friend',
          statusBarColor: '#f9fafa',
        }}
      />
      <Stack.Screen
        name="WeeklySummary"
        component={WeeklySummary}
        options={{
          headerTitleStyle: {
            color: 'black',
            // marginRight: 'auto',
            // marginLeft: 'auto',
          },
          headerStyle: {
            backgroundColor: '#f9fafa',
          },
          headerTitle: 'Daily State of Stephen Carl',
          statusBarColor: '#f9fafa',
          headerRight: () => <Icon name="calendar" size={24} color="#2791B5" />,
          headerLeft: () => (
            <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
              <CloseIcon
                name="ios-arrow-back-sharp"
                size={24}
                color="#2791B5"
              />
            </TouchableWithoutFeedback>
          ),
        }}
      />
      <Stack.Screen
        name="ProfileDSDetailedView"
        component={WeeklySummary}
        options={{
          headerTitleStyle: {
            color: 'black',
          },
          headerStyle: {
            backgroundColor: '#f9fafa',
          },
          headerTitle: 'Daily State',
          statusBarColor: '#f9fafa',
          headerRight: () => <Icon name="calendar" size={24} color="#2791B5" />,
        }}
      />
      <Stack.Screen
        name="ProfileSettings"
        component={ProfileSettings}
        options={{
          headerTitleStyle: {
            color: 'black',
          },
          headerStyle: {
            backgroundColor: '#f9fafa',
          },
          headerTitle: ' ',
          statusBarColor: '#f9fafa',
        }}
      />
      <Stack.Screen
        name="AccountDetails"
        component={AccountSettings}
        options={{
          headerTitleStyle: {
            color: 'black',
          },
          headerStyle: {
            backgroundColor: '#f9fafa',
          },
          headerTitle: 'Account Details',
          statusBarColor: '#f9fafa',
        }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          headerTitleStyle: {
            color: 'black',
          },
          headerStyle: {
            backgroundColor: '#f9fafa',
          },
          headerTitle: 'Change Password',
          statusBarColor: '#f9fafa',
        }}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{
          headerTitleStyle: {
            color: 'black',
          },
          headerStyle: {
            backgroundColor: '#f9fafa',
          },
          headerTitle: '',
          statusBarColor: '#f9fafa',
        }}
      />
      <Stack.Screen
        name="TermAndConditions"
        component={TermAndConditions}
        options={{
          headerTitleStyle: {
            color: 'black',
          },
          headerStyle: {
            backgroundColor: '#f9fafa',
          },
          headerTitle: '',
          statusBarColor: '#f9fafa',
        }}
      />
      <Stack.Screen
        name="Support"
        component={Support}
        options={{
          headerTitleStyle: {
            color: 'black',
          },
          headerStyle: {
            backgroundColor: '#f9fafa',
          },
          headerTitle: '',
          statusBarColor: '#f9fafa',
        }}
      />
      <Stack.Screen
        name="CallUs"
        component={CallUs}
        options={{
          headerTitleStyle: {
            color: 'black',
          },
          headerStyle: {
            backgroundColor: '#f9fafa',
          },
          headerTitle: '',
          statusBarColor: '#f9fafa',
        }}
      />
      <Stack.Screen
        name="MailUs"
        component={MailUs}
        options={{
          headerTitleStyle: {
            color: 'black',
          },
          headerStyle: {
            backgroundColor: '#f9fafa',
          },
          headerTitle: '',
          statusBarColor: '#f9fafa',
        }}
      />
      <Stack.Screen
        name="ChatWithUs"
        component={ChatWithUs}
        options={{
          headerTitleStyle: {
            color: 'black',
          },
          headerStyle: {
            backgroundColor: '#f9fafa',
          },
          headerTitle: '',
          statusBarColor: '#f9fafa',
        }}
      />

      <Stack.Screen
        name="Messages"
        component={ChatScreen}
        options={{
          headerShown: true,
          headerTitleStyle: {
            color: 'black',
          },
          headerStyle: {
            backgroundColor: 'white',
          },
          headerRight: () => (
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('NewMessage')}>
              <View
                style={{
                  backgroundColor: COLORS.mainGreen,
                  width: 35,
                  height: 35,
                  borderRadius: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon name="edit" size={17.5} color="#fff" />
              </View>
            </TouchableWithoutFeedback>
          ),
        }}
      />

      <Stack.Screen
        name="NewMessage"
        component={NewMessage}
        options={{
          headerShown: true,
          headerTitleStyle: {
            color: 'black',
          },
          headerStyle: {
            backgroundColor: '#f9fafa',
          },
          headerTitle: 'New Message',
          statusBarColor: '#f9fafa',
          // navigationBarColor: '#f9fafa',
        }}
      />

      <Stack.Screen
        name="ChatMessagesScreen"
        component={ChatMessagesScreen}
        options={({route}) => ({
          headerShown: true,
          headerTitleStyle: {
            color: 'black',
          },
          headerStyle: {
            backgroundColor: 'white',
          },
          // statusBarColor: 'transparent',
          headerRight: () => chatHeaderRight(route),
          headerTitle: () => chatHeaderTitle(route),
          // navigationBarColor: '#f9fafa',
        })}
      />

      <Stack.Screen
        name="SupportChat"
        component={SupportChat}
        options={({route}) => ({
          headerTitleStyle: {
            color: 'black',
          },
          headerStyle: {
            backgroundColor: '#f9fafa',
          },
          headerTitle: 'Support 123',
          statusBarColor: '#f9fafa',
        })}
      />

      <Stack.Screen
        name="ChatInfo"
        component={ChatInfo}
        options={{
          headerShown: true,
          headerTitleStyle: {
            color: 'black',
          },
          headerStyle: {
            backgroundColor: '#f9fafa',
          },
          headerTitle: 'Chat Information',
          statusBarColor: '#f9fafa',
          // navigationBarColor: '#f9fafa',
        }}
      />

      <Stack.Screen
        name="GroupInfo"
        component={GroupInfo}
        options={{
          headerShown: true,
          headerTitleStyle: {
            color: 'black',
          },
          headerStyle: {
            backgroundColor: '#f9fafa',
          },
          headerTitle: 'Group Information',
          statusBarColor: '#f9fafa',
          // navigationBarColor: '#f9fafa',
        }}
      />

      <Stack.Screen
        name="ProviderInfo"
        component={ProviderInfo}
        options={{
          headerShown: true,
          headerTitleStyle: {
            color: 'black',
          },
          headerStyle: {
            backgroundColor: '#f9fafa',
          },
          headerTitle: 'Provider Information',
          statusBarColor: '#f9fafa',
          // navigationBarColor: '#f9fafa',
        }}
      />

      <Stack.Screen
        name="MeetingProviderScreen"
        component={MeetingProviderScreen}
        options={({route}) => ({
          headerShown: false,
          // headerTitleStyle: {
          //   color: 'black',
          // },
          // headerStyle: {
          //   backgroundColor: 'white',
          // },
          // statusBarColor: 'transparent',
          // headerRight: () => chatHeaderRight(route),
          // headerTitle: () => chatHeaderTitle(route),
          // navigationBarColor: '#f9fafa',
        })}
      />

      <Stack.Screen
        name="ChatMedias"
        component={ChatMedias}
        options={{
          headerShown: true,
          headerTitleStyle: {
            color: 'black',
          },
          headerStyle: {
            backgroundColor: '#f9fafa',
          },
          headerTitle: 'Media',
          statusBarColor: '#f9fafa',
          // navigationBarColor: '#f9fafa',
        }}
      />

      <Stack.Screen
        name="ChatMediaImg"
        component={ChatMediaImg}
        options={{
          headerShown: false,
          statusBarTranslucent: true,
          statusBarColor: 'transparent',
          animation: 'simple_push',
        }}
      />

      <Stack.Screen
        name="ImagePreview"
        component={ImagePreview}
        options={{
          headerShown: false,
          statusBarColor: 'black',
          statusBarStyle: 'light',
          animation: 'simple_push',
        }}
      />

      <Stack.Screen
        name="CallingScreen"
        component={CallingScreen}
        options={{
          headerShown: false,
          statusBarTranslucent: true,
          statusBarColor: 'transparent',
          statusBarStyle: 'light',
          // navigationBarColor: "transparent",
        }}
      />

      <Stack.Screen
        name="SOSNotifyScreen"
        component={SOSNotifyScreen}
        options={{
          headerTintColor: COLORS.primary400,
          title: 'Notify',
          headerTitleStyle: {
            color: COLORS.neutral900,
            fontSize: moderateScale(16),
          },
          headerRight: () => (
            <Text
              style={{color: COLORS.primary400}}
              onPress={() => navigation.goBack()}>
              cancel
            </Text>
          ),
        }}
      />
      <Stack.Screen
        name="MyScheduleScreen"
        component={MyScheduleScreen}
        options={{
          headerTintColor: COLORS.primary400,
          title: 'My Schedule',
          headerTitleStyle: {
            color: COLORS.neutral900,
            fontSize: moderateScale(16),
          },
        }}
      />
      <Stack.Screen
        name="StateDetailsScreen"
        component={StateDetailsScreen}
        options={({route}) => {
          const name = route.params?.name;
          const formattedName = name
            ? name?.charAt(0).toUpperCase() + name?.slice(1).toLowerCase()
            : '';
          return {
            headerTintColor: COLORS.primary400,
            headerTitle: formattedName,
            headerTitleStyle: {
              color: COLORS.neutral900,
              fontSize: moderateScale(16),
            },
          };
        }}
      />

      <Stack.Screen
        name="BeNotifiedScreen"
        component={BeNotifiedScreen}
        options={{
          headerTintColor: COLORS.primary400,
          title: '',
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text
                style={{
                  color: COLORS.mainGreen,
                }}>
                Save
              </Text>
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <CloseIcon name="close-outline" size={24} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="DailyStateMap"
        component={DailyStateMap}
        options={({route, navigation}) => ({
          headerTintColor: COLORS.primary400,
          title: '',
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text
                style={{
                  color: COLORS.mainGreen,
                }}>
                Select
              </Text>
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center', gap: 2}}
              onPress={() => navigation.goBack()}>
              <CloseIcon
                name="chevron-back-outline"
                size={24}
                color={COLORS.mainGreen}
              />
              <Text
                style={{
                  color: COLORS.mainGreen,
                }}>
                Back
              </Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="PainChartScreen"
        component={PainChartScreen}
        options={({route}) => ({
          headerTintColor: COLORS.primary400,
          headerTitle: 'Pain Chart',
          headerTitleStyle: {
            color: COLORS.neutral900,
            fontSize: moderateScale(16),
          },
        })}
      />
      <Stack.Screen
        name="SummaryScreen"
        component={SummaryScreen}
        options={({route}) => ({
          headerTintColor: COLORS.primary400,
          headerTitle: 'Summary',
          headerTitleStyle: {
            color: COLORS.neutral900,
            fontSize: moderateScale(16),
          },
        })}
      />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
