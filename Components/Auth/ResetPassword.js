import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { DB_URL } from '../Constants/Constants';
import { useNavigation } from '@react-navigation/native';
import { Email } from './smtp';
import Otpbody from './otpbody';

const ResetPassword = () => {

  const navigation = useNavigation();
  const email1 = useRef();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  useEffect(() => {
    console.log("otp == ", otp)
  }, [otp])

  const generateOTP = (params) => {

    Email.send({
      Username: "nandugoud113@gmail.com",
      Password: "AC781B881AC3B360ACFFC638E3AC951181F8",
      // SecureToken: "95009f41-b2ce-4a70-947f-62c2449e5f69",
      Host: "smtp.elasticemail.com",
      To: 'nandu-pc2@outlook.com',
      From: "nandugoud113@gmail.com",
      Subject: "Password Reset | OTP Verification",
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
      Port: 2525
    }).then(
        alert("OTP sent successfully"),
        console.log("params", params)
      ).catch(
        console.log("error in smtp")
      )


    // const credentials = {
    //   host: 'smtp.elasticemail.com',
    //   SecureToken: "95009f41-b2ce-4a70-947f-62c2449e5f69",
    //   port: 2525,
    //   secure: true,
    // }
    // Email.connect(credentials)
    //   .then(info => console.log(info))
    //   .catch(err => console.error(err))


  }

  const handleReset = async () => {
    if (email.length == 0) {
      alert("Type your email");
      email1.focus()
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
          Email: email,
        };

        fetch(APIURL, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(Data)
        })
          .then((Response) => Response.json())
          .then((Response) => {
            if (Response[0].Message == "Success") {
              // alert(Response[0].Password);
              // alert(Response[0].OTP);
              // setOtp(Response[0].OTP)
              generateOTP(Response[0].OTP)
              navigation.navigate('Verificationcode', { email });
            }
            else if (Response[0].Message == "Failed") {
              alert(Response[0].Password);
              navigation.navigate('Sign_in');
            } else {
              alert(Response[0].Message);
              navigation.navigate('Sign_in');
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
        <Text style={{ marginVertical: 10, fontSize: 17 }}>Please enter your email address to request a password rest</Text>
        <View>
          <View style={styles.inputbox}>
            <View style={{ flex: 1 }}>
              <TextInput style={styles.textinput} placeholder='Type your email' clearTextOnFocus={false} defaultValue={email} onChangeText={email => setEmail(email)} ref={email1} />
            </View>
            <MaterialCommunityIcons name="email-outline" size={30} color="black" style={{ marginRight: 15, marginLeft: 15, alignSelf: "center", justifyContent: "flex-end" }} />
          </View>
          <View style={{ marginTop: 25, marginBottom: 40 }}>
            <TouchableOpacity style={{ borderRadius: 10, backgroundColor: "#363942", paddingVertical: 22 }} onPress={handleReset}>
              <Text style={{ color: "#fff", textAlign: "center" }}> RESET </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaProvider>
  )
}

export default ResetPassword

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