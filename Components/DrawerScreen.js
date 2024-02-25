import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import React, { useContext } from "react";
import MyContext from "../MyContext";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialsCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import Octicons from "react-native-vector-icons/Octicons";

const DrawerScreen = () => {
  const user_name = "Nandu";
  const user_email = "nandu@test.com";
  const { isDrawerClicked, setIsDrawerClicked } = useContext(MyContext);

  return (
    // <ImageBackground
    //   source={require("../assets/adaptive-icon.png")}
    //   resizeMode="center"
    //   style={{ flex: 1, paddingTop: 50 }}
    // >
    <View style={{paddingTop: 50}}>
      {isDrawerClicked && (
        <View >
          <View style={{ flexDirection: "row", borderBottomWidth: 2, borderBottomColor: "orange", paddingBottom: 20 }}>
            <View style={{marginLeft: 10}}>
              <Image
                source={require("../assets/nandu.png")}
                style={{ borderRadius: 25, width: 80, height: 80 }}
              />
            </View>
            <View style={{ justifyContent: "center", paddingLeft: 10 }}>
              <Text style={{ fontWeight: "bold", fontSize: 20, paddingTop: 20 }}>
                {" "}
                {user_name}
              </Text>
              <Text style={{ fontSize: 15, paddingVertical: 10 }}>
                {" "}
                {user_email}
              </Text>
            </View>
          </View>
          <View style={{ marginVertical: 30,}}>
            <View style={{flexDirection: "row", alignItems: "center", paddingHorizontal: 20, backgroundColor: "#eee", paddingHorizontal: 5, margin: 10, borderRadius: 15, paddingVertical : 10 }}>
              <MaterialsCommunityIcons name="account-outline" size={35} style={{flex: 1}}/>
              <Text style={{flex: 4}}>Profile</Text>
            </View>
            <View style={{flexDirection: "row", alignItems: "center", margin: 10, paddingHorizontal:5, borderRadius: 15, paddingVertical: 10, paddingLeft: 20, backgroundColor: "#eee"}}>
              <MaterialsCommunityIcons name="account-edit-outline" size={35} style={{flex: 1}}/>
              <Text style={{flex: 4}}>Edit Profile</Text>
            </View>
            <View style={{flexDirection: "row", alignItems: "center", margin: 10, paddingHorizontal:5, borderRadius: 15, paddingVertical: 10, paddingLeft: 20, backgroundColor: "#eee"}}>
              <Fontisto name="email" size={30} style={{flex: 1}}/>
              <Text style={{flex: 4}}>Contact Us</Text>
            </View>
            <View style={{flexDirection: "row", alignItems: "center", margin: 10, paddingHorizontal:5, borderRadius: 15, paddingVertical: 10, paddingLeft: 20, backgroundColor: "#eee"}}>
            <Ionicons name="help-circle-outline" size={35} style={{flex: 1}}/>
              <Text style={{flex: 4}}>Help & FAQs</Text>
            </View>
            <View style={{flexDirection: "row", alignItems: "center", margin: 10, paddingHorizontal:5, borderRadius: 15, paddingVertical: 10, paddingLeft: 20, backgroundColor: "#eee"}}>
            <Octicons name="sign-out" size={35} style={{flex: 1}}/>
              <Text style={{flex: 4}}>Sign Out</Text>
            </View>
          </View>
          <View
            style={{ 
              marginBottom: 50, paddingHorizontal: 10
            }}
          >
            <Text>Privacy Policy | Terms & Conditions</Text>
            <Text>Version 1.0.0</Text>
          </View>
        </View>
      )}
    {/* </ImageBackground> */}
    </View>
  );
};

export default DrawerScreen
