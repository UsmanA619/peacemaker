/**
 * @format
 */
//video-sdk-live
import { register } from '@videosdk.live/react-native-sdk';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// Register the service
register();

AppRegistry.registerComponent(appName, () => App);
