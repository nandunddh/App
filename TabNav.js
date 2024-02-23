import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MainStackNavigator } from "./StackNav";
import Notification from "./Components/Notification";
import About from "./About";
import Profile from "./Components/Profile";
import CurrentConferences from "./Components/CurrentConferences";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet, View } from "react-native";

const Tab = createBottomTabNavigator();

const UserTabs = () => {

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0, // Hide the default top border
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
        tabBarIconStyle: {
          marginBottom: -3,
          marginTop: 5, // Adjust icon position vertically
        },
      }}>
      <Tab.Screen name="User Home Tab" component={MainStackNavigator} options={{
        headerShown: false, title: "Home",
        tabBarLabel: "",
        tabBarIcon: () => (
          <MaterialCommunityIcons name="home-variant-outline" size={30} />
        ),
      }} />
      <Tab.Screen name="User CurrentConference Tab" component={CurrentConferences} options={{
        headerTitleAlign: "center",
        tabBarLabel: "",
        tabBarIcon: () => (
          <MaterialIcons name="live-tv" size={30} />
        ),
        headerTitle: "Current Conferences"
      }} />
      <Tab.Screen name="User Notification Tab" component={Notification} options={{
        headerTitleAlign: "center",
        tabBarLabel: "",
        tabBarIcon: () => (
          <Ionicons name="notifications-outline" size={30} />
        ),
      }} />

      <Tab.Screen name="User Profile Tab" component={Profile} options={{
        headerTitleAlign: "center",
        tabBarLabel: " ",
        headerTitle: "Profile-1",
        tabBarIcon: () => (
          <MaterialCommunityIcons name="account-outline" size={30} />
        ),
      }} />
    </Tab.Navigator>
  );
};


export default UserTabs;