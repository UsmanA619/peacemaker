import {NavigationContainer} from '@react-navigation/native';
import {useEffect} from 'react';
import {notificationListener} from './src/utils/pushNotification-helper';
import {requestPermissions} from './src/utils/permissions';
import AuthStackNavigator from './src/navigators/AuthStackNavigator';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import MainTabNavigator from './src/navigators/MainTabNavigator';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Navigation from './src/utils/appNavigation';
import HomeStackNavigator from './src/navigators/HomeStackNavigator';
import React from 'react';
import {Provider} from 'react-redux';
import store from './src/redux/app/store';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import 'react-native-gesture-handler';
import {RootSiblingParent} from 'react-native-root-siblings';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

let persistor = persistStore(store);

const App = () => {
  useEffect(() => {
    requestPermissions();
    notificationListener();

    () => {
      return;
    };
  }, []);

  const Tab = createBottomTabNavigator();

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RootSiblingParent>
            <GestureHandlerRootView style={{ flex: 1}}>
              <NavigationContainer
                ref={Navigation.navigationRef}
                onStateChange={state => {
                  // const previousRouteName = Navigation.routeNameRef.current;
                  const currentRouteName = Navigation.getActiveRouteName(state);
                  // if (previousRouteName !== currentRouteName) {
                  // 	setCurrentScreen(currentRouteName);
                  // }
                  Navigation.routeNameRef.current = currentRouteName;
                }}>
                <AuthStackNavigator />
              </NavigationContainer>
            </GestureHandlerRootView>
          </RootSiblingParent>
        </PersistGate>

        <Toast />
      </Provider>
    </>
  );
};

export default App;
