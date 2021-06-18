/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import {
  Foundation,
  Ionicons,
  AntDesign,
  MaterialIcons,
} from "@expo/vector-icons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import TabTwoScreen from "../screens/TabTwoScreen";

import HomeStack from "./HomeStack";

import { BottomTabParamList, TabOneParamList, TabTwoParamList } from "../types";
import VideoUploadScreen from "../screens/VideoUploadScreen";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: Colors[colorScheme].tint,
        labelPosition: "below-icon",
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color }) => (
            <Foundation name="home" size={24} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Explore"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="compass-outline" size={24} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="New"
        component={UploadNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="pluscircleo" size={24} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Subscriptions"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="subscriptions" size={24} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Library"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="video-collection" size={24} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: "Tab Two Title" }}
      />
    </TabTwoStack.Navigator>
  );
}

const UploadStack = createStackNavigator();

function UploadNavigator() {
  return (
    <UploadStack.Navigator>
      <UploadStack.Screen
        name="VideoUpload"
        component={VideoUploadScreen}
        options={{ headerTitle: "Upload a video" }}
      />
    </UploadStack.Navigator>
  );
}
