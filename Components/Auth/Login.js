import {
  View,
  Text,
  Button,
  Image,
  TextInput,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import * as SecureStore from "expo-secure-store";
// import MyContext from '../MyContext'
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { DB_URL } from "../Constants/Constants";
import MyContext from "../../MyContext";
import Animated from "react-native-reanimated";

const Login = () => {
  const navigation = useNavigation();
  const [userInfo, setuserInfo] = useState(null);
  const [hidePass, setHidePass] = useState(true);
  const email1 = useRef();
  const password1 = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    isLogin,
    setIsLogin,
    setIsAdmin,
    isAdmin,
    setStoredCredentials,
    storedCredentials,
    user_email,
    userData,
    setUserData,
    setUser_email,
    user_name,
    setUser_name,
    setLoadingCredentials,
    loadingCredentials,
    setIsloading,
    setConferenceData
  } = useContext(MyContext);

  const memorizedislogin = useMemo(() => isLogin, [isLogin]);
  const memorizedisAdmin = useMemo(() => isAdmin, [isAdmin]);
  const memorizedemail = useMemo(() => email, [email]);
  const memorizedstoredCredentials = useMemo(() => storedCredentials, [storedCredentials]);
  const memorizedloadingCredentials = useMemo(() => loadingCredentials, [loadingCredentials]);

  useEffect(() => {
    // getStoredCredentials()
    checkStorderCredentials();
  }, [memorizedislogin, memorizedisAdmin, memorizedemail, memorizedstoredCredentials, memorizedloadingCredentials, getStoredCredentials]);

  const checkStorderCredentials = () => {
    if (storedCredentials == null) {
      // setLoadingCredentials(true);
      getStoredCredentials();
    }
    if (storedCredentials !== null) {
      // getStoredCredentials();\
      console.log("Login Stored = ", storedCredentials);
      getUserData(storedCredentials.email, storedCredentials.password);
      // setIsLogin(true);
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
        console.log("getUserData = ", isAdmin)
        if (responseData[0].Data[0].isAdmin == "true") {
          console.log("Admin Login");
          setIsAdmin(true);
          handleupcomingconferencelist();
        }
        else {
          // setIsLogin(true);
          handleupcomingconferencelist();
        }
      } else {
        // alert(responseData[0].Message);
        setUserData(null);
      }
    } catch (error) {
      console.error("Fetch Error!", error);
      setUserData(null);
    }
  };


  // Function to store credentials
  const storeCredentials = async () => {
    try {
      const emailString = String(email);
      const passwordString = String(password);
      await SecureStore.setItemAsync("email", emailString);
      await SecureStore.setItemAsync("password", passwordString);

      await setStoredCredentials({
        email: emailString,
        password: passwordString,
      });
      // await getStoredCredentials();
      console.log(
        "Stored Credentials Login Screen Stored function",
        storedCredentials
      );
    } catch (error) {
      console.error("Error storing credentials:", error);
      setStoredCredentials(null);
    }
    return false;
  };

  const getStoredCredentials = async () => {
    try {
      const storedEmail = await SecureStore.getItemAsync("email");
      const storedPassword = await SecureStore.getItemAsync("password");
      if (storedEmail && storedPassword) {
        // alert(username + " username");
        await setStoredCredentials({
          email: storedEmail,
          password: storedPassword,
        });

        console.log("Stored Credentials Login Screen:", {
          email: storedEmail,
          password: storedPassword,
        });
        console.log("getStoredCredentials =", isAdmin);
      } else {
        console.log("No credentials found.");
        console.log("userData", userData);
        await setIsLogin(false);
        await setStoredCredentials(null);
      }
    } catch (error) {
      console.error("Error retrieving credentials:", error);
    }
    return false;
  };

  const handleLogin = async () => {
    if (email.length === 0) {
      alert("Type your email");
      email1.current.focus();
      return;
    } else if (password.length === 0) {
      alert("Type your password");
      password1.current.focus();
      return;
    }

    try {
      const APIURL = `${DB_URL}login.php`;
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };

      const Data = {
        Email: email,
        Password: password,
      };

      const response = await fetch(APIURL, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(Data),
      });

      const responseData = await response.json();

      if (responseData[0].Message == "Email Not Verfied") {
        // if (responseData[0].IsAdmin == true) {
        //   await setUser_name(responseData[0].User_Name);
        //   await storeCredentials();
        //   // await setIsLogin(true);
        //   navigation.navigate("Admin Tab");
        //   // await storeCredentials();
        // } else {

        // }
        alert("Dear User kindly Verfiy you email!");
        navigation.navigate("SignUp Code", {email});
      } else if (responseData[0].Message === "Success") {
        // if (responseData[0].IsAdmin == true) {
        //   await setUser_name(responseData[0].User_Name);
        //   await storeCredentials();
        //   // await setIsLogin(true);
        //   navigation.navigate("Admin Tab");
        //   // await storeCredentials();
        // } else {
        await storeCredentials();
        await setUser_name(responseData[0].User_Name);
        // }
        // alert(responseData[0].User_Name);
        console.log("Data user name", user_name);
      } else {
        alert(responseData[0].Message);
      }

      console.log("Data user name = ", user_name);
    } catch (error) {
      console.error("ERROR FOUND Login = ", error);
      alert("Fetch Error!");
    }
  };

  const handleupcomingconferencelist = async () => {
    try {
      setLoadingCredentials(true);
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
            console.log("handleupcomingconferencelist ", isAdmin);
            setConferenceData(parsedData[0].data);
            setIsloading(true);
            setIsLogin(true);
            await setLoadingCredentials(false); // Set loading state to false once credentials are fetched
            console.log("loading = ", loadingCredentials);
          } else {
            alert(parsedData[0].Message);
            setConferenceData(null);
            setIsloading(false);
            setLoadingCredentials(true); // Set loading state to false once credentials are fetched
            setIsLogin(false);
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
    <SafeAreaProvider>
      <Animated.ScrollView>
        <View style={{ flex: 1 }}>
          {/* <View style={{paddingTop: insets.top, paddingHorizontal: 20 }}> */}
          <View style={{ paddingHorizontal: 20 }}>
            <View style={{ alignItems: "center" }}>
              <Image source={require("../../assets/logo.png")} />
            </View>

            <View
              style={{
                marginTop: 5,
                borderTopRightRadius: 30,
                borderTopLeftRadius: 30,
              }}
            >
              <Text style={styles.firsttext}>
                Give credential to sign in your account
              </Text>
              {/* <Text>{JSON.stringify(userInfo, null, 2)}</Text> */}
              <View style={styles.inputbox}>
                <MaterialCommunityIcons
                  name="email-outline"
                  size={30}
                  color="black"
                  style={{
                    marginRight: 15,
                    marginLeft: 15,
                    alignSelf: "center",
                    justifyContent: "flex-end",
                  }}
                />
                <TextInput
                  style={styles.textinput}
                  placeholder="Type your email"
                  clearTextOnFocus={false}
                  defaultValue={email}
                  onChangeText={(email) => setEmail(email)}
                  ref={email1}
                />
              </View>
              <View style={styles.inputbox}>
                <Feather
                  name="lock"
                  size={30}
                  color="black"
                  style={{ marginLeft: 15, alignSelf: "center", flex: 1 }}
                />
                <TextInput
                  style={styles.textinput}
                  placeholder="Type your password"
                  clearTextOnFocus={false}
                  secureTextEntry={hidePass ? true : false}
                  value={password}
                  onChangeText={(password) => setPassword(password)}
                  ref={password1}
                />
                {hidePass ? (
                  <AntDesign
                    name="eye"
                    size={25}
                    color="black"
                    autoCorrect={false}
                    onPress={() => setHidePass(!hidePass)}
                    style={{
                      marginRight: 15,
                      marginLeft: 15,
                      alignSelf: "center",
                      marginEnd: 10,
                    }}
                  />
                ) : (
                  <Entypo
                    name="eye-with-line"
                    size={25}
                    color="black"
                    autoCorrect={false}
                    onPress={() => setHidePass(!hidePass)}
                    style={{
                      marginRight: 15,
                      marginLeft: 15,
                      alignSelf: "center",
                      marginEnd: 10,
                    }}
                  />
                )}
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Reset_Password")}
                >
                  <Text style={styles.forgetpassword}>Forget Password?</Text>
                </TouchableOpacity>
              </View>
              <View style={{ marginTop: 25, marginBottom: 40 }}>
                <TouchableOpacity
                  style={{
                    borderRadius: 10,
                    backgroundColor: "#363942",
                    paddingVertical: 22,
                  }}
                  onPress={handleLogin}
                >
                  <Text style={{ color: "#fff", textAlign: "center" }}>
                    {" "}
                    SIGN IN{" "}
                  </Text>
                </TouchableOpacity>
                {/* <Button title='SIGN IN' color="#000" /> */}
              </View>
            </View>
          </View>
          <View style={{ marginBottom: 20 }}>
            <View style={styles.container}>
              <View style={styles.horizontalLine} />
              <Text style={styles.text}> or continue with </Text>
              <View style={styles.horizontalLine} />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignSelf: "center",
                marginTop: 40,
                marginBottom: 50,
              }}
            >
              <View style={styles.logos}>
                <FontAwesome5 name="facebook" size={34} color="#1876f2" />
              </View>
              <View style={styles.logos}>
                <FontAwesome
                  name="google"
                  size={34}
                  color="black"
                  onPress={() => promtAsync()}
                />
              </View>
              <View style={styles.logos}>
                <Fontisto name="apple" size={34} color="black" />
              </View>
            </View>
            <View>
              <Text style={{ textAlign: "center", fontSize: 15 }}>
                {" "}
                Don't have an account?{" "}
                <Text
                  style={{ color: "#ff6500" }}
                  onPress={() => navigation.navigate("SignUp Screen")}
                >
                  {" "}
                  Sign Up{" "}
                </Text>
              </Text>
            </View>
            {/* <Button
                onPress={() => {
                  AsyncStorage.removeItem('@user')
                }}
                title="Remove item"
                color="red"
              /> */}
          </View>
        </View>
      </Animated.ScrollView>
    </SafeAreaProvider>
  );
};

export default Login;

const styles = StyleSheet.create({
  inputbox: {
    borderWidth: 1,
    borderColor: "#e1e1e3",
    flexDirection: "row",
    borderRadius: 20,
    marginBottom: 20,
    flex: 1,
  },
  firsttext: {
    fontSize: 15,
    marginVertical: 20,
    marginBottom: 30,
    // color: "#838488"
  },
  textinput: {
    paddingHorizontal: 10,
    paddingVertical: 13,
    // width: "55%"
    flex: 6,
  },
  forgetpassword: {
    color: "#ff6500",
    textAlign: "right",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  horizontalLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#bcbaba",
    marginHorizontal: 15,
  },
  logos: {
    padding: 10,
    borderWidth: 1,
    marginHorizontal: 20,
    paddingHorizontal: 25,
    borderRadius: 20,
    borderColor: "#e1e1e3",
  },
});
