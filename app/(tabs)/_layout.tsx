import Colors from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarLabelStyle: {
          fontFamily: "mon-sb",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Camera",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="camera" color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="gallery"
        options={{
          tabBarLabel: "Gallery",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="photo" color={color} size={24} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontFamily: "mon-b",
    fontSize: 16,
    color: "white",
  },
});
