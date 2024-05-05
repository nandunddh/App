import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  Image,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import { DB_URL } from "../Constants/Constants";
import Animated from "react-native-reanimated";
import MyContext from "../../MyContext";
import * as Device from "expo-device";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Email } from "./smtp";

const SignUp = ({ navigation }) => {
  const no_image = require("../../assets/logo.png");
  const [hidePass, setHidePass] = useState(true);
  const [confhidePass, setConfHidePass] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [name, setName] = useState("");
  const [mobilenumber, setMobilenumber] = useState("");
  const [image, setImage] = useState(no_image);
  const [location, setLocation] = useState("");
  const [profile_path, setProfile_path] = useState();
  const email1 = useRef();
  const name1 = useRef();
  const mobilenumber1 = useRef();
  const password1 = useRef();
  const cnpassword1 = useRef();
  const location1 = useRef();
  const [otp, setOtp] = useState("");

  // var { expoPushToken } = useContext(MyContext);

  useEffect(() => {
    // console.log("name", name)
    // console.log("email", email)
    // console.log("mobilenumber", mobilenumber)
    // console.log("password", password)
    // console.log("cnpassword", confirmPw)
    console.log("image ", image);
    console.log("profile path ", profile_path);
  }, [
    email,
    name,
    password,
    confirmPw,
    mobilenumber,
    image,
    profile_path,
    location,
    otp,
  ]);

  const generateOTP = async (params) => {
    Email.send({
      Username: "nandugoud113@gmail.com",
      Password: "AC781B881AC3B360ACFFC638E3AC951181F8",
      // SecureToken: "95009f41-b2ce-4a70-947f-62c2449e5f69",
      Host: "smtp.elasticemail.com",
      To: `${email}`,
      From: "nandugoud113@gmail.com",
      Subject: "OTP Verification",
      Body: `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            padding: 20px;
          }
    
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            padding: 20px;
          }
    
          h1 {
            color: #ff6500;
          }
    
          p {
            line-height: 1.6;
          }
    
          .verification-code {
            font-size: 24px;
            color: #28a745;
            margin-top: 10px;
            margin-bottom: 30px;
          }
          .name{
            font-weight: bold;
          }
    
          .expiration-info {
            font-style: italic;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Email Verification</h1>
          <p>Hello <span class="name">${email}</span>,</p>
          <p>Your verification code is:</p>
          <div class="verification-code">${params}</div>
          <p>Thank you for using our service!</p>
        </div>
      </body>
      </html>`,
      Port: 2525,
    }).then(
      alert("OTP sent successfully" + params),
      console.log("Otp ", params),
      navigation.navigate("SignUp Code", { email }),
      setOtp(params),
    );
    // .catch(
    //   console.log("error in smtp"),
    //   setOtp(""),
    //   navigation.navigate("SignUp Screen")
    // );
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (result.canceled) {
        setImage(null);
      } else {
        const selectedAsset = result.assets[0];
        const imagePath = selectedAsset.uri;
        const randomNumber = Math.floor(Math.random() * 1000); // Generates a random number between 0 and 999
        const fileName = `Image_${Date.now()}_${randomNumber}.jpg`;

        const destinationUri = `${FileSystem.documentDirectory}${fileName}`;
        await FileSystem.copyAsync({ from: imagePath, to: destinationUri });

        setProfile_path(fileName);
        setImage(destinationUri);

        // await SecureStore.setItemAsync("profileImage", destinationUri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "An error occurred while picking an image.");
    }
  };

  const storeCredentials = async () => {
    try {
      await SecureStore.setItemAsync("email", email);
      await SecureStore.setItemAsync("password", password);
      // login()
      console.log("Credentials stored successfully.");
    } catch (error) {
      console.error("Error storing credentials:", error);
    }
  };

  const check_otp = () => {
    try {
      var APIURL = `${DB_URL}resetpassword.php`;
      // var APIURL = "http://127.0.0.1:8000/USG/login.php";

      var headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };

      var Data = {
        Email: email,
      };

      fetch(APIURL, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(Data),
      })
        .then((Response) => Response.json())
        .then((Response) => {
          if (Response[0].Message == "Success") {
            generateOTP(Response[0].OTP);
            setOtp(Response[0].OTP);
          } else if (Response[0].Message == "Failed") {
            alert(Response[0].Password);
            navigation.navigate("SignUp Screen");
          } else {
            alert(Response[0].Message);
            navigation.navigate("SignUp Screen");
          }
        })
        .catch((error) => {
          console.error("ERROR FOUND Reset Passowrd = " + error);
        });
    } catch (error) {
      alert("Fetch Error!");
    }
  };

  const InsertRecord = () => {
    var Email = email;
    var fls = "false";
    var Name = name;
    var Password = password;
    var Mobilenumber = mobilenumber;
    // var Profile_path = profile_path;
    var ConfirmPw = confirmPw;
    var Location = location;
    var checkEmail = RegExp(
      /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i
    );

    if (
      Email.length == 0 ||
      Password.length == 0 ||
      ConfirmPw.length == 0 ||
      Name.length == 0 ||
      Mobilenumber.length == 0 ||
      // Profile_path.length == 0 ||
      Location.length == 0
    ) {
      alert("Required Field Is Missing!!!");
    } else if (!checkEmail.test(Email)) {
      alert("invalid email!!!");
    } else if (Mobilenumber.length < 10) {
      alert("Enter an valid mobile number!!!");
    }
    // Password validations
    else if (Password.length < 8) {
      alert("Minimum 08 characters required!!!");
    } else if (!/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(Password)) {
      alert("Use atleast 01 special character!!!");
    } else if (/[ ]/.test(Password)) {
      alert("Don't include space in password!!!");
    } else if (Password !== ConfirmPw) {
      alert("Password doesnot match!!!");
    } else {
      var InsertAPIURL = `${DB_URL}Signup.php`; //API to render signup
      // var InsertAPIURL = "http://192.168.2.117:8000/Signup.php";   //API to render signup
      var headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };
      // if (Device.isDevice) {
      //   expoPushToken = expoPushToken;
      // }
      // else {
      //   expoPushToken = "No Token for Virtual Device";
      // }
      var Data = {
        Name: Name,
        Email: Email,
        Password: Password,
        mobilenumber: Mobilenumber,
        isAdmin: fls,
        Profile_path: "no_image.jpg",
        Location: location,
        token: "No Token",
      };
      fetch(InsertAPIURL, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(Data), //convert data to JSON
      })
        .then((response) => response.json()) //check response type of API (CHECK OUTPUT OF DATA IS IN JSON)
        .then((response) => {
          alert(response[0].Message);
          if (response[0].Message == "Complete--!") {
            //   console.log(response[0].Message);
            storeCredentials();
            check_otp();
            //   // navigation.navigate('SignUp Code', { email });
            //   console.log("DATA", Data); // If data is in JSON => Display alert msg
            //   // this.props.navigation.navigate("SignInScreen"); //Navigate to next screen if authentications are valid
          } else {
            alert(response[0].Message);
            navigation.navigate("Login Screen");
          }
          // console.log("response", response);
        })
        .catch((error) => {
          alert("Error Occured" + error);
          console.log("Error Occured" + error);
        });
      // **************from here ******************

      // const uri = image;
      // const formData = new FormData();
      // formData.append("Profile_path", {
      //   uri,
      //   name: Profile_path,
      //   type: "image/jpg",
      // });
      // fetch(`${DB_URL}create_profile.php`, {
      //   method: "POST",
      //   body: formData,
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // })
      //   .then((response) => response.json())
      //   .then((data) => {
      //     alert("data", data);
      //     console.log("data = ", data);
      //     // Handle the response as needed
      //     fetch(InsertAPIURL, {
      //       method: 'POST',
      //       headers: headers,
      //       body: JSON.stringify(Data) //convert data to JSON
      //     })
      //       .then((response) => response.json()) //check response type of API (CHECK OUTPUT OF DATA IS IN JSON)
      //       .then((response) => {
      //         if (response[0].Message == "Sign Up Success!") {
      //           // alert(response[0].Message);
      //           console.log(response[0].Message);
      //           storeCredentials()
      //           check_otp()
      //           // navigation.navigate('SignUp Code', { email });
      //           console.log("DATA", Data)     // If data is in JSON => Display alert msg
      //           // this.props.navigation.navigate("SignInScreen"); //Navigate to next screen if authentications are valid
      //         }
      //         else {
      //           alert(response[0].Message);
      //           navigation.navigate('Login Screen');
      //         }
      //       })
      //       .catch((error) => {
      //         alert("Error Occured" + error);
      //         console.log("Error Occured" + error);
      //       })
      //   })
      //   .catch((error) => {
      //     console.error("Error uploading image:", error);
      //   });
    }
    // console.log(first)
  };

  return (
    <SafeAreaProvider>
      <Animated.ScrollView>
        <View style={{ paddingHorizontal: 20, flex: 1, marginBottom: 20 }}>
          <Text style={{ marginVertical: 20 }}>
            Create account and enjoy all services
          </Text>
          <View style={styles.profile_container}>
            {/* <Image source={{ uri: image }} style={styles.profile_image} /> */}
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                title="Choose from gallery"
                onPress={pickImage}
                style={{
                  marginRight: 10,
                  backgroundColor: "#363942",
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                  }}
                >
                  Choose from Gallery
                </Text>
              </TouchableOpacity>
              {/* <TouchableOpacity title="Capture Image" onPress={takePicture} style={{ marginRight: 10, backgroundColor: "#363942", borderRadius: 10 }}>
                <Text style={{ color: "#fff", paddingHorizontal: 20, paddingVertical: 10 }}>Capture Image</Text>
              </TouchableOpacity> */}
            </View>
          </View>
          <View style={styles.inputbox}>
            <MaterialCommunityIcons
              name="account-outline"
              size={34}
              color="#000"
              style={{ marginRight: 15, marginLeft: 15, alignSelf: "center" }}
            />
            <TextInput
              style={styles.textinput}
              placeholder="Type your full name"
              clearTextOnFocus={false}
              onChangeText={(name) => setName(name)}
              ref={name1}
              defaultValue={name}
            />
            {/* <TextInput style={styles.textinput} placeholder='Type your full name' clearTextOnFocus={false} onChangeText={email => setEmail(email)} ref={email1}/> */}
          </View>
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
              onChangeText={(email) => setEmail(email)}
              ref={email1}
              defaultValue={email}
            />
          </View>
          <View style={styles.inputbox}>
            <Ionicons
              name="call-outline"
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
              placeholder="Type your mobilenumber"
              clearTextOnFocus={false}
              onChangeText={(mobilenumber) => setMobilenumber(mobilenumber)}
              ref={mobilenumber1}
              defaultValue={mobilenumber}
            />
          </View>
          <View style={styles.inputbox}>
            <Ionicons
              name="location-outline"
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
              placeholder="Type your address"
              clearTextOnFocus={false}
              onChangeText={(location) => setLocation(location)}
              ref={location1}
              defaultValue={location}
            />
          </View>
          <View style={styles.inputbox}>
            <Feather
              name="lock"
              size={30}
              color="black"
              style={{ marginRight: 15, marginLeft: 15, alignSelf: "center" }}
            />
            <TextInput
              style={styles.textinput}
              placeholder="Type your password"
              clearTextOnFocus={false}
              secureTextEntry={hidePass ? true : false}
              onChangeText={(password) => setPassword(password)}
              ref={password1}
              defaultValue={password}
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
          <View style={styles.inputbox}>
            <Feather
              name="lock"
              size={30}
              color="black"
              style={{ marginRight: 15, marginLeft: 15, alignSelf: "center" }}
            />
            <TextInput
              style={styles.textinput}
              placeholder="Type your confirm password"
              clearTextOnFocus={false}
              secureTextEntry={confhidePass ? true : false}
              onChangeText={(confirmPw) => setConfirmPw(confirmPw)}
              ref={cnpassword1}
              defaultValue={confirmPw}
            />
            {confhidePass ? (
              <AntDesign
                name="eye"
                size={25}
                color="black"
                autoCorrect={false}
                onPress={() => setConfHidePass(!confhidePass)}
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
                onPress={() => setConfHidePass(!confhidePass)}
                style={{
                  marginRight: 15,
                  marginLeft: 15,
                  alignSelf: "center",
                  marginEnd: 10,
                }}
              />
            )}
          </View>
          <View style={{ marginTop: 25, marginBottom: 40 }}>
            <TouchableOpacity
              style={{
                borderRadius: 10,
                backgroundColor: "#363942",
                paddingVertical: 22,
              }}
            >
              <Text
                style={{ color: "#fff", textAlign: "center" }}
                onPress={InsertRecord}
              >
                {" "}
                SIGN IN{" "}
              </Text>
            </TouchableOpacity>
          </View>
          <View>
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
                Already have an account?{" "}
                <Text
                  style={{ color: "#ff6500" }}
                  onPress={() => navigation.navigate("Login Screen")}
                >
                  {" "}
                  Sign In{" "}
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

export default SignUp;

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
    fontSize: 20,
    marginVertical: 20,
    marginBottom: 40,
    // color: "#838488"
  },
  textinput: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    // width: "60%"
    flex: 5,
  },
  forgetpassword: {
    color: "#ff6500",
    textAlign: "right",
    marginVertical: 20,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
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
  profile_container: {
    alignItems: "center",
    paddingVertical: 30,
  },
  profile_image: {
    height: 150,
    width: 150,
    marginBottom: 15,
    borderRadius: 75,
  },
});
