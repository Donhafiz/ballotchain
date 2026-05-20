import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";
import DashboardScreen from "./(tabs)/dashboard";
import ElectionsScreen from "./(tabs)/elections";
import VoteScreen from "./(tabs)/vote";
import ResultsScreen from "./(tabs)/results";
import ProfileScreen from "./(tabs)/profile";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator screenOptions={{
          headerStyle: { backgroundColor: "#0a0a14" },
          headerTintColor: "#fff",
          tabBarStyle: { backgroundColor: "#0a0a14", borderTopColor: "rgba(255,255,255,0.06)" },
          tabBarActiveTintColor: "#6366F1",
          tabBarInactiveTintColor: "rgba(255,255,255,0.4)",
        }}>
          <Tab.Screen name="Dashboard" component={DashboardScreen} options={{ tabBarIcon: () => "📊" }} />
          <Tab.Screen name="Elections" component={ElectionsScreen} options={{ tabBarIcon: () => "🗳️" }} />
          <Tab.Screen name="Vote" component={VoteScreen} options={{ tabBarIcon: () => "✅" }} />
          <Tab.Screen name="Results" component={ResultsScreen} options={{ tabBarIcon: () => "📈" }} />
          <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarIcon: () => "👤" }} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}