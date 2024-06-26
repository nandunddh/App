import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import React, { useContext, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MyContext from "../MyContext";
import Animated from "react-native-reanimated";
import * as SecureStore from "expo-secure-store";
import { DB_URL } from "./Constants/Constants";

const Profile = ({ route }) => {
  const navigation = useNavigation();

  const {
    setIsLogin,
    setStoredCredentials,
    storedCredentials,
    userData,
    setLoadingCredentials,
  } = useContext(MyContext);
  // const notification_image = require("../assets/nandu.png");

  useEffect(() => {
    // Image.prefetch(userData.profile);
  }, []);

  return (
    <>
      <Animated.ScrollView>
        {userData ? (
          // const img_uri = `${DB_URL}uploads/user_profile/${userData.profile}`;
          <View style={styles.container}>
            <View style={styles.profile_container}>
              {userData.profile == "no_image.jpg" ? (
                <Image
                  source={{
                    uri: `${DB_URL}uploads/user_profile/no_image.jpg`,
                  }}
                  style={styles.profile_image}
                  resizeMode="cover"
                />
              ) : (
                <Image
                  source={{
                    uri: `${DB_URL}uploads/user_profile/${userData.profile}`,
                  }}
                  style={styles.profile_image}
                  resizeMode="cover"
                />
              )}
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                {userData.name}
              </Text>
            </View>
            <View style={styles.inner_container}>
              <View style={{ flex: 2 }}>
                <View style={{ padding: 20 }}>
                  <Text style={styles.subheading}>Email</Text>
                  <View style={{ flexDirection: "row" }}>
                    <MaterialCommunityIcons
                      name="email-outline"
                      size={30}
                      color="#f3ba2d"
                      style={styles.email_icon}
                    />
                    <Text style={styles.sub_text}>{userData.email}</Text>
                  </View>
                </View>
                <View
                  style={{
                    borderBottomColor: "#86bc42",
                    borderBottomWidth: StyleSheet.hairlineWidth,
                  }}
                />
                <View style={{ padding: 20 }}>
                  <Text style={styles.subheading}>Mobile Number</Text>
                  <View style={{ flexDirection: "row" }}>
                    <Feather
                      name="phone"
                      size={30}
                      color="#f3ba2d"
                      style={styles.email_icon}
                    />
                    <Text style={styles.sub_text}>{userData.mobilenumber}</Text>
                  </View>
                </View>
                <View
                  style={{
                    borderBottomColor: "#86bc42",
                    borderBottomWidth: StyleSheet.hairlineWidth,
                  }}
                />
                <View style={{ padding: 20 }}>
                  <Text style={styles.subheading}>Location</Text>
                  <View style={{ flexDirection: "row" }}>
                    <Entypo
                      name="location-pin"
                      size={30}
                      color="#f3ba2d"
                      style={styles.email_icon}
                    />
                    {/* <EvilIcons name="location" size={24} color="black" style={styles.email_icon} /> */}
                    <Text style={styles.sub_text}>{userData.location}</Text>
                  </View>
                </View>
                <View
                  style={{
                    borderBottomColor: "#86bc42",
                    borderBottomWidth: StyleSheet.hairlineWidth,
                  }}
                />
              </View>
              <View style={{ marginTop: 25, marginBottom: 40 }}>
                <TouchableOpacity
                  style={{
                    borderRadius: 10,
                    backgroundColor: "#363942",
                    paddingVertical: 22,
                  }}
                  onPress={() => navigation.navigate("Edit_Profile")}
                >
                  <Text
                    style={{ color: "#fff", textAlign: "center", fontSize: 20 }}
                  >
                    {" "}
                    Edit Details{" "}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          <Text>No Data</Text>
        )}
      </Animated.ScrollView>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  inner_container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  profile_container: {
    alignItems: "center",
    paddingVertical: 30,
    // backgroundColor: "#373a43",
    // borderBottomLeftRadius: 35,
    // borderBottomRightRadius: 35,
    // borderTopRightRadius: 35,
    // borderTopLeftRadius: 35,
  },
  profile_image: {
    borderRadius: 80,
    height: 150,
    width: 150,
    marginBottom: 15,
    // borderColor: "#000",
    borderWidth: 2,
  },
  profile_name: {
    fontSize: 20,
    fontWeight: "bold",
    // color: "#fff"
  },
  subheading: {
    fontSize: 18,
    fontWeight: "bold",
    paddingBottom: 20,
  },
  email_icon: {
    marginRight: 15,
    alignSelf: "center",
    justifyContent: "flex-end",
  },
  sub_text: {
    alignSelf: "center",
    fontSize: 18,
  },
});
