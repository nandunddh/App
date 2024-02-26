import React, { useContext, useEffect } from "react";

import { DrawerItem, createDrawerNavigator } from "@react-navigation/drawer";

import Home from "./Home";
import About from "./About";
import { AuthStackNavigator, ContactStackNavigator } from "./StackNav";
import UserTabs from "./TabNav";
import Profile from "./Components/Profile";
import DrawerScreen from "./Components/DrawerScreen";
import Login from "./Components/Auth/Login";
import MyContext from "./MyContext";


const Drawer = createDrawerNavigator();

const DrawerNav = () => {
  const { isLogin } = useContext(MyContext);
  useEffect(() => {
  }, [isLogin]);

  const CustomDrawerContent = () => {
    return isLogin ? <DrawerScreen /> : null;
  };
  
  return (
    <Drawer.Navigator
    drawerContent={CustomDrawerContent} >
      {
        isLogin ?

          <Drawer.Screen name="Drawer Home " component={UserTabs} options={{
            headerShown: false, headerTitle: "Home"
          }} />
          :
          <Drawer.Screen name="Profile" component={AuthStackNavigator} options={{
            headerShown: false, headerTitle: "Home"
          }} />
      }
    </Drawer.Navigator>
  );
}

export default DrawerNav;