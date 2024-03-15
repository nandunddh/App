import React, { useContext } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import UserTabs from "./TabNav";
import DrawerScreen from "./Components/DrawerScreen";
import MyContext from "./MyContext";
import AdminTab from "./AdminTab";
import { AuthStackNavigator } from "./StackNav";


const Drawer = createDrawerNavigator();

const DrawerNav = () => {
  const { isAdmin, isLogin } = useContext(MyContext);

  const CustomDrawerContent = () => {
    return isLogin ? <DrawerScreen /> : null;
  };

  return (
    <>
      {isLogin ?
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

        :
        <AuthStackNavigator />
      }
    </>
  );
}

export default DrawerNav;