import { PermissionsAndroid } from "react-native";

const Permissions = [
  PermissionsAndroid.PERMISSIONS.CAMERA,
  PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
  PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
  PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
];

export const requestPermissions = async () => {
  try {
    await PermissionsAndroid.requestMultiple(Permissions).then((results) => {
      if (!(results["android.permission.ACCESS_FINE_LOCATION"] == "granted")) {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "“Peacemaker” would like to access your location",
            message:
              "We need access to your location to show you relevant information that is needed by the app.",
          }
        );
      }
      if (!(results["android.permission.CAMERA"] == "granted")) {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
          title: "“Peacemaker” would like to Access the Camera",
          message:
            "Peacemaker requires access to the camera to add receipts to transactions and take photos of documents when requested.",
        });
      }
      if (!(results["android.permission.POST_NOTIFICATIONS"] == "granted")) {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          {
            title: "“Peacemaker” would like to Send You Notifications",
            message:
              "Notifications may include alerts, sounds, and icons badges. These can be configured in Settings.",
          }
        );
      }
      if (!(results["android.permission.RECORD_AUDIO"] == "granted")) {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: "“Peacemaker” would like to Access the Microphone",
            message:
              "Peacemaker requires access to your microphone so you can use your voice to search for anythings, tracking your progress and more. ",
          }
        );
      }
    });
  } catch (err) {
    console.warn(err);
  }
};
