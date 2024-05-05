import React, { useCallback, useEffect, useMemo, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";
import DrawerNav from "./DrawerNav";
import { DB_URL } from "./Components/Constants/Constants";
import MyContext from "./MyContext";
import * as SecureStore from "expo-secure-store";
import LoadingScreen from "./LoadingScreen"; // Import the loading screen component
import Web from "./Web";
import debounce from "lodash/debounce";
import performance from "performance-now";
import Gettoken from "./Components/Getoken";
import * as Notifications from "expo-notifications";
import { Animated } from "react-native";
import * as Device from 'expo-device';

const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isNotification, setIsNotification] = useState(false);
  const [storedCredentials, setStoredCredentials] = useState(null);
  const [ConferenceData, setConferenceData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [user_name, setUser_name] = useState();
  const [price, setPrice] = useState();
  const [isloading, setIsloading] = useState(false);
  const [isDrawerClicked, setIsDrawerClicked] = useState(false);
  const [loadingCredentials, setLoadingCredentials] = useState(true);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [device_tokens, setDevice_tokens] = useState([]);


  const memoizedUserData = useMemo(() => userData, [userData]);
  const memoizedConferenceData = useMemo(
    () => ConferenceData,
    [ConferenceData]
  );
  let startTime = "";
  let startTimeCdata = "";
  let startTimeUdata = "";
  let startTimeFdata = "";

  useEffect(() => {
    console.log("UserData = ", userData);
    // if (Device.isDevice) {
    //   if (expoPushToken.length == 0) {
    //     setupPushNotifications();
    //   }
    // }
    startTime = performance();
    startTimeCdata = performance();
    startTimeUdata = performance();
    startTimeFdata = performance();
    if (storedCredentials == null) {
      getStoredCredentials();
    }

    // if (expoPushToken.length !== 0 && userData !== null) {
    //   sendTokenToServer(expoPushToken);
    // }

    // handleupcomingconferencelist();
  }, [price, ConferenceData]);

  const animatedValue = new Animated.Value(0);

  // Attach a listener to the animated value
  animatedValue.addListener((value) => {
    console.log("Animated value updated:", value.value);
  });

  // Later in your code or component lifecycle
  Animated.timing(animatedValue, {
    toValue: 1,
    duration: 1000,
    useNativeDriver: false, // Note: UseNativeDriver requires 'value' listener to be added
  }).start();

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

      // console.log("expo token from function = ", expoPushToken);
      const response = await fetch(APIURL, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(Data),
      });

      const responseData = await response.json();

      if (responseData[0].Message === "Success") {
        const tokens = responseData[0].Data.map((item) => item);
        setDevice_tokens(tokens);
        console.log("Device Tokens:", tokens);
      } else {
        console.log("Error user token ", responseData[0].Message);
      }

      // console.log("Response = ", responseData[0].Data);

      console.log("data toke", Data);
    } catch (error) {
      console.error("ERROR FOUND Storing token = ", error);
    }
  };

  const update = async () => {
    try {
      const APIURL = `${DB_URL}flag.php`;

      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };

      const response = await fetch(APIURL, {
        method: "GET",
        headers: headers,
      });

      const responseData = await response.json();

      if (responseData[0].Message == "Success") {
        const endTime = performance();
        const elapsedTime = endTime - startTimeFdata;
        console.log(`Flag loaded in ${elapsedTime} milliseconds`);
        console.log("flag updated!", responseData[0].data[0]);
        setPrice(responseData[0].data[0]);
        if (responseData[0].data[0].price != price.price) {
          console.log("Data changed...........", price);
        }
      }
    } catch (error) {
      console.log("flag updated erroe", error);
    }
  };

  // Run handleupcomingconferencelist again when ConferenceData changes
  // useEffect(() => {
  //   handleupcomingconferencelist();
  // }, [ConferenceData]);

  // useEffect(() => {
  //   debouncedGetStoredCredentials();
  //   return () => {
  //     debouncedGetStoredCredentials.cancel(); // Cleanup debounce on unmount
  //   };
  // }, [memoizedConferenceData, memoizedUserData, debouncedGetStoredCredentials]);

  const getStoredCredentials = async () => {
    try {
      const storedEmail = await SecureStore.getItemAsync("email");
      const storedPassword = await SecureStore.getItemAsync("password");
      const storedUsername = await SecureStore.getItemAsync("username");
      if (storedEmail && storedPassword) {
        setStoredCredentials({
          email: storedEmail,
          password: storedPassword,
          username: storedUsername,
        });
        getUserData(storedEmail, storedPassword);
        // console.log('Stored Credentials App Screen:', { email: storedEmail, password: storedPassword, username: storedUsername });
        const endTime = performance();
        const elapsedTime = endTime - startTime;
        console.log(`Data loaded in ${elapsedTime} milliseconds`);
      } else {
        console.log("No credentials found App.");
        setLoadingCredentials(false); // Set loading state to false if no credentials are found
      }
    } catch (error) {
      console.error("Error retrieving credentials:", error);
      setLoadingCredentials(false); // Set loading state to false if an error occurs
    }
  };

  const getUserData = async (storedEmail, storedPassword) => {
    try {
      const APIURL = `${DB_URL}login.php`;
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };

      const Data = {
        Email: storedEmail,
        Password: storedPassword,
      };

      const response = await fetch(APIURL, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(Data),
      });

      const responseData = await response.json();

      if (responseData[0].Message === "Success") {
        setUserData(responseData[0].Data[0]);
        if (responseData[0].Data[0].isAdmin == "true") {
          console.log("Admin Login");
          setIsAdmin(true);
        }
        setIsLogin(true);
        handleupcomingconferencelist();
        const endTime = performance();
        const elapsedTime = endTime - startTime;
        console.log(`User Data loaded in ${elapsedTime} milliseconds`);
      } else {
        alert(responseData[0].Message);
        setUserData(null);
      }
    } catch (error) {
      console.error("Fetch Error!", error);
      setUserData(null);
    }
  };

  const debouncedGetStoredCredentials = useCallback(
    debounce(() => getStoredCredentials(), 500),
    []
  );

  // const handleupcomingconferencelist = async () => {
  //   try {
  //     var APIURL = `${DB_URL}GetConferenceDetails.php`;

  //     var headers = {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     };

  //     fetch(APIURL, {
  //       method: "GET",
  //       headers: headers,
  //     })
  //       .then((Response) => Response.json())
  //       .then(async (Response) => {
  //         if (Response[0].Message == "Success") {
  //           setConferenceData(Response[0].data);
  //           setIsloading(true);
  //         } else {
  //           alert(Response[0].Message);
  //           setConferenceData(null);
  //           setIsloading(false);
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Can not get data!");
  //         setConferenceData(null);
  //         setIsloading(false);
  //       });
  //   } catch (error) {
  //     console.error("Fetch Error!");
  //     setConferenceData(null);
  //     setIsloading(false);
  //   }
  // };
  const handleupcomingconferencelist = async () => {
    try {
      const APIURL = `${DB_URL}GetConferenceDetails.php`;
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

      const responseData = await response.text(); // Get the response as text

      if (responseData) {
        try {
          const parsedData = JSON.parse(responseData); // Parse the response
          if (parsedData[0].Message === "Success") {
            // console.log(`C Data =`, parsedData[0].data);
            // setConferenceData(parsedData[0].data);
            // console.log("first");
            // if (
            //   JSON.stringify(parsedData[0].data) !==
            //   JSON.stringify(ConferenceData)
            // ) {
            //   setConferenceData(parsedData[0].data); // Update state only if there are changes
            // }
            // else{
            //   console.log("No changes found");
            // }
            setConferenceData(parsedData[0].data); // Update state only if there are changes
            setIsloading(true);
            setLoadingCredentials(false); // Set loading state to false once credentials are fetched
            const endTime = performance();
            const elapsedTime = endTime - startTime;
            // console.log(`C Data loaded in ${elapsedTime} milliseconds`);
          } else {
            alert(parsedData[0].Message);
            setConferenceData(null);
            setIsloading(false);
            setLoadingCredentials(true); // Set loading state to false once credentials are fetched
          }
        } catch (error) {
          console.error("Error parsing response data:", error);
          alert("Error parsing response data");
        }
      } else {
        console.error("Empty response from server");
        // Handle empty response here
      }
    } catch (error) {
      console.error("Error fetching conference data:", error);
      setConferenceData(null);
      setIsloading(false);
    }
  };

  return (
    <>
      <StatusBar style="light" />
      {/* <Gettoken /> */}
      {loadingCredentials ? ( // Conditionally render based on loadingCredentials state
        <MyContext.Provider
          value={{
            isNotification,
            setIsNotification,
            isAdmin,
            setIsAdmin,
            storedCredentials,
            setStoredCredentials,
            isLogin,
            setIsLogin,
            ConferenceData,
            setConferenceData,
            user_name,
            setUser_name,
            isloading,
            setIsloading,
            isDrawerClicked,
            setIsDrawerClicked,
            userData,
            setUserData,
            loadingCredentials,
            setLoadingCredentials,
          }}
        >
          <LoadingScreen />
        </MyContext.Provider>
      ) : (
        <NavigationContainer>
          <MyContext.Provider
            value={{
              isNotification,
              setIsNotification,
              isAdmin,
              setIsAdmin,
              storedCredentials,
              setStoredCredentials,
              isLogin,
              setIsLogin,
              ConferenceData,
              setConferenceData,
              user_name,
              setUser_name,
              isloading,
              setIsloading,
              isDrawerClicked,
              setIsDrawerClicked,
              userData,
              setUserData,
              loadingCredentials,
              setLoadingCredentials,
              device_tokens,
              setDevice_tokens,
              expoPushToken
            }}
          >
            <DrawerNav />
          </MyContext.Provider>
        </NavigationContainer>
      )}
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
