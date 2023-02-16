import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Linking from "expo-linking";
import Home from "../Home";
import Shared from "../Shared";
const Stack = createNativeStackNavigator();

const Pages = () => {
  const prefix = Linking.createURL("/");

  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        Home: "Home",
        Shared: "Shared",
      },
    },
  };

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "none",
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Shared" component={Shared} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Pages;
