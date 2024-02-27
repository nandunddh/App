import { View, Text, StyleSheet, Image, Animated, TextInput, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import MyContext from '../MyContext';
import Ionicons from "react-native-vector-icons/Ionicons";
import { DB_URL } from './Constants/Constants';
import { useNavigation } from '@react-navigation/native';

const EditProfile = () => {
  const navigation = useNavigation();
  const { userData } = useContext(MyContext);
  const [name, setName] = useState('');
  const [mobilenumber, setMobileNumber] = useState('');
  const [location, setLocation] = useState('');
  const name1 = useRef();
  const mobilenumber1 = useRef();
  const loaction1 = useRef();

  useEffect(() => { }, [userData])

  const handleUpdate = async () => {
    console.log("name ", name, " phone ", mobilenumber, " location ", location);

    if (name.length === 0) {
      alert("Name can not be empty");
      name1.current.focus();
      return;
    } else if (mobilenumber.length === 0) {
      alert("Mobilenumber can not be empty");
      mobilenumber1.current.focus();
      return;
    } else if (location.length === 0) {
      alert("Location can not be empty");
      loaction1.current.focus();
      return;
    }

    try {
      const APIURL = `${DB_URL}updateDeatils.php`;
      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };

      const Data = {
        Email: userData.email,
        Name: name,
        Mobilenumber: mobilenumber,
        Location: location,
      };

      const response = await fetch(APIURL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(Data)
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }


      const responseData = await response.text();

      if (responseData) {
        try {
          const parsedData = JSON.parse(responseData); // Parse the response

          if (parsedData[0].Message === "Success") {
            alert(parsedData[0].Message);
            navigation.navigate("Profile");
          } else {
            alert(parsedData[0].Message);
            navigation.navigate("Profile");
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
      console.error("ERROR FOUND ", error);
    }
  }

  const notification_image = require("../assets/nandu.png");

  return (
    <>
      <Animated.ScrollView style={{ backgroundColor: "#fff", }}>
        <View style={styles.container}>
          <View style={styles.profile_container}>
            <Image source={notification_image} style={styles.profile_image} />
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.inputbox}>
              <Ionicons name="person-outline" size={30} color="black" style={{ marginRight: 15, marginLeft: 15, alignSelf: "center", justifyContent: "flex-end" }} />
              <TextInput style={styles.textinput} clearTextOnFocus={false} defaultValue={userData.name} onChangeText={name => setName(name)} ref={name1} />

            </View>

            <View style={styles.inputbox}>
              <Ionicons name="call-outline" size={30} color="black" style={{ marginRight: 15, marginLeft: 15, alignSelf: "center", justifyContent: "flex-end" }} />
              <TextInput style={styles.textinput} clearTextOnFocus={false} defaultValue={userData.mobilenumber} onChangeText={mobilenumber => setMobileNumber(mobilenumber)} ref={mobilenumber1} />

            </View>
            <View style={styles.inputbox}>
              <Ionicons name="location-outline" size={30} color="black" style={{ marginRight: 15, marginLeft: 15, alignSelf: "center", justifyContent: "flex-end" }} />
              <TextInput style={styles.textinput} clearTextOnFocus={false} defaultValue={userData.location} onChangeText={location => setLocation(location)} ref={loaction1} />

            </View>
            <View style={{ marginTop: 25, marginBottom: 40 }}>
              <TouchableOpacity style={{ borderRadius: 10, backgroundColor: "#363942", paddingVertical: 22 }} onPress={handleUpdate}>
                <Text style={{ color: "#fff", textAlign: "center" }}> Update </Text>
              </TouchableOpacity>
              {/* <Button title='SIGN IN' color="#000" /> */}
            </View>
          </View>
        </View>
      </Animated.ScrollView>
    </>
  )
}

export default EditProfile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profile_container: {
    alignItems: "center",
    paddingVertical: 30,
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
  textinput: {
    paddingHorizontal: 10,
    paddingVertical: 13,
    // width: "55%"
    flex: 6
  },
})