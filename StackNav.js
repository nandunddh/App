import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Home";
import Notification from "./Components/Notification";
import Profile from "./Components/Profile";
import EditProfile from "./Components/EditProfile";
import CurrentConferences from "./Components/CurrentConferences";
import ConferenceScreen from "./Components/ConferenceScreen";
import AboutConference from "./Components/AboutConference";
import Login from "./Components/Auth/Login";
import SignUp from "./Components/Auth/SignUp";
import Ionicons from "react-native-vector-icons/Ionicons";
import { DrawerActions } from "@react-navigation/native";
import MyContext from "./MyContext";
import { Text, TouchableOpacity, View } from "react-native";

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#363942",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};

const MainStackNavigator = () => {
  const { storedCredentials } = useContext(MyContext);


  const HeaderTitle = () => {
    return (
      <View>
        <View style={{ flexDirection: "row" }}>
          <View>
            <Text style={{ color: "#fff" }}> Hi Welcome </Text>
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20, textTransform: "capitalize" }}>
              {" "}
              {storedCredentials.username}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const CustomDrawerHeader = ({ navigation }) => {
    const handlePress = () => {
      navigation.dispatch(DrawerActions.toggleDrawer());
      console.log("Action performed");
    };
    return (
      <View style={{ marginLeft: 20 }}>
        <TouchableOpacity onPress={handlePress}>
          <Ionicons name="menu" size={35} color={"#fff"} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="Home Screen"
        component={Home}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: () => <HeaderTitle />,
          headerLeft: () => <CustomDrawerHeader navigation={navigation} />, // Pass navigation prop here
          headerStyle: {
            backgroundColor: "#373a43",
            height: 120,
          },
          headerShadowVisible: false,
          headerTitleAlign: "left"
        })}
      />
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{
          headerShown: false,
        }}
      />
      {/* other screens */}
    </Stack.Navigator>
  );
};

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerTitle: "Login",
      }}
    >
      <Stack.Screen
        name="Login Screen"
        component={Login}
        options={{ cardStyle: { backgroundColor: "#fff" } }}
      />
      <Stack.Screen
        name="SignUp Screen"
        component={SignUp}
        options={{ cardStyle: { backgroundColor: "#fff" } }}
      />
    </Stack.Navigator>
  );
};

export { MainStackNavigator, AuthStackNavigator };
