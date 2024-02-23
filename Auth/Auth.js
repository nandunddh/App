import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Home"
import About from "./About"

const Stack = createStackNavigator();


const StackNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="About" component={About} />
    </Stack.Navigator>
  );
}

export { StackNav };