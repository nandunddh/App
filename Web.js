import React from 'react'
import EventsList from './Components/EventsList';
import WebHome from './Components/Web/WebHome';
import { NavigationContainer } from '@react-navigation/native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WebEventsList from './Components/Web/WebEventsList';

const Tab = createBottomTabNavigator();

const Web = () => {
  return (
    <NavigationContainer>
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
        <Tab.Screen name="Web Home Tab" component={WebHome}
          options={{
            headerShown: false,
            tabBarLabel: "",
            tabBarIcon: () => (
              <MaterialCommunityIcons name="home-variant-outline" size={30} />
            ),
          }}
        />
        <Tab.Screen name="Web EventsList Tab" component={WebEventsList}
          options={{
            headerShown: false,
            tabBarLabel: "",
            tabBarIcon: () => (
              <Ionicons name="list" size={30} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default Web