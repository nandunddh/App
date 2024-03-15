import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext, useRef, useState } from 'react'
import Animated from 'react-native-reanimated'
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MyContext from '../MyContext';
import { Messgae } from './Auth/Messgae';

const ContactUs = ({ navigation }) => {
  // const navigation = useNavigation();
  const { userData, setUserData } = useContext(MyContext);
  const { status, setStatus } = useState();
  const [name, setName] = useState(userData.name);
  const [mobilenumber, setMobileNumber] = useState(userData.mobilenumber);
  const [email, setEmail] = useState(userData.email);
  const [message, setMessage] = useState("");
  const name1 = useRef();
  const mobilenumber1 = useRef();
  const message1 = useRef();
  const email1 = useRef();

  const handleSubmit = () => {
    Messgae({ email, name, mobilenumber, message }, (status) => {
      if (status == true) {
        setMessage("");
      }
    })
  }
  return (
    <Animated.ScrollView style={{ backgroundColor: "#fff", }}>
      <View style={{ flex: 1 }}>
        {/* <View style={{paddingTop: insets.top, paddingHorizontal: 20 }}> */}
        <View style={{ paddingHorizontal: 20, }}>
          <View style={{ alignItems: 'center' }}>
            <Image source={require('../assets/logo.png')} />
          </View>

          <View
            style={{
              marginTop: 15,
              borderTopRightRadius: 30,
              borderTopLeftRadius: 30,
            }}
          >
            <View style={{ flex: 1 }}>
              <View style={styles.inputbox}>
                <MaterialCommunityIcons name="account-circle-outline" size={30} color="black" style={{ marginRight: 15, marginLeft: 15, alignSelf: "center", justifyContent: "flex-end" }} />
                <TextInput style={styles.textinput} clearTextOnFocus={false} defaultValue={name} placeholder='Enter Name' onChangeText={name => setName(name)} ref={name1} />

              </View>

              <View style={styles.inputbox}>
                <MaterialCommunityIcons name="email-outline" size={30} color="black" style={{ marginRight: 15, marginLeft: 15, alignSelf: "center", justifyContent: "flex-end" }} />
                <TextInput style={styles.textinput} clearTextOnFocus={false} defaultValue={email} onChangeText={email => setEmail(email)} ref={email1} placeholder='Enter Name' />

              </View>
              <View style={styles.inputbox}>
                <Ionicons name="call-outline" size={30} color="black" style={{ marginRight: 15, marginLeft: 15, alignSelf: "center", justifyContent: "flex-end" }} />
                <TextInput style={styles.textinput} clearTextOnFocus={false} defaultValue={mobilenumber} onChangeText={mobilenumber => setMobileNumber(mobilenumber)} ref={mobilenumber1} />

              </View>
              <View style={styles.inputboxtextarea}>
                <MaterialCommunityIcons name="message-text" size={30} color="black" style={{ marginRight: 15, marginLeft: 15, }} />
                <TextInput style={{ height: 150, paddingTop: 10, paddingLeft: 10, textAlignVertical: 'top', }} clearTextOnFocus={false} defaultValue={message} placeholder="Enter Message" onChangeText={message => setMessage(message)} ref={message1} />

              </View>
              <View style={{ marginTop: 25, marginBottom: 40 }}>
                <TouchableOpacity style={{ borderRadius: 10, backgroundColor: "#363942", paddingVertical: 22 }} onPress={handleSubmit}>
                  <Text style={{ color: "#fff", textAlign: "center" }}> Submit </Text>
                </TouchableOpacity>
                {/* <Button title='SIGN IN' color="#000" /> */}
              </View>
            </View>
          </View>
        </View>
      </View>
    </Animated.ScrollView>
  )
}

export default ContactUs


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: "center",
    marginBottom: 20,
  },
  profile_image: {
    height: 150,
    width: 150,
    marginBottom: 15,
  },
  profile_name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  inputbox: {
    borderWidth: 2,
    borderColor: "#e1e1e3",
    flexDirection: "row",
    borderRadius: 20,
    marginBottom: 20,
    flex: 1,
  },
  inputboxtextarea: {
    borderWidth: 2,
    borderColor: "#e1e1e3",
    flexDirection: "row",
    borderRadius: 20,
    marginBottom: 20,
    // flex: 1,
  },
  textinput: {
    paddingHorizontal: 10,
    paddingVertical: 13,
    flex: 6
  },
  textarea: {
    height: 150,
  }
})