import { useState, useEffect, useContext, useRef } from "react";
import { Text, View, Button, Platform } from "react-native";
import * as Notifications from "expo-notifications";
import MyContext from "../MyContext";
import * as Device from "expo-device";
import Constants from "expo-constants";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const AddNotification = () => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const { device_tokens, userData } = useContext(MyContext);

  useEffect(() => {
    setupPushNotifications();
    // console.log("device_tokens == addNotify = ", device_tokens);
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const setupPushNotifications = async () => {
    try {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission for push notifications denied.");
          return;
        }
      }

      try {
        const tokenData = await Notifications.getExpoPushTokenAsync();
        const expoPushToken = tokenData.data;

        // console.log("Expo Push Token:", expoPushToken);

        setExpoPushToken(expoPushToken);
      } catch (tokenError) {
        console.error("Error fetching Expo Push Token:", tokenError);
      }
    } catch (error) {
      console.error("Error setting up push notifications:", error);
    }
  };

  async function schedulePushNotification() {
    try {
      // Loop through each device token and send a notification
      // for (const deviceToken of device_tokens) {
      const message = {
        to: expoPushToken,
        sound: "default",
        title: "USG TEST ",
        body: `HELLO USER ${userData.name} \n This is test notification`,
        data: { anyData: "you want to send" },
      };

      const response = await fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });

      if (!response.ok) {
        console.error(
          `Failed to send notification to ${expoPushToken}:`,
          response.status
        );
      } else {
        console.log(`Notification sent successfully to ${expoPushToken}.`);
      }
      // }
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  }

  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      // token = await Notifications.getExpoPushTokenAsync({
      //   projectId: Constants.expoConfig.extra.eas.projectId,
      // }).data;
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: Constants.expoConfig.extra.eas.projectId,
        })
      ).data;
      // token = (await Notifications.getExpoPushTokenAsync({ projectId: Constants.expoConfig.extra.eas.projectId})).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    return token;
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <Text>Your expo push token: {expoPushToken}</Text>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text>
          Title: {notification && notification.request.content.title}{" "}
        </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>
          Data:{" "}
          {notification && JSON.stringify(notification.request.content.data)}
        </Text>
      </View>
      <Button
        title="Press to schedule a notification"
        onPress={async () => {
          await schedulePushNotification();
        }}
      />
    </View>
  );
};

export default AddNotification;
