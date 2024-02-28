import React, { useContext, useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { AuthStackNavigator } from "./StackNav";
import UserTabs from "./TabNav";
import DrawerScreen from "./Components/DrawerScreen";
import MyContext from "./MyContext";
import AdminTab from "./AdminTab";


const Drawer = createDrawerNavigator();

const DrawerNav = () => {
  const { isLogin } = useContext(MyContext);
  useEffect(() => {
  }, [isLogin]);

  const CustomDrawerContent = () => {
    console.log("islogin from Drawer nav = ", isLogin);
    return isLogin ? <DrawerScreen /> : null;
  };

  return isLogin ? (
    <Drawer.Navigator drawerContent={CustomDrawerContent}>
      <Drawer.Screen
        name="Drawer Home"
        component={UserTabs}
        options={{ headerShown: false, headerTitle: "Home" }}
      />
      <Drawer.Screen
        name="Admin Tab"
        component={AdminTab}
        options={{ headerShown: false, headerTitle: "Home" }}
      />
    </Drawer.Navigator>
  ) : (
    <AuthStackNavigator />
  );
}

export default DrawerNav;