import React, { useContext, useEffect, useMemo } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { AuthStackNavigator } from "./StackNav";
import UserTabs from "./TabNav";
import DrawerScreen from "./Components/DrawerScreen";
import MyContext from "./MyContext";
import AdminTab from "./AdminTab";


const Drawer = createDrawerNavigator();

const DrawerNav = () => {
  const memorizedislogin = useMemo(() => isLogin, [isLogin]);
  const { isLogin, isAdmin } = useContext(MyContext);
  useEffect(() => {
  }, [memorizedislogin]);

  const CustomDrawerContent = () => {
    return isLogin && <DrawerScreen /> ;
  };

  return isLogin ? (
    <Drawer.Navigator drawerContent={CustomDrawerContent}>
      {
        isAdmin ?

          <Drawer.Screen
            name="Admin Tab"
            component={AdminTab}
            options={{ headerShown: false, headerTitle: "Home" }}
          />
          :
          <Drawer.Screen
            name="Drawer Home"
            component={UserTabs}
            options={{ headerShown: false, headerTitle: "Home" }}
          />
      }
    </Drawer.Navigator>
  ) : (
    <AuthStackNavigator />
  );
}

export default DrawerNav;