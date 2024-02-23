import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import Home from "./Home";
import About from "./About";
import { ContactStackNavigator } from "./StackNav";
import UserTabs from "./TabNav";


const Drawer = createDrawerNavigator();

const DrawerNav = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Drawer Home " component={UserTabs} options={{
        headerShown : true, headerTitle: "Home"
      }}/>
      {/* <Drawer.Screen name="Contact" component={ContactStackNavigator} /> */}
    </Drawer.Navigator>
  );
}

export default DrawerNav;