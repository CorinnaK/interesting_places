import React, { useLayoutEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const PlaceDetailsScreen = (props) => {
  const { placeTitle } = props.route.params;
  useLayoutEffect(() => {
    props.navigation.setOptions({
      title: placeTitle,
    });
  });

  return (
    <View>
      <Text>PlaceDetailsScreen</Text>
    </View>
  );
};

export default PlaceDetailsScreen;

const styles = StyleSheet.create({});
