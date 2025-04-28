import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import {
  ArrowLeft,
  Bell,
  Lock,
  Globe,
  HelpCircle,
  Info,
  LogOut,
  ChevronRight,
} from "lucide-react-native";
import Header from "../../components/Header";
import BottomNavbar from "../../components/BottomNavbar";

export default function SettingsScreen() {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotificationsEnabled, setEmailNotificationsEnabled] =
    useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const handleGoBack = () => {
    router.back();
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: () => {
          console.log("User logged out");
          router.push("/account");
        },
        style: "destructive",
      },
    ]);
  };

  return (
    <View className="flex-1 bg-gray-100">
      <Header showSearch={false} />

      <View className="p-4 bg-white border-b border-gray-200 flex-row items-center">
        <TouchableOpacity onPress={handleGoBack} className="mr-3">
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-xl font-bold">Settings</Text>
      </View>

      <ScrollView className="flex-1">
        {/* Notifications Section */}
        <View className="mt-4 bg-white rounded-lg">
          <Text className="px-4 pt-4 pb-2 font-bold text-gray-500">
            NOTIFICATIONS
          </Text>

          <View className="flex-row justify-between items-center px-4 py-3 border-b border-gray-100">
            <View className="flex-row items-center">
              <Bell size={20} color="#4b5563" />
              <Text className="ml-3">Push Notifications</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: "#d1d5db", true: "#93c5fd" }}
              thumbColor={notificationsEnabled ? "#2563eb" : "#f3f4f6"}
            />
          </View>

          <View className="flex-row justify-between items-center px-4 py-3">
            <View className="flex-row items-center">
              <Bell size={20} color="#4b5563" />
              <Text className="ml-3">Email Notifications</Text>
            </View>
            <Switch
              value={emailNotificationsEnabled}
              onValueChange={setEmailNotificationsEnabled}
              trackColor={{ false: "#d1d5db", true: "#93c5fd" }}
              thumbColor={emailNotificationsEnabled ? "#2563eb" : "#f3f4f6"}
            />
          </View>
        </View>

        {/* Account Section */}
        <View className="mt-4 bg-white rounded-lg">
          <Text className="px-4 pt-4 pb-2 font-bold text-gray-500">
            ACCOUNT
          </Text>

          <TouchableOpacity className="flex-row justify-between items-center px-4 py-3 border-b border-gray-100">
            <View className="flex-row items-center">
              <Lock size={20} color="#4b5563" />
              <Text className="ml-3">Change Password</Text>
            </View>
            <ChevronRight size={20} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row justify-between items-center px-4 py-3 border-b border-gray-100"
            onPress={() => router.push("/account/addresses")}
          >
            <View className="flex-row items-center">
              <Globe size={20} color="#4b5563" />
              <Text className="ml-3">Manage Addresses</Text>
            </View>
            <ChevronRight size={20} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row justify-between items-center px-4 py-3"
            onPress={() => router.push("/account/payments")}
          >
            <View className="flex-row items-center">
              <Lock size={20} color="#4b5563" />
              <Text className="ml-3">Saved Payment Methods</Text>
            </View>
            <ChevronRight size={20} color="#9ca3af" />
          </TouchableOpacity>
        </View>

        {/* Appearance Section */}
        <View className="mt-4 bg-white rounded-lg">
          <Text className="px-4 pt-4 pb-2 font-bold text-gray-500">
            APPEARANCE
          </Text>

          <View className="flex-row justify-between items-center px-4 py-3">
            <Text>Dark Mode</Text>
            <Switch
              value={darkModeEnabled}
              onValueChange={setDarkModeEnabled}
              trackColor={{ false: "#d1d5db", true: "#93c5fd" }}
              thumbColor={darkModeEnabled ? "#2563eb" : "#f3f4f6"}
            />
          </View>
        </View>

        {/* Support Section */}
        <View className="mt-4 bg-white rounded-lg">
          <Text className="px-4 pt-4 pb-2 font-bold text-gray-500">
            SUPPORT
          </Text>

          <TouchableOpacity className="flex-row justify-between items-center px-4 py-3 border-b border-gray-100">
            <View className="flex-row items-center">
              <HelpCircle size={20} color="#4b5563" />
              <Text className="ml-3">Help Center</Text>
            </View>
            <ChevronRight size={20} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row justify-between items-center px-4 py-3 border-b border-gray-100">
            <View className="flex-row items-center">
              <Info size={20} color="#4b5563" />
              <Text className="ml-3">About Us</Text>
            </View>
            <ChevronRight size={20} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row justify-between items-center px-4 py-3">
            <View className="flex-row items-center">
              <Info size={20} color="#4b5563" />
              <Text className="ml-3">Privacy Policy</Text>
            </View>
            <ChevronRight size={20} color="#9ca3af" />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          className="mt-4 mb-8 bg-white py-4 rounded-lg items-center"
          onPress={handleLogout}
        >
          <View className="flex-row items-center">
            <LogOut size={20} color="#ef4444" />
            <Text className="ml-2 text-red-500 font-medium">Logout</Text>
          </View>
        </TouchableOpacity>

        <Text className="text-center text-gray-500 mb-8">ZaleKart v1.0.0</Text>
      </ScrollView>

      <BottomNavbar />
    </View>
  );
}
