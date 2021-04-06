import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createAppContainer } from "react-navigation";

const SettingsScreen = () => {
 return (
  <View style={styles.container}>
   <Text>SettingsScreen</Text>
  </View>
 );
};

const styles = StyleSheet.create({
 container: {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
 },
});

export default createAppContainer(SettingsScreen);
