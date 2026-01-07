import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AuthProvider } from "./src/context/AuthContext";

import LoginScreen from "./src/screens/Auth/LoginScreen";
import RegisterScreen from "./src/screens/Auth/RegisterScreen";
import BottomTabs from "./src/navigation/BottomTabs";
import NotificationScreen from "./src/screens/Home/NotificationScreen";
import ScheduleScreen from "./src/screens/Home/ScheduleScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="HomeTabs" component={BottomTabs} />
          <Stack.Screen name="Schedule" component={ScheduleScreen} />
          <Stack.Screen name="Notifications" component={NotificationScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
