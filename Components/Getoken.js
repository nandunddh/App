import { useState, useEffect, useContext } from "react";
import { Text, View } from "react-native";
import * as Notifications from "expo-notifications";
import { DB_URL } from "./Constants/Constants";
import MyContext from "../MyContext";

const Gettoken = () => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const {userData} = useContext(MyContext);

  useEffect(() => {
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

        const tokenData = await Notifications.getExpoPushTokenAsync();
        const expoPushToken = tokenData.data;

        // Log or use the expoPushToken as needed
        console.log("Expo Push Token:", expoPushToken);

        // You can send the token to your server here if needed
        // if (expoPushToken) {
        //   await sendTokenToServer(expoPushToken);
        // }

        setExpoPushToken(expoPushToken);
      } catch (error) {
        console.error("Error setting up push notifications:", error);
      }
    };

    console.log("expoPushToken = ", expoPushToken);

    setupPushNotifications();
  }, [expoPushToken]); // Added expoPushToken as a dependency

  // console.log("Expo = ", expoPushToken);
  const sendTokenToServer = async (expoPushToken) => {
    try {
      const APIURL = `${DB_URL}store_token.php`;
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };

      const Data = {
        token: expoPushToken,
        email: userData.email,
      };

      const response = await fetch(APIURL, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(Data),
      });

      const responseData = await response.json();

      if (responseData[0].Message === "Success") {
        console.log("Data user token ", response.Data);
      } else {
        alert(responseData[0].Message);
      }
    } catch (error) {
      console.error("ERROR FOUND Storing token = ", error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Your expo push token: {expoPushToken}</Text>
      {/* <Text>Your expo seb token response: {response}</Text> */}
    </View>
  );
};

export default Gettoken;
