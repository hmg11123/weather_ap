import Today from "../screens/TodayScreen";
import Week from "../screens/WeekScreen";
import Setting from "../screens/SettingsScreen";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";
import React from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const MainNavigator = createBottomTabNavigator(
 {
  TODAY: {
   screen: Today,
   navigationOptions: {
    headerShown: false,
    tabBarIcon: ({ focused }) => (
     <Ionicons size={35} name={focused ? `today` : `today-outline`} />
    ),
   },
  },
  WEEK: {
   screen: Week,
   navigationOptions: {
    headerShown: false,
    tabBarIcon: ({ focused }) => (
     <MaterialCommunityIcons
      size={35}
      name={focused ? `calendar-weekend` : `calendar-weekend-outline`}
     />
    ),
   },
  },
  SETTING: {
   screen: Setting,
   navigationOptions: {
    headerShown: false,
    tabBarIcon: ({ focused }) => (
     <Ionicons size={35} name={focused ? `settings` : `settings-outline`} />
    ),
   },
  },
 },
 {
  headerMode: "screen",
  mode: "modal",
  tabBarOptions: {
   showLabel: false,
  },
 }
);

export default createAppContainer(MainNavigator);
