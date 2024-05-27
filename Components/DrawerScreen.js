import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  Linking,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import React, { useContext, useEffect, useMemo } from "react";
import MyContext from "../MyContext";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialsCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import Octicons from "react-native-vector-icons/Octicons";
import { useNavigation } from "@react-navigation/native";
import { DB_URL } from "./Constants/Constants";
import { vh, vw } from "react-native-viewport-units";

const { width, height } = Dimensions.get("window");

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
    setLoadingCredentials,
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
        }
        console.log("User Data = ", responseData[0].Data[0]);
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

      await setStoredCredentials(null);
      await setUserData(null);
      setIsLogin(false);
      setIsAdmin(false);
      alert("Sign Out Success!");
      console.log(
        "Before credentials cleared (logged out) successfully.",
        storedCredentials
      );

      console.log(
        "Credentials cleared (logged out) successfully.",
        storedCredentials
      );
    } catch (error) {
      console.error("Error clearing credentials:", error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {userData && (
          <>
            <View style={styles.userInfoContainer}>
              <Image
                source={{
                  uri: `${DB_URL}uploads/user_profile/${userData.profile}`,
                }}
                style={styles.profileImage}
              />
              <View style={styles.userInfoText}>
                <Text style={styles.userName}>{userData.name}</Text>
                <Text style={styles.userEmail}>{userData.email}</Text>
              </View>
            </View>
            <View style={styles.menuContainer}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Profile", { name: userData.name })
                }
              >
                <View style={styles.menuItem}>
                  <MaterialsCommunityIcons
                    name="account-outline"
                    size={35}
                    style={styles.menuIcon}
                  />
                  <Text style={styles.menuText}>Profile</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Edit_Profile", { name: userData.name })
                }
              >
                <View style={styles.menuItem}>
                  <MaterialsCommunityIcons
                    name="account-edit-outline"
                    size={35}
                    style={styles.menuIcon}
                  />
                  <Text style={styles.menuText}>Edit Profile</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ContactUs", { name: userData.name })
                }
              >
                <View style={styles.menuItem}>
                  <Fontisto name="email" size={30} style={styles.menuIcon} />
                  <Text style={styles.menuText}>Contact Us</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.menuItem}>
                <Ionicons
                  name="help-circle-outline"
                  size={35}
                  style={styles.menuIcon}
                />
                <Text style={styles.menuText}>Help & FAQs</Text>
              </View>
              <TouchableOpacity onPress={clearCredentials}>
                <View style={styles.menuItem}>
                  <Octicons name="sign-out" size={35} style={styles.menuIcon} />
                  <Text style={styles.menuText}>Sign Out</Text>
                </View>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>
      <View style={styles.footer}>
        <View style={{flexDirection: "row"}}>
          <Text onPress={() => Linking.openURL("https://unitedscientificgroup.org/privacy-policy")}>Privacy Policy</Text><Text> | </Text><Text onPress={() => Linking.openURL("https://unitedscientificgroup.org/terms-and-conditions")}> Terms & Conditions</Text>
        </View>
        <Text>Version 1.0.0</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "flex-start",
    paddingTop: 50 * vw,
  },
  userInfoContainer: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: "orange",
    paddingBottom: 20 * vw,
    paddingHorizontal: 10 * vw,
  },
  profileImage: {
    borderRadius: 80 * vw,
    width: 80 * vw,
    height: 80 * vh,
  },
  userInfoText: {
    justifyContent: "center",
    paddingLeft: 10 * vw,
  },
  userName: {
    fontWeight: "bold",
    fontSize: 20 * vw,
    paddingTop: 20 * vw,
    textTransform: "capitalize",
  },
  userEmail: {
    fontSize: 15 * vw,
    paddingVertical: 10 * vw,
  },
  menuContainer: {
    marginVertical: 30 * vw,
    flex: 1,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20 * vw,
    backgroundColor: "#eee",
    paddingHorizontal: 5 * vw,
    margin: 10 * vw,
    borderRadius: 15 * vw,
    paddingVertical: 10 * vw,
  },
  menuIcon: {
    flex: 1,
  },
  menuText: {
    flex: 4,
  },
  footer: {
    padding: 10 * vw,
    alignItems: "center",
    justifyContent: "flex-end"
  },
});

export default DrawerScreen;
