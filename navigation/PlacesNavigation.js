import * as React from "react";

import { View, Text, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import PlacesListScreen from "../screens/PlacesListScreen";
import PlacesDetailsScreen from "../screens/PlaceDetailsScreen";
import NewPlacesScreen from "../screens/NewPlacesScreen";
import MapScreen from "../screens/MapScreen";

import Colors from "../constants/Colors";

const Stack = createStackNavigator();
const navOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

const PlacesNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={navOptions}>
        <Stack.Screen
          name="Places"
          component={PlacesListScreen}
          options={{ title: "All Places" }}
        />
        <Stack.Screen name="PlaceDetail" component={PlacesDetailsScreen} />
        <Stack.Screen
          name="NewPlace"
          component={NewPlacesScreen}
          options={{ title: "Add Place" }}
        />
        <Stack.Screen name="Map" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default PlacesNavigator;
