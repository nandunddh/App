import React, { useState, useEffect, useRef } from "react";
import { Text, View, TextInput, Button, Alert, ScrollView, Linking } from "react-native";
import * as Notifications from "expo-notifications";
import { DB_URL } from "./Constants/Constants"; // Assuming DB_URL is correctly defined

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const AddNotification = () => {
  const [expoPushTokens, setExpoPushTokens] = useState([]);
  const [notification, setNotification] = useState(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [data, setData] = useState("");
  const [pdfLink, setPdfLink] = useState("");

  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    fetchTokens(); // Fetch tokens on component mount

    // Set up notification listeners
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );

    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      async (response) => {
        console.log("Notification response:", response);

        const url = response.notification.request.content.data.url;
        if (url) {
          // Open the link when notification is tapped
          await Linking.openURL(url);
        }
      }
    );

    // Clean up listeners on unmount
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const fetchTokens = async () => {
    try {
      const APIURL = `${DB_URL}fetch_token.php`;
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };

      const response = await fetch(APIURL, {
        method: "GET",
        headers: headers,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      console.log("Fetched tokens:", responseData); // Log the fetched tokens to see their structure

      if (responseData && Array.isArray(responseData)) {
        // Extract tokens from nested data
        const tokensArray = responseData.reduce((acc, item) => {
          if (item.data && Array.isArray(item.data)) {
            acc.push(...item.data);
          }
          return acc;
        }, []);

        setExpoPushTokens(tokensArray);
      } else {
        console.error("Invalid response format:", responseData);
        Alert.alert("Error", "Invalid response format from server");
      }
    } catch (error) {
      console.error("Error fetching tokens:", error);
      Alert.alert("Error", "Failed to fetch tokens");
    }
  };

  const sendNotificationsToAllTokens = async () => {
    try {
      const sendRequests = expoPushTokens.map(async (tokenObj, index) => {
        if (!tokenObj || !tokenObj.token) {
          console.error(`Token ${index} is undefined or has no token property:`, tokenObj);
          return;
        }

        const message = {
          to: tokenObj.token,
          sound: "default",
          title: title,
          body: body,
          data: { url: pdfLink, text: data }, // Include URL in data
        };

        const res = await fetch("https://exp.host/--/api/v2/push/send", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(message),
        });

        if (!res.ok) {
          throw new Error(`Failed to send notification to ${tokenObj.token}: ${res.status}`);
        } else {
          console.log(`Notification sent successfully to ${tokenObj.token}`);
        }
      });

      await Promise.all(sendRequests);
      Alert.alert("Notifications sent successfully to all tokens");
    } catch (error) {
      console.error("Error sending notifications:", error);
      Alert.alert("Error", "Failed to send notifications");
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "space-around",
        padding: 20,
      }}
    >
      <Text>Send a Notification</Text>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={(text) => setTitle(text)}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, width: '80%' }}
      />
      <TextInput
        placeholder="Body"
        value={body}
        onChangeText={(text) => setBody(text)}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, width: '80%' }}
      />
      <TextInput
        placeholder="Data"
        value={data}
        onChangeText={(text) => setData(text)}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, width: '80%' }}
      />
      <TextInput
        placeholder="PDF Link"
        value={pdfLink}
        onChangeText={(text) => setPdfLink(text)}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, width: '80%' }}
      />
      <Button
        title="Send Test Notification"
        onPress={sendNotificationsToAllTokens}
        disabled={expoPushTokens.length === 0}
      />
    </ScrollView>
  );
};

export default AddNotification;
