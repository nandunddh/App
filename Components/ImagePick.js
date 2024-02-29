import React, { useState, useEffect, useContext } from 'react';
import { View, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { DB_URL } from './Constants/Constants';
import MyContext from '../MyContext';

const ImagePick = () => {
  const [image, setImage] = useState(null);
  const {Logo_path, setLogo_path} = useContext(MyContext);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    })();
    console.log("logo path", Logo_path);
  }, [Logo_path]);


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

        // Assume `result.uri` is the URI of the selected image
        const uri = destinationUri;

        // Create FormData object to send the image file
        const formData = new FormData();
        formData.append('image', { uri, name: fileName, type: 'image/jpg' });

        // Make a POST request to the PHP script
        fetch(`${DB_URL}Logoupload.php`, {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            // Handle the response as needed
          })
          .catch((error) => {
            console.error('Error uploading image:', error);
          });
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, marginBottom: 20 }} />}
      <Button title="Pick an image from camera roll" onPress={pickImage} />
    </View>
  );
};

export default ImagePick;
