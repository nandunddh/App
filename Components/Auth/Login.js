import { View, Text, Button, Image, TextInput, StyleSheet, Touchable, TouchableOpacity, ScrollView, Platform } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import * as SecureStore from 'expo-secure-store';
// import MyContext from '../MyContext'
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { DB_URL } from '../Constants/Constants';
import MyContext from '../../MyContext';
import Animated from 'react-native-reanimated';

const Login = () => {
  const navigation = useNavigation();
  const [userInfo, setuserInfo] = useState(null)
  const [hidePass, setHidePass] = useState(true);
  const email1 = useRef();
  const password1 = useRef();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isLogin, setIsLogin, setIsAdmin, isAdmin, setStoredCredentials, storedCredentials, user_email, setUser_email, user_name, setUser_name } = useContext(MyContext)

  useEffect(() => {
    // console.log(Platform.OS);
    getStoredCredentials();
    console.log("isLogin from login === ", SecureStore.getItemAsync('username'))
  }, [isLogin, isAdmin, email, storedCredentials, user_name])

  const getStoredCredentials = async () => {
    try {
      const storedEmail = await SecureStore.getItemAsync('email');
      const storedPassword = await SecureStore.getItemAsync('password');
      const storedUsername = await SecureStore.getItemAsync('username');
      if (storedEmail && storedPassword && storedUsername) {
        // alert(username + " username");
        await setStoredCredentials({ email: storedEmail, password: storedPassword, username: storedUsername });
        // if (storedEmail === "admin@test.com") {
        //   // navigation.navigate('HomeScreen');
        //   // navigation.navigate('AdminTab', {
        //   //   screen: 'HomeScreen',
        //   // });
        // }
        // else {
        //   // navigation.navigate('Drawer Home');
        //   setIsLogin(true);
        // }
        await setIsLogin(true);

        // setIsLogin(true);
        // if (storedisAdmin === "true") {
        //   setIsAdmin(true);
        // }
        // {storeCredentials && 
        // navigation.navigate("") }

        console.log('Stored Credentials Login Screen:', { email: storedEmail, password: storedPassword, username: storedUsername });
      } else {
        console.log('No credentials found.');
      }
    } catch (error) {
      console.error('Error retrieving credentials:', error);
    }
    return false;
  }

  // async function handleSignInWithGoogle() {
  //   const user = await AsyncStorage.getItem('@user')
  //   if (!user) {
  //     if (response?.type === 'success') {
  //       await getUserInfo(response.authentication.accessToken);
  //       console.log("!user = ", userInfo)
  //       // setIsLogin(true);
  //       // alert('Login Success!');
  //     }
  //   } else {
  //     setuserInfo(JSON.parse(user));
  //     login()
  //     // setIsLogin(true)
  //     // alert('Login Success!')
  //   }
  // }

  // const getUserInfo = async (token) => {
  //   if (!token) return
  //   try {
  //     const response = await fetch(
  //       'https://www.googleapis.com/userinfo/v2/me',
  //       // 'https://accounts.google.com/o/oauth2/auth',
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       },
  //     )

  //     const user = await response.json()
  //     await AsyncStorage.setItem('@user', JSON.stringify(user))
  //     setuserInfo(user)
  //     login()
  //     alert('Login Success!');
  //   } catch (error) { }
  // }

  // const insets = useSafeAreaInsets()

  // Function to store credentials
  const storeCredentials = async () => {
    try {
      const emailString = String(email);
      const passwordString = String(password);
      const username = String(user_name);
      await SecureStore.setItemAsync('email', emailString);
      await SecureStore.setItemAsync('password', passwordString);
      await SecureStore.setItemAsync('username', username);

      await setStoredCredentials({ email: emailString, password: passwordString, username: username });
      getStoredCredentials()
      // login()
      // if (email == "admin@test.com") {
      //   // navigation.navigate('AdminTab', {
      //   //   screen: 'HomeScreen',
      //   // });

      // } else {
      //   // navigation.navigate('Drawer Home');
      // }
      // await setIsLogin(true);
       console.log('Stored Credentials Login Screen Stored function', storedCredentials);
      // navigation.navigate("HomeScreen");
      // alert("test1");
    } catch (error) {
      console.error('Error storing credentials:', error);
    }
    return false;
  }


  const handleLogin = async () => {
    // const abortController = new AbortController();
    if (email.length == 0) {
      alert("Type your email");
      email1.current.focus()
    }
    else if (password.length == 0) {
      alert("Type your password");
      password1.current.focus()
    }
    else {
      try {
        // var APIURL = `http://localhost:8081/SERVER(backend)/login.php`;
        var APIURL = `${DB_URL}login.php`;

        var headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        };

        var Data = {
          Email: email,
          // isAdmin: isAdmin,
          Password: password
        };

        fetch(APIURL, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(Data)
        })
          .then((Response) => Response.json())
          .then(async (Response) => {
            // console.log("Login ===", Response);
            if (Response[0].Message == "Success") {
              // console.log("Login", Response)
              console.log("Login true =============", user_name);
              await setUser_name(Response[0].User_Name)
              console.log("Data user name", user_name);
              await storeCredentials()
              // alert(Response[0].User_Name);
            }
            else {
              alert(Response[0].Message);
            }
            if (Response[0].Message == "No account yet") {
              // console.log("Login true =============")
              // email1.clear();
              // password1.clear();

              // storeCredentials()
            }
            console.log("Data", Data);
            console.log("Data user name", user_name);
          })
          .catch((error) => {
            console.error("ERROR FOUND" + error);
          })
      } catch (error) {
        alert("Fetch Error!")
      }
      return false;
    }
    // else {
    //   if (email === "nandu@test.com") {
    //     // navigation.navigate('HomeScreen');
    //     storeCredentials()
    //     navigation.navigate('UserTab', {
    //       screen: 'HomeScreen',
    //     });
    //   }
    //   else if (email === "admin@test.com") {
    //     storeCredentials()
    //     navigation.navigate('AdminTab', {
    //       screen: 'HomeScreen',
    //     });
    //   }
    // }
    console.log("input email = ", email);
    console.log("input password = ", password);

  }

  return (
    <SafeAreaProvider>
      <Animated.ScrollView>

        <View style={{ flex: 1 }}>
          {/* <View style={{paddingTop: insets.top, paddingHorizontal: 20 }}> */}
          <View style={{ paddingHorizontal: 20, }}>
            <View style={{ alignItems: 'center' }}>
              <Image source={require('../../assets/logo.png')} />
            </View>

            <View
              style={{
                marginTop: 5,
                borderTopRightRadius: 30,
                borderTopLeftRadius: 30,
              }}
            >
              <Text style={styles.firsttext}>Give credential to sign in your account</Text>
              {/* <Text>{JSON.stringify(userInfo, null, 2)}</Text> */}
              <View style={styles.inputbox}>
                <MaterialCommunityIcons name="email-outline" size={30} color="black" style={{ marginRight: 15, marginLeft: 15, alignSelf: "center", justifyContent: "flex-end" }} />
                <TextInput style={styles.textinput} placeholder='Type your email' clearTextOnFocus={false} defaultValue={email} onChangeText={email => setEmail(email)} ref={email1} />

              </View>
              <View style={styles.inputbox}>
                <Feather name="lock" size={30} color="black" style={{ marginLeft: 15, alignSelf: "center", flex: 1 }} />
                <TextInput style={styles.textinput} placeholder='Type your password' clearTextOnFocus={false} secureTextEntry={hidePass ? true : false} value={password} onChangeText={password => setPassword(password)} ref={password1} />
                {hidePass ?
                  <AntDesign name="eye" size={25} color="black" autoCorrect={false} onPress={() => setHidePass(!hidePass)} style={{ marginRight: 15, marginLeft: 15, alignSelf: "center", marginEnd: 10 }} />
                  :
                  <Entypo name="eye-with-line" size={25} color="black" autoCorrect={false} onPress={() => setHidePass(!hidePass)} style={{ marginRight: 15, marginLeft: 15, alignSelf: "center", marginEnd: 10 }} />

                }

              </View>
              <View>
                <TouchableOpacity onPress={() =>
                  navigation.navigate("Reset_Password")}>
                  <Text style={styles.forgetpassword}>Forget Password?</Text>
                </TouchableOpacity>
              </View>
              <View style={{ marginTop: 25, marginBottom: 40 }}>
                <TouchableOpacity style={{ borderRadius: 10, backgroundColor: "#363942", paddingVertical: 22 }} onPress={handleLogin}>
                  <Text style={{ color: "#fff", textAlign: "center" }}> SIGN IN </Text>
                </TouchableOpacity>
                {/* <Button title='SIGN IN' color="#000" /> */}
              </View>
            </View>
          </View>
          <View style={{ marginBottom: 20, }}>
            <View style={styles.container}>
              <View style={styles.horizontalLine} />
              <Text style={styles.text}> or continue with </Text>
              <View style={styles.horizontalLine} />
            </View>
            <View style={{ flexDirection: "row", alignSelf: "center", marginTop: 40, marginBottom: 50 }}>
              <View style={styles.logos}>
                <FontAwesome5 name="facebook" size={34} color="#1876f2" />
              </View>
              <View style={styles.logos}>
                <FontAwesome name="google" size={34} color="black" onPress={() => promtAsync()} />
              </View>
              <View style={styles.logos}>
                <Fontisto name="apple" size={34} color="black" />
              </View>
            </View>
            <View>
              <Text style={{ textAlign: "center", fontSize: 15, }}> Don't have an account? <Text style={{ color: "#ff6500" }} onPress={() =>
                navigation.navigate('SignUp Screen')
              }> Sign Up </Text></Text>
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
    </SafeAreaProvider >
  )
}

export default Login


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
    marginBottom: 30
    // color: "#838488"
  },
  textinput: {
    paddingHorizontal: 10,
    paddingVertical: 13,
    // width: "55%"
    flex: 6
  },
  forgetpassword: {
    color: "#ff6500",
    textAlign: "right",
  },
  container: {
    flexDirection: 'row',
    alignItems: "center",
    marginBottom: 20,
  },
  horizontalLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#bcbaba',
    marginHorizontal: 15
  },
  logos: {
    padding: 10,
    borderWidth: 1,
    marginHorizontal: 20,
    paddingHorizontal: 25,
    borderRadius: 20,
    borderColor: "#e1e1e3",

  }

})
