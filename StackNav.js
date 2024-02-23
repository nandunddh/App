import React from "react";
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

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#363942",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Home Screen" component={Home} options={{
        headerShown: false
      }} />
      <Stack.Screen name="Notification" component={Notification} options={{
        headerShown: false,
      }} />

      <Stack.Screen name="CurrentConferences screen" component={CurrentConferences} options={{
        headerShown: false
      }} />
    
      <Stack.Screen name="Conference screen" component={ConferenceScreen} options={({ route }) => ({ title: route.params.name, headerTitleAlign: "center" })} />
      <Stack.Screen name="About Conference" component={AboutConference} options={({ route }) => ({ title: route.params.name, headerTitleAlign: "center" })} />
      <Stack.Screen name="Profile" component={Profile} options={{
        headerShown: false
      }} />
      <Stack.Screen name="Edit_Profile" component={EditProfile} options={{
        headerShown: true
      }} />
      <Stack.Screen name="Contact Screen" component={About} />
    </Stack.Navigator>
  );
}

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerTitleAlign: "center",
      headerTitle: "Login",
    }}>
      <Stack.Screen name="Login Screen" component={Login} options={{cardStyle: { backgroundColor: '#fff' }}}/>
      <Stack.Screen name="SignUp Screen" component={SignUp} options={{cardStyle: { backgroundColor: '#fff' }}}/>
    </Stack.Navigator>
  );
}


export { MainStackNavigator, AuthStackNavigator };

