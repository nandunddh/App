import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { DB_URL } from '../Constants/Constants';
import { useNavigation, useRoute } from '@react-navigation/native';

const Verificationcode = () => {
  const route = useRoute();
  const email = route.params?.email;
  const navigation = useNavigation();
  const otp1 = useRef();
  const [otp, setOtp] = useState('');

  const handleSubmitOtp = async () => {
    if (otp.length == 0) {
      alert("Type your Otp");
      otp1.focus()
    }
    else {
      try {
        var APIURL = `${DB_URL}resetpassword.php`;
        // var APIURL = "http://127.0.0.1:8000/USG/login.php";

        var headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        };

        var Data = {
          OTP: otp,
        };

        fetch(APIURL, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(Data)
        })
          .then((Response) => Response.json())
          .then((Response) => {
            // console.log("Login ===", Response);
            if (Response[0].Message == "Success") {
              alert(Response[0].Password);
              navigation.navigate('New_Password', { email });
            } else {
              alert(Response[0].Password);
            }
          })
          .catch((error) => {
            console.error("ERROR FOUND" + error);
          })
      } catch (error) {
        alert("Fetch Error!")
      }
    }
  }


  return (
    <SafeAreaProvider>
      <View style={{ paddingHorizontal: 20 }}>
        <Text style={{ marginVertical: 10, fontSize: 17 }}>Please enter 6 Digit code sent to email to password rest</Text>
        <View>
          <View style={styles.inputbox}>
            <View style={{ flex: 1 }}>
              <TextInput style={styles.textinput} placeholder='Type your otp' clearTextOnFocus={false} defaultValue={otp} onChangeText={otp => setOtp(otp)} ref={otp1} />
            </View>
            <MaterialCommunityIcons name="email-outline" size={30} color="black" style={{ marginRight: 15, marginLeft: 15, alignSelf: "center", justifyContent: "flex-end" }} />
          </View>
          <View style={{ marginTop: 25, marginBottom: 40 }}>
            <TouchableOpacity style={{ borderRadius: 10, backgroundColor: "#363942", paddingVertical: 22 }} onPress={handleSubmitOtp}>
              <Text style={{ color: "#fff", textAlign: "center" }}> Submit </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaProvider>
  )
}

export default Verificationcode

const styles = StyleSheet.create({
  inputbox: {
    borderWidth: 1,
    borderColor: "#e1e1e3",
    flexDirection: "row",
    borderRadius: 20,
    marginBottom: 20,
    marginTop: 20
    // justifyContent: "flex-start"
  },
  textinput: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    // width: "80%"
  },
})