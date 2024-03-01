import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import DrawerNav from './DrawerNav';
import { DB_URL } from './Components/Constants/Constants';
import MyContext from './MyContext';
import * as SecureStore from 'expo-secure-store';
import LoadingScreen from './LoadingScreen'; // Import the loading screen component
import Web from './Web';

const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isNotification, setIsNotification] = useState(false);
  const [storedCredentials, setStoredCredentials] = useState(null);
  const [ConferenceData, setConferenceData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [user_name, setUser_name] = useState();
  const [isloading, setIsloading] = useState(false);
  const [isDrawerClicked, setIsDrawerClicked] = useState(false);
  const [loadingCredentials, setLoadingCredentials] = useState(true);

  useEffect(() => {
    console.log("ConferenceData= ", ConferenceData.length, "storedCredentials=", storedCredentials, "userData=", userData.length);
    if (ConferenceData.length == 0 && storedCredentials == null && userData.length == 0) {
      // Execute getStoredCredentials only when all conditions are met
      getStoredCredentials();
    }else{
      console.log("storedCredentials =", storedCredentials, "userData =", userData);
      handleupcomingconferencelist();
    }
    // getStoredCredentials();
  }, [getStoredCredentials, handleupcomingconferencelist, getUserData, ConferenceData]);

  const getStoredCredentials = async () => {
    try {
      const storedEmail = await SecureStore.getItemAsync('email');
      const storedPassword = await SecureStore.getItemAsync('password');
      const storedUsername = await SecureStore.getItemAsync('username');
      if (storedEmail && storedPassword) {
        setStoredCredentials({ email: storedEmail, password: storedPassword, username: storedUsername });
        getUserData(storedEmail, storedPassword);
        // console.log('Stored Credentials App Screen:', { email: storedEmail, password: storedPassword, username: storedUsername });
      } else {
        console.log('No credentials found App.');
        setLoadingCredentials(false); // Set loading state to false if no credentials are found
      }
    } catch (error) {
      console.error('Error retrieving credentials:', error);
      setLoadingCredentials(false); // Set loading state to false if an error occurs
    }
  };

  const getUserData = async (storedEmail, storedPassword) => {
    try {
      const APIURL = `${DB_URL}login.php`;
      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };

      const Data = {
        Email: storedEmail,
        Password: storedPassword
      };

      const response = await fetch(APIURL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(Data)
      });

      const responseData = await response.json();

      if (responseData[0].Message === "Success") {
        setUserData(responseData[0].Data[0]);
        if (responseData[0].Data[0].isAdmin == "true") {
          console.log("Admin Login")
          setIsAdmin(true);
        }
        setIsLogin(true);
        console.log("User Data = ", responseData[0].Data[0]);
        handleupcomingconferencelist();
      } else {
        alert(responseData[0].Message);
        setUserData(null);
      }
    } catch (error) {
      console.error("Fetch Error!", error);
      setUserData(null);
    }
  }

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
            setConferenceData(parsedData[0].data);
            setIsloading(true);
            setLoadingCredentials(false); // Set loading state to false once credentials are fetched
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
      {loadingCredentials ? ( // Conditionally render based on loadingCredentials state
        <LoadingScreen />
      )

        : (
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
                setUserData
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
