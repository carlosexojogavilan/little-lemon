import Onboarding from "./screens/Onboarding";
import Profile from "./screens/Profile";
import Splash from "./screens/Splash";

import { useState, useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const getIsSignedIn = async () => {
    setIsLoading(true);
    let values;
    try {
      values = await AsyncStorage.multiGet(["email", "firstName"]);
    } catch (error) {
      console.log(error);
    }

    const obj = values.reduce((acc, curr) => {
      if (curr[1] === null) return;
      return {
        ...acc,
        [curr[0]]: curr[1],
      };
    }, {});

    if (obj) setIsSignedIn(true);
    else setIsSignedIn(false);

    setIsLoading(false);
  };

  useEffect(() => {
    getIsSignedIn();
  }, []);

  if (isLoading) {
    return <Splash />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {isSignedIn ? (
          <Stack.Screen name="Profile" component={Profile} />
        ) : (
          <Stack.Screen name="Onboarding" component={Onboarding} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
