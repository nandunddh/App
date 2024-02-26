import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import { DB_URL } from '../Constants/Constants';
import Animated from 'react-native-reanimated';

const SignUp = ({ navigation }) => {
  const [hidePass, setHidePass] = useState(true);
  const [confhidePass, setConfHidePass] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [name, setName] = useState("");
  const email1 = useRef();
  const name1 = useRef();
  const password1 = useRef();
  const cnpassword1 = useRef();

  useEffect(() => {
    console.log("name", name)
    console.log("email", email)
    console.log("password", password)
    console.log("cnpassword", confirmPw)
  }, [email, name, password, confirmPw])


  const storeCredentials = async () => {
    try {
      await SecureStore.setItemAsync('email', email);
      await SecureStore.setItemAsync('password', password);
      // login()
      console.log('Credentials stored successfully.');
    } catch (error) {
      console.error('Error storing credentials:', error);
    }
  }


  const InsertRecord = () => {
    var Email = email;
    var fls = "false";
    var Name = name;
    var Password = password;
    var ConfirmPw = confirmPw;
    var checkEmail = RegExp(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i);

    if ((Email.length == 0) || (Password.length == 0) || (ConfirmPw.length == 0) || (Name.length == 0)) {
      alert("Required Field Is Missing!!!");
    } else if (!(checkEmail).test(Email)) {
      alert("invalid email!!!");
    }
    // Password validations
    else if (Password.length < 8) {
      alert("Minimum 08 characters required!!!");
    } else if (!((/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/).test(Password))) {
      alert("Use atleast 01 special character!!!");
    } else if (((/[ ]/).test(Password))) {
      alert("Don't include space in password!!!");
    } else if (Password !== ConfirmPw) {
      alert("Password doesnot match!!!");
    }
    else {
      var InsertAPIURL = `${DB_URL}Signup.php`;   //API to render signup
      // var InsertAPIURL = "http://192.168.2.117:8000/Signup.php";   //API to render signup

      var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };

      var Data = {
        Name: Name,
        Email: Email,
        Password: Password,
        isAdmin: fls,
        // Password: Password,
      };
      console.log("name", name)
      console.log("email", email)
      console.log("password", password)
      // FETCH func ------------------------------------
      fetch(InsertAPIURL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(Data) //convert data to JSON
      })
        .then((response) => response.json()) //check response type of API (CHECK OUTPUT OF DATA IS IN JSON)
        .then((response) => {
          alert(response[0].Message);
          console.log(response[0].Message);
          storeCredentials()
          navigation.navigate('Login Screen');
          console.log("DATA", Data)     // If data is in JSON => Display alert msg
          // this.props.navigation.navigate("SignInScreen"); //Navigate to next screen if authentications are valid
        })
        .catch((error) => {
          alert("Error Occured" + error);
        })
    }
    // console.log(first)
  }

  return (
    <SafeAreaProvider>
      <Animated.ScrollView>
        <View style={{ paddingHorizontal: 20, flex: 1, marginBottom: 20}}>
          <Text style={{ marginVertical: 20 }}>Create account and enjoy all services</Text>
          <View style={styles.inputbox}>
            <MaterialCommunityIcons name="account-outline" size={34} color="#000" style={{ marginRight: 15, marginLeft: 15, alignSelf: "center", }} />
            <TextInput style={styles.textinput} placeholder='Type your full name' clearTextOnFocus={false} onChangeText={name => setName(name)} ref={name1} defaultValue={name} />
            {/* <TextInput style={styles.textinput} placeholder='Type your full name' clearTextOnFocus={false} onChangeText={email => setEmail(email)} ref={email1}/> */}

          </View>
          <View style={styles.inputbox}>
            <MaterialCommunityIcons name="email-outline" size={30} color="black" style={{ marginRight: 15, marginLeft: 15, alignSelf: "center", justifyContent: "flex-end" }} />
            <TextInput style={styles.textinput} placeholder='Type your email' clearTextOnFocus={false} onChangeText={email => setEmail(email)} ref={email1} defaultValue={email} />

          </View>
          <View style={styles.inputbox}>
            <Feather name="lock" size={30} color="black" style={{ marginRight: 15, marginLeft: 15, alignSelf: "center", }} />
            <TextInput style={styles.textinput} placeholder='Type your password' clearTextOnFocus={true} secureTextEntry={hidePass ? true : false} onChangeText={password => setPassword(password)} ref={password1} defaultValue={password} />
            {hidePass ?
              <AntDesign name="eye" size={25} color="black" autoCorrect={false} onPress={() => setHidePass(!hidePass)} style={{ marginRight: 15, marginLeft: 15, alignSelf: "center", marginEnd: 10 }} />
              :
              <Entypo name="eye-with-line" size={25} color="black" autoCorrect={false} onPress={() => setHidePass(!hidePass)} style={{ marginRight: 15, marginLeft: 15, alignSelf: "center", marginEnd: 10 }} />

            }

          </View>
          <View style={styles.inputbox}>
            <Feather name="lock" size={30} color="black" style={{ marginRight: 15, marginLeft: 15, alignSelf: "center", flex: 1 }} />
            <TextInput style={styles.textinput} placeholder='Type your confirm password' clearTextOnFocus={true} secureTextEntry={confhidePass ? true : false} onChangeText={confirmPw => setConfirmPw(confirmPw)} ref={cnpassword1} defaultValue={confirmPw} />
            {confhidePass ?
              <AntDesign name="eye" size={25} color="black" autoCorrect={false} onPress={() => setConfHidePass(!confhidePass)} style={{ marginRight: 15, marginLeft: 15, alignSelf: "center", marginEnd: 10 }} />
              :
              <Entypo name="eye-with-line" size={25} color="black" autoCorrect={false} onPress={() => setConfHidePass(!confhidePass)} style={{ marginRight: 15, marginLeft: 15, alignSelf: "center", marginEnd: 10 }} />

            }

          </View>
          <View style={{ marginTop: 25, marginBottom: 40 }}>
            <TouchableOpacity style={{ borderRadius: 10, backgroundColor: "#363942", paddingVertical: 22 }} >
              <Text style={{ color: "#fff", textAlign: "center" }} onPress={InsertRecord}> SIGN IN </Text>
            </TouchableOpacity>
          </View>
          <View>
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
              <Text style={{ textAlign: "center", fontSize: 15 }}> Already have an account? <Text style={{ color: "#ff6500" }} onPress={() =>
                navigation.navigate('Login Screen')
              }> Sign In </Text></Text>
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
  )
}

export default SignUp

const styles = StyleSheet.create({
  inputbox: {
    borderWidth: 1,
    borderColor: "#e1e1e3",
    flexDirection: "row",
    borderRadius: 20,
    marginBottom: 20,
    flex: 1
  },
  firsttext: {
    fontSize: 20,
    marginVertical: 20,
    marginBottom: 40
    // color: "#838488"
  },
  textinput: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    // width: "60%"
    flex: 5
  },
  forgetpassword: {
    color: "#ff6500",
    textAlign: "right",
    marginVertical: 20
  },
  container: {
    flexDirection: 'row',
    alignItems: "center"
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