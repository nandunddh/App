// import React, { useContext } from "react";
// import { createStackNavigator } from "@react-navigation/stack";
// import Home from "./Home";
// import Notification from "./Components/Notification";
// import Profile from "./Components/Profile";
// import EditProfile from "./Components/EditProfile";
// import CurrentConferences from "./Components/CurrentConferences";
// import ConferenceScreen from "./Components/ConferenceScreen";
// import AboutConference from "./Components/AboutConference";
// import Login from "./Components/Auth/Login";
// import SignUp from "./Components/Auth/SignUp";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import { DrawerActions } from "@react-navigation/native";
// import MyContext from "./MyContext";
// import { Text, TouchableOpacity, View } from "react-native";

// const Stack = createStackNavigator();

// const screenOptionStyle = {
//   headerStyle: {
//     backgroundColor: "#363942",
//   },
//   headerTintColor: "white",
//   headerBackTitle: "Back",
// };

// const MainStackNavigator = () => {
//   const { storedCredentials } = useContext(MyContext);


//   const HeaderTitle = () => {
//     return (
//       <View>
//         <View style={{ flexDirection: "row" }}>
//           <View>
//             <Text style={{ color: "#fff" }}> Hi Welcome </Text>
//             <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20, textTransform: "capitalize" }}>
//               {" "}
//               {storedCredentials.username}
//             </Text>
//           </View>
//         </View>
//       </View>
//     );
//   };

//   const CustomDrawerHeader = ({ navigation }) => {
//     const handlePress = () => {
//       navigation.dispatch(DrawerActions.toggleDrawer());
//       console.log("Action performed");
//     };
//     return (
//       <View style={{ marginLeft: 20 }}>
//         <TouchableOpacity onPress={handlePress}>
//           <Ionicons name="menu" size={35} color={"#fff"} />
//         </TouchableOpacity>
//       </View>
//     );
//   };

//   return (
//     <Stack.Navigator screenOptions={screenOptionStyle}>
//       <Stack.Screen
//         name="Home Screen"
//         component={Home}
//         options={({ navigation }) => ({
//           headerShown: true,
//           headerTitle: () => <HeaderTitle />,
//           headerLeft: () => <CustomDrawerHeader navigation={navigation} />, // Pass navigation prop here
//           headerStyle: {
//             backgroundColor: "#373a43",
//             height: 120,
//           },
//           headerShadowVisible: false,
//           headerTitleAlign: "left"
//         })}
//       />
//       <Stack.Screen
//         name="Notification"
//         component={Notification}
//         options={{
//           headerShown: false,
//         }}
//       />
//       {/* other screens */}
//     </Stack.Navigator>
//   );
// };

// const AuthStackNavigator = () => {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerTitleAlign: "center",
//         headerTitle: "Login",
//       }}
//     >
//       <Stack.Screen
//         name="Login Screen"
//         component={Login}
//         options={{ cardStyle: { backgroundColor: "#fff" } }}
//       />
//       <Stack.Screen
//         name="SignUp Screen"
//         component={SignUp}
//         options={{ cardStyle: { backgroundColor: "#fff" } }}
//       />
//     </Stack.Navigator>
//   );
// };

// export { MainStackNavigator, AuthStackNavigator };



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
import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";

import Ionicons from 'react-native-vector-icons/Ionicons';
import ResetPassword from "./Components/Auth/ResetPassword";
import Verificationcode from "./Components/Auth/Verificationcode";
import New_Password from "./Components/Auth/New_Password";

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#363942",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};

const MainStackNavigator = () => {
  const user_name = "Nandu";


  const CustomDrawerHeader = ({ navigation }) => {
    const { isDrawerClicked, setIsDrawerClicked } = useContext(MyContext);
    const handlePress = () => {
      setIsDrawerClicked(true);
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

  const HeaderTitle = () => {
      const { storedCredentials } = useContext(MyContext);
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
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}> {storedCredentials.username}</Text>
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
      <Stack.Screen name="Login Screen" component={Login} options={{ cardStyle: { backgroundColor: '#fff' } }} />
      <Stack.Screen name="Reset_Password" component={ResetPassword} options={{ cardStyle: { backgroundColor: '#fff' } }} />
      <Stack.Screen name="Verificationcode" component={Verificationcode} options={{ cardStyle: { backgroundColor: '#fff' } }} />
      <Stack.Screen name="New_Password" component={New_Password} options={{ cardStyle: { backgroundColor: '#fff' } }} />
      <Stack.Screen name="SignUp Screen" component={SignUp} options={{ cardStyle: { backgroundColor: '#fff' } }} />
    </Stack.Navigator>
  );
}


export { MainStackNavigator, AuthStackNavigator };

