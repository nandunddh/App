import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import React, { useContext, useEffect, useMemo } from "react";
import MyContext from "../MyContext";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialsCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import Octicons from "react-native-vector-icons/Octicons";
import Animated from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { DB_URL } from "./Constants/Constants";

const DrawerScreen = () => {
  const {
    setStoredCredentials,
    storedCredentials,
    setIsLogin,
    isLogin,
    userData,
    setUserData,
    setIsAdmin,
    isAdmin,
    setLoadingCredentials
  } = useContext(MyContext);

  const navigation = useNavigation();

  const memorizedislogin = useMemo(() => isLogin, [isLogin]);

  useEffect(() => {
    if (userData == null) {
      setIsLogin(false);
      setIsAdmin(false);
      setLoadingCredentials(false);
    }
    console.log("usedata Screen =", userData);
    console.log("usedata Screen islogin=", isLogin);
    console.log("usedata Screen isAdmin=", isAdmin);
  }, []);

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

  const clearCredentials = async () => {
    try {
      setLoadingCredentials(true);
      await SecureStore.deleteItemAsync("email");
      await SecureStore.deleteItemAsync("password");

      await setStoredCredentials(null); // Clear stored credentials in state
      await setUserData(null); // Clear userData in state
      setIsLogin(false);
      setIsAdmin(false);
      // navigation.navigate("Login Screen");
      alert("Sign Out Success!");
      console.log(
        "Before credentials cleared (logged out) successfully.",
        storedCredentials
      );

      console.log(
        "Credentials cleared (logged out) successfully.",
        storedCredentials // Here you're accessing storedCredentials which might be null after clearing
      );
    } catch (error) {
      console.error("Error clearing credentials:", error);
    }
  };

  return (
    // <ImageBackground
    //   source={require("../assets/adaptive-icon.png")}
    //   resizeMode="center"
    //   style={{ flex: 1, paddingTop: 50 }}
    // >
    <Animated.ScrollView>
      {userData &&
        <View style={{ paddingTop: 50 }}>
          <View>
            <View
              style={{
                flexDirection: "row",
                borderBottomWidth: 2,
                borderBottomColor: "orange",
                paddingBottom: 20,
              }}
            >
              <View style={{ marginLeft: 10 }}>
                <Image
                  source={{
                    uri: `${DB_URL}uploads/user_profile/${userData.profile}`,
                  }}
                  style={{ borderRadius: 80, width: 80, height: 80 }}
                />
              </View>
              <View style={{ justifyContent: "center", paddingLeft: 10 }}>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 20,
                    paddingTop: 20,
                    textTransform: "capitalize",
                  }}
                >
                  {" "}
                  {userData.name}
                </Text>
                <Text style={{ fontSize: 15, paddingVertical: 10 }}>
                  {" "}
                  {userData.email}
                </Text>
              </View>
            </View>
            <View style={{ marginVertical: 30 }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Profile", { name: userData.name })
                }
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 20,
                    backgroundColor: "#eee",
                    paddingHorizontal: 5,
                    margin: 10,
                    borderRadius: 15,
                    paddingVertical: 10,
                  }}
                >
                  <MaterialsCommunityIcons
                    name="account-outline"
                    size={35}
                    style={{ flex: 1 }}
                  />
                  <Text style={{ flex: 4 }}>Profile</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Edit_Profile", { name: userData.name })
                }
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    margin: 10,
                    paddingHorizontal: 5,
                    borderRadius: 15,
                    paddingVertical: 10,
                    paddingLeft: 20,
                    backgroundColor: "#eee",
                  }}
                >
                  <MaterialsCommunityIcons
                    name="account-edit-outline"
                    size={35}
                    style={{ flex: 1 }}
                  />
                  <Text style={{ flex: 4 }}>Edit Profile</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ContactUs", { name: userData.name })
                }
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    margin: 10,
                    paddingHorizontal: 5,
                    borderRadius: 15,
                    paddingVertical: 10,
                    paddingLeft: 20,
                    backgroundColor: "#eee",
                  }}
                >
                  <Fontisto name="email" size={30} style={{ flex: 1 }} />
                  <Text style={{ flex: 4 }}>Contact Us</Text>
                </View>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  margin: 10,
                  paddingHorizontal: 5,
                  borderRadius: 15,
                  paddingVertical: 10,
                  paddingLeft: 20,
                  backgroundColor: "#eee",
                }}
              >
                <Ionicons
                  name="help-circle-outline"
                  size={35}
                  style={{ flex: 1 }}
                />
                <Text style={{ flex: 4 }}>Help & FAQs</Text>
              </View>
              <TouchableOpacity onPress={() => clearCredentials()}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    margin: 10,
                    paddingHorizontal: 5,
                    borderRadius: 15,
                    paddingVertical: 10,
                    paddingLeft: 20,
                    backgroundColor: "#eee",
                  }}
                >
                  <Octicons name="sign-out" size={35} style={{ flex: 1 }} />
                  <Text style={{ flex: 4 }}>Sign Out</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginBottom: 50,
                paddingHorizontal: 10,
              }}
            >
              <Text>Privacy Policy | Terms & Conditions</Text>
              <Text>Version 1.0.0</Text>
            </View>
          </View>
        </View>
      }
    </Animated.ScrollView>
  );
};

export default DrawerScreen;
