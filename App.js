import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Screens/Login";
import Start from "./Screens/Start";
import Alternativa from "./Screens/Alternativa";
import VocalGame from "./Screens/VocalGame";
import ToyGuessingGame from "./Screens/ToyGuessingGame";
import NumberDragAndDropGame from "./Screens/NumberDragAndDropGame";

const Stack = createNativeStackNavigator(); // Asignar la función a una constante

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
        }}
      >
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Alternativa" component={Alternativa} />
        <Stack.Screen name="Vocales" component={VocalGame} />
        <Stack.Screen name="toys" component={ToyGuessingGame} />
        <Stack.Screen name="Numeros" component={NumberDragAndDropGame} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
