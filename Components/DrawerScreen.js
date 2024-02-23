import { View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native'
import React, { useContext } from 'react'
import MyContext from '../MyContext';


const DrawerScreen = () => {
  const user_name = "Nandu";
  const user_email = "nandu@test.com";
  const { isDrawerClicked, setIsDrawerClicked } = useContext(MyContext);


  return (

    <ImageBackground
      source={require('../assets/adaptive-icon.png')}
      resizeMode="center"
      style={{ flex: 1, paddingTop: 50 }}
    >
      {isDrawerClicked && (

        <View style={{ flex: 1, paddingTop: 50 }}>
          <View style={{ flexDirection: "row", alignSelf: "flex-end", }}>
            <View style={{ justifyContent: "center" }}>
              <Text style={{ fontWeight: "bold", fontSize: 20 }}> {user_name}</Text>
              <Text style={{ fontWeight: "bold", fontSize: 20 }}> {user_email}</Text>
            </View>
            <View>
              <Image
                source={require("../assets/nandu.png")}
                style={{ borderRadius: 25, marginLeft: 10, width: 100, height: 100 }}
              />
            </View>
          </View>
          <View>
            <View>
              <Text>Profile</Text>
            </View>
            <View>
              <Text>Contact Us</Text>
            </View>
            <View>
              <Text>Help & FAQs</Text>
            </View>
            <View>
              <Text>Sign Out</Text>
            </View>
          </View>
          <View>
            <Text>
              Version 1.0.0
            </Text>
            <Text>
              Privacy Policy | Terms & Conditions
            </Text>
          </View>
        </View>
      )}
    </ImageBackground>
  )
}

export default DrawerScreen