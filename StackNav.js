import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Home";
import About from "./About";
import Notification from "./Components/Notification";
import Profile from "./Components/Profile";
import EditProfile from "./Components/EditProfile";
import CurrentConferences from "./Components/CurrentConferences";
import ConferenceScreen from "./Components/ConferenceScreen";
import AboutConference from "./Components/AboutConference";

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


export { MainStackNavigator };

