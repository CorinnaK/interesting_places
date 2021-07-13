import React, {
  useState,
  useLayoutEffect,
  useEffect,
  useCallback,
} from "react";
import MapView, { Marker } from "react-native-maps";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";

import Colors from "../constants/Colors";

const MapScreen = (props) => {
  let initialLocation;
  let readonly;

  if (props.route.params) {
    initialLocation = props.route.params.initialLocation;
    readonly = props.route.params.readonly;
  }

  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const { navigation } = props;

  if (!readonly) {
    useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            style={styles.headerButton}
            onPress={saveSelectedLocationHandler}
          >
            <Text style={styles.headerText}>SAVE</Text>
          </TouchableOpacity>
        ),
      });
    }, [selectedLocation]);
  }

  const mapRegion = {
    latitude: initialLocation ? initialLocation.lat : 37.78,
    longitude: initialLocation ? initialLocation.lng : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectLocationHandler = (event) => {
    if (readonly) {
      return;
    }
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    });
  };

  const saveSelectedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      return;
    }
    props.navigation.navigate("NewPlace", {
      mapPickedLocation: selectedLocation,
    });
  });

  let markerCoordinates;

  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
    };
  }

  return (
    <MapView
      style={styles.map}
      region={mapRegion}
      onPress={selectLocationHandler}
    >
      {markerCoordinates && (
        <Marker
          title="Choosen Location"
          coordinate={markerCoordinates}
        ></Marker>
      )}
    </MapView>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  headerText: {
    fontSize: 16,
    color: Platform.OS === "android" ? "white" : Colors.primary,
  },
  headerButton: {
    marginHorizontal: 20,
  },
});
