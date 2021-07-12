import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import * as Location from "expo-location";

import Colors from "../constants/Colors";
import MapPreview from "./MapPreview";

const LocationPicker = (props) => {
  const [pickedLocation, setPickedLocation] = useState();
  const [isFetching, setIsFetching] = useState(false);
  const mapPickedLocation = props.route.params;
  const { onLocationPicked } = props;

  useEffect(() => {
    if (mapPickedLocation) {
      setPickedLocation(mapPickedLocation.mapPickedLocation);
      onLocationPicked(mapPickedLocation.mapPickedLocation);
    }
  }, [mapPickedLocation, onLocationPicked]);

  const verifyPermissions = async () => {
    const result = await Location.requestForegroundPermissionsAsync();
    if (result.status !== "granted") {
      Alert.alert("Need Location permissions to use this app", [
        { text: "OK" },
      ]);
      return false;
    }
    return true;
  };
  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000,
      });
      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
      onLocationPicked({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } catch (err) {
      Alert.alert(
        "Fetching location failed.",
        " Please try again later or choose location on the map",
        [{ text: "OK" }]
      );
    }
    setIsFetching(false);
  };

  const chooseOnMapHandler = () => {
    props.navigation.navigate("Map");
  };

  return (
    <View style={styles.locationPicker}>
      <MapPreview
        style={styles.mapPreview}
        location={pickedLocation}
        onPress={chooseOnMapHandler}
      >
        {isFetching ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <Text>No location choosen yet</Text>
        )}
      </MapPreview>
      <View style={styles.actions}>
        <Button
          title="Get User Location"
          color={Colors.primary}
          onPress={getLocationHandler}
        />
        <Button
          title="Choose on Map"
          color={Colors.primary}
          onPress={chooseOnMapHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
  },
  mapPreview: {
    marginBottom: 10,
    width: "100%",
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});

export default LocationPicker;
