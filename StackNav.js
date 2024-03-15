import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Home";
import About from "./About";
import Login from "./Components/Auth/Login";
import Notification from "./Components/Notification";
import Profile from "./Components/Profile";
import EditProfile from "./Components/EditProfile";
import CurrentConferences from "./Components/CurrentConferences";
import ConferenceScreen from "./Components/ConferenceScreen";
import AboutConference from "./Components/AboutConference";
import SignUp from "./Components/Auth/SignUp";
import MyContext from "./MyContext";
import { Text, TouchableOpacity, View } from "react-native";

import Ionicons from 'react-native-vector-icons/Ionicons';
import ResetPassword from "./Components/Auth/ResetPassword";
import Verificationcode from "./Components/Auth/Verificationcode";
import New_Password from "./Components/Auth/New_Password";
import ContactUs from "./Components/ContactUs";
import { Messgae } from "./Components/Auth/Messgae";
import EditScreen from "./Components/EditScreen";
import { useNavigation } from "@react-navigation/native";

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#363942",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};

const MainStackNavigator = () => {

  const CustomDrawerHeader = ({ navigation }) => {
    const handlePress = () => {
      return (
        navigation.toggleDrawer()
      )
    }
    return (
      <View style={{ marginLeft: 20 }}>
        <TouchableOpacity onPress={handlePress}>
          {/* <Image
            source={require("./assets/nandu.png")}
            style={{ borderRadius: 25, marginLeft: 10, width: 60, height: 60 }}
          /> */}
          <Ionicons name="menu" size={35} color={"#fff"} />
        </TouchableOpacity>
      </View>
    );
  };
  const HeaderLeft = () => {
    const navigation = useNavigation();
    return (
      <View style={{ marginLeft: 20 }}>
        <TouchableOpacity onPress={() => navigation.navigate("EventsList")}>
          {/* <Image
            source={require("./assets/nandu.png")}
            style={{ borderRadius: 25, marginLeft: 10, width: 60, height: 60 }}
          /> */}
          <Ionicons name="arrow-undo-outline" size={35} color={"#fff"} />
        </TouchableOpacity>
      </View>
    );
  };

  const HeaderTitle = () => {
    const { userData } = useContext(MyContext);

    return (
      <View>
        <View style={{ flexDirection: "row" }}>
          {/* <View>
            <Image
              source={require("./assets/favicon.png")}
              style={{ borderRadius: 25, marginLeft: 10 }}
            />
          </View> */}
          <View>
            <Text style={{ color: "#fff" }}> Hi Welcome </Text>
            {userData ? 
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20, }}> {userData.name}</Text>
            :
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20, }}> loading...</Text>
          }
          </View>
        </View>
      </View >
    )
  }

  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Home Screen" component={Home} options={({ navigation }) => ({
        headerLeft: () => <CustomDrawerHeader navigation={navigation} />,
        headerShown: true,
        headerTitle: () => <HeaderTitle />,
        headerShadowVisible: false,
      }
      )
      } />
      <Stack.Screen name="Notification" component={Notification} options={{
        headerShown: false,
      }} />

      <Stack.Screen name="CurrentConferences screen" component={CurrentConferences} options={{
        headerShown: false
      }} />

      <Stack.Screen name="Conference screen" component={ConferenceScreen} options={({ route }) => ({ title: route.params.name, headerTitleAlign: "center" })} />
      <Stack.Screen name="About Conference" component={AboutConference} options={({ route }) => ({ title: route.params.name, headerTitleAlign: "center" })} />
      <Stack.Screen name="Profile" component={Profile} options={({ route }) => ({ title: route.params.name, headerTitleAlign: "center" })} />
      <Stack.Screen name="Edit_Profile" component={EditProfile} options={{ headerTitleAlign: "center", headerTitle: "Edit Details" }} />
      <Stack.Screen name="ContactUs" component={ContactUs} options={{ headerTitleAlign: "center", headerTitle: "Contact Us" }} />
      <Stack.Screen name="EditScreen" component={EditScreen} options={({ route }) => ({ title: route.params.data.name, headerTitleAlign: "center", headerLeft: () => <HeaderLeft /> })} />
      {/* {/* <Stack.Screen name="" component={About} /> */}
    </Stack.Navigator>
  );
}

const AuthStackNavigator = () => {
  console.log("AuthStacknav");
  return (
    <Stack.Navigator screenOptions={{
      headerTitleAlign: "center",
      headerTitle: "Login",
    }}>
      <Stack.Screen name="Login Screen" component={Login} options={{ cardStyle: { backgroundColor: '#fff' } }} />
      <Stack.Screen name="Reset_Password" component={ResetPassword} options={{ cardStyle: { backgroundColor: '#fff' } }} />
      <Stack.Screen name="Verificationcode" component={Verificationcode} options={{ cardStyle: { backgroundColor: '#fff' } }} />
      <Stack.Screen name="New_Password" component={New_Password} options={{ cardStyle: { backgroundColor: '#fff' } }} />
      <Stack.Screen name="SignUp Screen" component={SignUp} options={{ cardStyle: { backgroundColor: '#fff' } }} />
    </Stack.Navigator>
  );
}


export { MainStackNavigator, AuthStackNavigator };

