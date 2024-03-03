import React, { useState, useEffect, useContext } from 'react';
import { View, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import MyContext from '../MyContext';
import { DB_URL } from './Constants/Constants';

const UploadProfileImage = () => {
  const [image, setImage] = useState(null);
  const { profile, setProfile } = useContext(MyContext);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    })();
    console.log("profile path", profile);
  }, [profile]);

  
  const takePicture = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("result = ", result.assets[0].uri);

    if (result.canceled) {
      setImage(null);
    }
    else{
      setImage(result.assets[0].uri);
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      console.log('Result:', result);

      if (!result.canceled) {
        // Save the image path and file name
        const selectedAsset = result.assets[0];
        const imagePath = selectedAsset.uri;
        const fileName = `Image_${Date.now()}.jpg`;

        // Write the image to a folder in the document directory
        const destinationUri = `${FileSystem.documentDirectory}${fileName}`;
        await FileSystem.copyAsync({ from: imagePath, to: destinationUri });

        // Do something with the imagePath and fileName (e.g., save to state)
        setLogo_path(fileName)
        console.log('Image Path:', imagePath);
        console.log('File Name:', fileName);
        console.log('destinationUri:', destinationUri);

        // Set the image state to display the selected image
        // setImage(imagePath);
        setImage(destinationUri);
      }
    } catch (error) {
      alert('Kindly Select image');
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, marginBottom: 20 }} />}
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      <Button title="Capture Image" onPress={takePicture} />
    </View>
  );
};

export default UploadProfileImage;
