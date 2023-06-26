//Firebase-@SAM
import messaging, { firebase } from "@react-native-firebase/messaging";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log("firebase messaging authorization status:", authStatus);
    getFirebaseDeviceToken();
  }
}

async function getFirebaseDeviceToken() {
  try {
    let messagingToken = await AsyncStorage.getItem("@messagingToken");
    if (messagingToken == null) {
      messagingToken = await messaging().getToken();
      console.log('firebase messaging',messagingToken);
      await AsyncStorage.setItem("@messagingToken", JSON.stringify(messagingToken));
    } else {
      console.log("firebase messaging",messagingToken);
    }
  } catch (e) {
    console.log("getToken", e);
  }
}

const notificationListener = () => {
  requestUserPermission()
  messaging().onNotificationOpenedApp((remoteMessage) => {
    console.log("app opened from notification", remoteMessage.notification);
  });

  messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      if (remoteMessage) {
        console.log(
          "notification opened app from quit state",
          remoteMessage.notification
        );
      }
    });

  messaging().onMessage(async (remoteMessage) => {
    console.log("notification on foreground state", remoteMessage);
  });
};

export { requestUserPermission, notificationListener };
