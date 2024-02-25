import "react-native-gesture-handler"
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StackNav } from './StackNav';
import DrawerNav from './DrawerNav';
import BottomTab from "./TabNav";
import { useEffect, useRef, useState } from "react";
import { DB_URL } from "./Components/Constants/Constants";
import MyContext from "./MyContext";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";


const App = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isNotification, setIsNotification] = useState(false);
  const [storedCredentials, setStoredCredentials] = useState(null);
  const [ConferenceData, setConferenceData] = useState([]);
  const [user_name, setUser_name] = useState();
  const [isloading, setIsloading] = useState(false);
  const [isDrawerClicked, setIsDrawerClicked] = useState(false);

  useEffect(() => {
    handleupcomingconferencelist()
    // console.log("storedCredentials App.js == ", storedCredentials);
  }, [isLogin, isNotification, storedCredentials, ConferenceData, isloading])


  const handleupcomingconferencelist = async () => {
    try {
      var APIURL = `${DB_URL}GetConferenceDetails.php`;

      var headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };

      fetch(APIURL, {
        method: "GET",
        headers: headers,
      })
        .then((Response) => Response.json())
        .then(async (Response) => {
          if (Response[0].Message == "Success") {
            // alert(Response[0].Message);
            // console.log("Data upcomingconferencelist data Base == ", Response[0].data)

            setConferenceData(Response[0].data);
            // console.log("Live ==== ", upcomingConferencelist.token);
            setIsloading(true);
          } else {
            alert(Response[0].Message);
          }
        })
        .catch((error) => {
          console.error("ERROR FOUND" + error);
        });
    } catch (error) {
      alert("Fetch Error!");
    }
    return false;
  };

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <MyContext.Provider value={{
        isNotification, setIsNotification, isAdmin, setIsAdmin, storedCredentials, setStoredCredentials, isLogin, setIsLogin, ConferenceData, setConferenceData, user_name, setUser_name, isloading, setIsloading, isDrawerClicked, setIsDrawerClicked
      }}>

          <DrawerNav />
      </MyContext.Provider>
      {/* <StackNav /> */}
      {/* <BottomTab /> */}
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
