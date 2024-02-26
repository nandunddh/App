import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MainStackNavigator } from "./StackNav";
import Notification from "./Components/Notification";
import About from "./About";
import Profile from "./Components/Profile";
import CurrentConferences from "./Components/CurrentConferences";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MyContext from "./MyContext";
import AddNotification from "./Components/Constants/AddNotification";

const Tab = createBottomTabNavigator();

const UserTabs = () => {
  const {storedCredentials} = useContext(MyContext);
  const user_name = "Nandu";
  
  const CustomDrawerHeader = ({ navigation }) => {
    const { isDrawerClicked, setIsDrawerClicked } = useContext(MyContext);
    const handlePress = () => {
      setIsDrawerClicked(true);
      console.log("button pressed");
      // return navigation.dispatch(DrawerActions.openDrawer());
      navigation.toggleDrawer()
    };
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

  const HeaderTitle = () => {
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
            {storedCredentials ? 
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}> {storedCredentials.username}</Text>
            :
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}> {user_name}</Text>
          }
          </View>
        </View>
      </View >
    )
  }

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
      <Tab.Screen name="User Home Tab" component={MainStackNavigator}
        options={({ navigation }) => ({
          headerShadowVisible: false,
          headerTitleStyle: {
            color: "#fff",
          },
          headerShown: false,
          headerLeft: () => <CustomDrawerHeader navigation={navigation} />,
          headerTitle: () => <HeaderTitle />,
          tabBarLabel: "",
          tabBarIcon: () => (
            <MaterialCommunityIcons name="home-variant-outline" size={30} />
          ),
          headerStyle: {
            backgroundColor: "#373a43",
            height: 120,
          },
          // headerRight: () => <View style={{ marginEnd: 20 }}>
          //   <Image
          //     source={require("./assets/nandu.png")}
          //     style={{ borderRadius: 25, marginLeft: 10, width: 60, height: 60 }}
          //   />
          // </View>
        })}
      />
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
      <Tab.Screen name="User Add Notification Tab" component={AddNotification} options={{
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