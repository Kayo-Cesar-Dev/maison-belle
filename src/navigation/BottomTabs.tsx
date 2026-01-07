import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";

import HomeScreen from "../screens/Home/HomeScreen";
import ProfileScreen from "../screens/Home/ProfileScreen";
import AppointmentsScreen from "../screens/Home/AppointmentsScreen";
import ServicesScreen from "../screens/Home/ServicesScreen";

const Tab = createBottomTabNavigator();

const { height } = Dimensions.get("window");
const gestureBar = getBottomSpace();

const dynamicTabHeight = 60 + height * 0.03;
const dynamicPaddingBottom = 8 + gestureBar * 0.6;
const dynamicPaddingTop = 8 + height * 0.005;

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#986C6A",
        tabBarInactiveTintColor: "#888",
        tabBarStyle: {
          backgroundColor: "#FFF",
          borderTopColor: "#EEE",
          height: dynamicTabHeight,
          paddingBottom: dynamicPaddingBottom,
          paddingTop: dynamicPaddingTop,
          elevation: 10,
        },
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={HomeScreen}
        options={{
          tabBarLabel: "Início",
          tabBarIcon: ({ color }) => <Feather name="home" size={26} color={color} />,
        }}
      />

      <Tab.Screen
        name="Agendamentos"
        component={AppointmentsScreen}
        options={{
          tabBarLabel: "Agenda",
          tabBarIcon: ({ color }) => <Feather name="calendar" size={26} color={color} />,
        }}
      />

      <Tab.Screen
        name="Servicos"
        component={ServicesScreen}
        options={{
          tabBarLabel: "Serviços",
          tabBarIcon: ({ color }) => <Feather name="scissors" size={26} color={color} />,
        }}
      />

      <Tab.Screen
        name="Perfil"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Perfil",
          tabBarIcon: ({ color }) => <Feather name="user" size={26} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
