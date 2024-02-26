import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet} from "react-native";
import DrawerNav from "./DrawerNav";
import { useEffect, useRef, useState } from "react";
import { DB_URL } from "./Components/Constants/Constants";
import MyContext from "./MyContext";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import * as SecureStore from 'expo-secure-store';


const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isNotification, setIsNotification] = useState(false);
  const [storedCredentials, setStoredCredentials] = useState(null);
  const [ConferenceData, setConferenceData] = useState([]);
  const [user_name, setUser_name] = useState();
  const [isloading, setIsloading] = useState(false);
  const [isDrawerClicked, setIsDrawerClicked] = useState(false);

  // notification //
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  // ENd //


  useEffect(() => {
    handleupcomingconferencelist();
  }, [isLogin, isNotification, storedCredentials, ConferenceData, isloading]);


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
        }}
      >
        <DrawerNav />
      </MyContext.Provider>
      {/* <StackNav /> */}
      {/* <BottomTab /> */}
    </NavigationContainer>
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
