import { View, Text, StyleSheet, Image, Animated, TextInput, TouchableOpacity, LogBox } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import MyContext from '../MyContext';
import Ionicons from "react-native-vector-icons/Ionicons";
import { DB_URL } from './Constants/Constants';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Button } from '@rneui/base';

const EditProfile = () => {
  const navigation = useNavigation();
  const { userData, setUserData } = useContext(MyContext);
  const [name, setName] = useState(userData ? userData.name : "");
  const [mobilenumber, setMobileNumber] = useState(userData ? userData.mobilenumber : "");
  const [location, setLocation] = useState(userData ? userData.location : "");
  const name1 = useRef();
  const mobilenumber1 = useRef();
  const loaction1 = useRef();

  const [image, setImage] = useState(null);
  const [old_path, setold_path] = useState(userData.profile);
  const [profile_path, setProfile_path] = useState(userData.profile);

  LogBox.ignoreLogs(['Key "cancelled" in the image picker result is deprecated']);

  const handleUpdate = async () => {
    console.log("name ", name, " phone ", mobilenumber, " location ", location, "profile ", profile_path);

    if ((name !== userData.name) || (mobilenumber !== userData.mobilenumber) || (location !== userData.location || (profile_path !== userData.profile))) {

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
      else {
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
            Image: profile_path,
          };

          if (profile_path !== userData.profile) {

            const uri = image;

            const formData = new FormData();
            formData.append('new_image', { uri, name: profile_path, type: 'image/jpg' });
            formData.append('old_image', old_path);

            // Make a POST request to the PHP script
            fetch(`${DB_URL}profileUpdate.php`, {
              method: 'POST',
              body: formData,
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            })
              .then((response) => response.json())
              .then((data) => {
                console.log("data", data);
                // Handle the response as needed
              })
              .catch((error) => {
                console.error('Error uploading image:', error);
              });
          }
          // }

          const response = await fetch(APIURL, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(Data)
          });

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }


          const responseData = await response.text();
          console.log("response = ", responseData)

          if (responseData) {
            try {
              const parsedData = JSON.parse(responseData); // Parse the response

              if (parsedData[0].Message === "Success") {
                alert(parsedData[0].Message);
                await setUserData(parsedData[0].Data[0]); // Update userData in the global context
                navigation.goBack();
                // navigation.navigate("Profile");
                console.log("Edit Status", parsedData[0].Data[0])
              } else {
                alert(parsedData[0].Message);
                navigation.goBack();
              }
            } catch (error) {
              console.error("Error parsing response data Edit:", error);
              alert("Error parsing response data Edit");
            }
          } else {
            console.error("Empty response from server");
            // Handle empty response here
          }
        } catch (error) {
          console.error("ERROR FOUND ", error);
        }
      }
    } else {
      alert("No Change Found!");
    }
  }

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }

    })();
    console.log("profile path", profile_path);
  }, [profile_path]);


  const takePicture = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (result.canceled) {
        setImage(null);
        setProfile_path(userData.profile);
      } else {

        const selectedAsset = result.assets[0];
        const imagePath = selectedAsset.uri;
        const randomNumber = Math.floor(Math.random() * 1000); // Generates a random number between 0 and 999
        const fileName = `Image_${Date.now()}_${randomNumber}.jpg`;

        // Write the image to a folder in the document directory
        const destinationUri = `${FileSystem.documentDirectory}${fileName}`;
        await FileSystem.copyAsync({ from: imagePath, to: destinationUri });

        // Do something with the imagePath and fileName (e.g., save to state)
        setProfile_path(fileName)
        console.log('Image Path:', imagePath);
        console.log('File Name:', fileName);
        console.log('destinationUri:', destinationUri);

        // Set the image state to display the selected image
        // setImage(imagePath);
        setImage(destinationUri);
      }
    } catch (error) {
      console.error('Error occurred while taking a picture:', error);
      // Handle the error here, such as showing an alert
    }
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
        setProfile_path(userData.profile);
      } else {
        const selectedAsset = result.assets[0];
        const imagePath = selectedAsset.uri;
        const randomNumber = Math.floor(Math.random() * 1000); // Generates a random number between 0 and 999
        const fileName = `Image_${Date.now()}_${randomNumber}.jpg`;

        const destinationUri = `${FileSystem.documentDirectory}${fileName}`;
        await FileSystem.copyAsync({ from: imagePath, to: destinationUri });

        setProfile_path(fileName);
        setImage(destinationUri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'An error occurred while picking an image.');
    }
  };


  return (
    <>
      <Animated.ScrollView style={{ backgroundColor: "#fff", }}>
        <View style={styles.container}>
          <View style={styles.profile_container}>
            {image == null ?
              <Image source={{ uri: `${DB_URL}uploads/user_profile/${userData.profile}` }} style={styles.profile_image} />
              :
              <Image source={{ uri: image }} style={styles.profile_image} />
            }
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity title="Choose from gallery" onPress={pickImage} style={{ marginRight: 10, backgroundColor: "#363942", borderRadius: 10 }}>
                <Text style={{ color: "#fff", paddingHorizontal: 20, paddingVertical: 10 }}>Choose from Gallery</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity title="Capture Image" onPress={takePicture} style={{ marginRight: 10, backgroundColor: "#363942", borderRadius: 10 }}>
                <Text style={{ color: "#fff", paddingHorizontal: 20, paddingVertical: 10 }}>Capture Image</Text>
              </TouchableOpacity> */}
            </View>
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
    borderRadius: 75

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