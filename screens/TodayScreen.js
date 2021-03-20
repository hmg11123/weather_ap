import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Location from "expo-location";

const TodayScreen = () => {
 const [location_S, setLocation_S] = useState(null);
 const [errMsg_S, setErrMsg_S] = useState(``);

 useEffect(() => {
  (async () => {
   const { status } = await Location.requestPermissionsAsync();

   if (status !== "granted") {
    setErrMsg_S("Refuse Permission This Device.");
    return;
   }

   const locData = await Location.getCurrentPositionAsync();
   setLocation_S(locData);
  })();
 }, []);

 console.log(location_S && location_S.coords.latitude);
 console.log(location_S && location_S.coords.longitude);

 return (
  <View style={styles.container}>
   <Text>TodayScreen</Text>
   <Text>{location_S && location_S.coords.latitude}</Text>
   <Text>{location_S && location_S.coords.longitude}</Text>
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

export default TodayScreen;
