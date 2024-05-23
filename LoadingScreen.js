import React, { useContext, useEffect, useMemo } from "react";
import { View, ActivityIndicator, StyleSheet, Dimensions, Image } from "react-native";
import MyContext from "./MyContext";
import * as SecureStore from "expo-secure-store";
import { DB_URL } from "./Components/Constants/Constants";
const { width, height } = Dimensions.get('window');

const LoadingScreen = () => {
  const memorizedislogin = useMemo(() => isLogin, [isLogin]);
  const memorizedloading = useMemo(
    () => loadingCredentials,
    [loadingCredentials]
  );
  const memorizeduserData = useMemo(() => userData, [userData]);
  const {
    loadingCredentials,
    setLoadingCredentials,
    setStoredCredentials,
    setUserData,
    userData,
    storedCredentials,
    isLogin,
    setIsLogin,
  } = useContext(MyContext);

  useEffect(() => {
    if (userData == null) {
      setLoadingCredentials(false);
    }
    // if (storedCredentials !== null) {
    //   setLoadingCredentials(false);
    // }
  }, [loadingCredentials, userData, isLogin]);

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
      } else {
        console.log("No credentials found from Loading Screen.");
        setLoadingCredentials(false); // Set loading state to false if no credentials are found
      }
    } catch (error) {
      console.error("Error retrieving credentials:", error);
      setLoadingCredentials(true); // Set loading state to false if an error occurs
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
          // setIsAdmin(true);
        }
        // setIsLogin(true);
        console.log("User Data = ", responseData[0].Data[0]);
        // handleupcomingconferencelist();
      } else {
        alert(responseData[0].Message);
        setUserData(null);
      }
    } catch (error) {
      console.error("Fetch Error!", error);
      setUserData(null);
    }
  };

  return (
    <View style={styles.container}>
      {/* <ActivityIndicator size="large" color="#0000ff" /> */}
      <Image source={require('./assets/splash.png')} style={styles.loadingImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  loadingImage: {
    width: width, 
    height: height,
    resizeMode: 'contain',
  },
});

export default LoadingScreen;
