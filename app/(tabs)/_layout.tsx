import { Tabs } from "expo-router";
import {
  Calculator,
  GitBranch,
  Repeat,
  BookOpen,
  Ruler,
  ClipboardList,
} from "lucide-react-native";
import { Colors } from "../../constants/theme";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: Colors.background },
        headerTintColor: Colors.primary,
        headerTitleStyle: { fontWeight: "800" },
        tabBarStyle: {
          backgroundColor: Colors.background,
          borderTopColor: Colors.cardBorder,
          borderTopWidth: 0.5,
          paddingBottom: 4,
          height: 88,
        },
        tabBarActiveTintColor: Colors.accent,
        tabBarInactiveTintColor: Colors.muted,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="calculator"
        options={{
          title: "Calculator",
          tabBarIcon: ({ color, size }) => (
            <Calculator size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="algorithm"
        options={{
          title: "Algorithm",
          tabBarIcon: ({ color, size }) => (
            <GitBranch size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="valve-in-valve"
        options={{
          title: "Valve-in-Valve",
          tabBarIcon: ({ color, size }) => (
            <Repeat size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="evidence"
        options={{
          title: "Evidence",
          tabBarIcon: ({ color, size }) => (
            <BookOpen size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="sizing"
        options={{
          title: "Sizing",
          tabBarIcon: ({ color, size }) => <Ruler size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="reference"
        options={{
          title: "Reference",
          tabBarIcon: ({ color, size }) => (
            <ClipboardList size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
