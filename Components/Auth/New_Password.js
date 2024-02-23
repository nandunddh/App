import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { DB_URL } from '../Constants/Constants';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Email } from './smtp';

const New_Password = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const email = route.params?.email;
  const New_Password1 = useRef();
  const [New_Password, setNew_Password] = useState('');



  const generateOTP = (params) => {

    const otpbody = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Reset Success</title>
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
          color: #007bff;
        }
  
        p {
          line-height: 1.6;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Password Reset Success</h1>
        <p>Hello ${email},</p>
        <p>Your password was successfully reset on ${Date()}.</p>
        <p>If you did not initiate this password reset, please contact our support team.</p>
        <p>Thank you for using our service!</p>
      </div>
    </body>
    </html>`;

    Email.send({
      Username: "nandugoud113@gmail.com",
      Password: "AC781B881AC3B360ACFFC638E3AC951181F8",
      // SecureToken: "95009f41-b2ce-4a70-947f-62c2449e5f69",
      Host: "smtp.elasticemail.com",
      To: 'nandu-pc2@outlook.com',
      From: "nandugoud113@gmail.com",
      Subject: "Password Reset | OTP Verification",
      Body: otpbody,
      Port: 2525,
      tracking_settings: {
        subscription_tracking: {
          enable: false
        }
      }
    }).then(
      alert("Password Reset Success"),
      // console.log("params", params)
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

  const handleSubmitNew_Password = async () => {
    if (New_Password.length == 0) {
      alert("Type your New Password");
      New_Password1.focus()
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
          New_Password: New_Password,
          email: email,
        };

        fetch(APIURL, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(Data)
        })
          .then((Response) => Response.json())
          .then((Response) => {
            if (Response[0].Message_status == "Success") {
              // alert(Response[0].Message);
              generateOTP()
              navigation.navigate('Sign_in');
            }
            else {
              alert(Response[0].Message);
            }
          })
          .catch((error) => {
            console.error("ERROR FOUND" + error);
          })
      } catch (error) {
        alert("Fetch Error!")
      }
      console.log("Resetemail", email)
    }
  }


  return (
    <SafeAreaProvider>
      <View style={{ paddingHorizontal: 20 }}>
        <Text style={{ marginVertical: 10, fontSize: 17 }}>Please enter New password </Text>
        <View>
          <View style={styles.inputbox}>
            <View style={{ flex: 1 }}>
              <TextInput style={styles.textinput} placeholder='Type your New Password' clearTextOnFocus={false} defaultValue={New_Password} onChangeText={New_Password => setNew_Password(New_Password)} ref={New_Password1} />
            </View>
            <MaterialCommunityIcons name="email-outline" size={30} color="black" style={{ marginRight: 15, marginLeft: 15, alignSelf: "center", justifyContent: "flex-end" }} />
          </View>
          <View style={{ marginTop: 25, marginBottom: 40 }}>
            <TouchableOpacity style={{ borderRadius: 10, backgroundColor: "#363942", paddingVertical: 22 }} onPress={handleSubmitNew_Password}>
              <Text style={{ color: "#fff", textAlign: "center" }}> Submit </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaProvider>
  )
}

export default New_Password

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