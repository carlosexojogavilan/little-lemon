import Onboarding from "./screens/Onboarding";
import Profile from "./screens/Profile";
import Splash from "./screens/Splash";

import { useState, useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Home from "./screens/Home";

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

  const handleLogOut = async () => {
    const keys = ["firstName", "lastName", "email", "phone", "profilePic"];
    try {
      await AsyncStorage.multiRemove(keys);
      setIsSignedIn(false);
    } catch (e) {
      console.log(e);
    }
    console.log("done");
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
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Profile">
              {(props) => <Profile {...props} onLogout={handleLogOut} />}
            </Stack.Screen>
          </>
        ) : (
          <Stack.Screen name="Onboarding">
            {(props) => (
              <Onboarding {...props} signIn={() => setIsSignedIn(true)} />
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
