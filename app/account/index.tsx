import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import {
  User,
  ShoppingBag,
  Heart,
  MapPin,
  CreditCard,
  Settings,
  LogOut,
  ChevronRight,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react-native";
import Header from "../../components/Header";
import BottomNavbar from "../../components/BottomNavbar";
import { useTheme } from "../../context/ThemeContext";

// Mock user data
const userData = {
  name: "Rahul Sharma",
  email: "rahul.sharma@example.com",
  phone: "+91 9876543210",
  avatar: "https://ui-avatars.com/api/?name=Rahul+Sharma&background=3b82f6&color=fff&size=128",
  isLoggedIn: true,
};

export default function AccountScreen() {
  const router = useRouter();
  const theme = useTheme();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(userData.isLoggedIn);
  const [authMethod, setAuthMethod] = useState("email");
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    // Mock login functionality
    console.log(
      "Login with:",
      isLoginMode ? "Email" : "Phone",
      isLoginMode ? email : phone,
      password,
    );
    setIsLoggedIn(true);
  };

  const handleSignup = () => {
    // Mock signup functionality
    console.log("Signup with:", name, isLoginMode ? email : phone, password);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Mock logout functionality
    console.log("Logout");
    setIsLoggedIn(false);
  };

  const handleNavigate = (route: string) => {
    // Use type-safe navigation for Expo Router
    if (route === "orders") {
      router.push("/account/orders");
    } else if (route === "wishlist") {
      router.push("/account/wishlist");
    } else if (route === "addresses") {
      router.push("/account/addresses");
    } else if (route === "payments") {
      router.push("/account/payments");
    } else if (route === "settings") {
      router.push("/account/settings");
    }
  };

  const handleGoogleLogin = () => {
    // Mock Google login
    console.log("Google login");
    setIsLoggedIn(true);
  };

  const toggleLoginMode = () => {
    setIsLoginMode(!isLoginMode);
    setEmail("");
    setPhone("");
    setPassword("");
  };

  const toggleAuthMode = () => {
    setName("");
    setEmail("");
    setPhone("");
    setPassword("");
  };

  const handleVerifyCode = () => {
    setIsLoading(true);
    // Mock verification
    setTimeout(() => {
      setIsLoading(false);
      setIsLoggedIn(true);
      setShowVerification(false);
    }, 1500);
  };

  const renderVerificationScreen = () => {
    return (
      <View className="flex-1 p-6">
        <View className="items-center mb-8">
          <Text className="text-2xl font-bold text-blue-600">ZaleKart</Text>
          <Text
            className={`${theme.isDarkMode ? "text-gray-300" : "text-gray-500"} mt-2`}
          >
            India's #1 Shopping App
          </Text>
        </View>

        <View
          className={`${theme.isDarkMode ? "bg-black" : "bg-white"} p-6 rounded-lg shadow-sm`}
        >
          <Text
            className={`text-xl font-bold mb-2 ${theme.isDarkMode ? "text-white" : "text-black"}`}
          >
            Verify Phone Number
          </Text>

          <Text
            className={`mb-6 ${theme.isDarkMode ? "text-gray-400" : "text-gray-600"}`}
          >
            Enter the 6-digit code sent to {phone}
          </Text>

          <View className="mb-6">
            <View className="flex-row justify-between">
              {[...Array(6)].map((_, index) => (
                <TextInput
                  key={index}
                  className={`w-12 h-12 text-center text-lg ${theme.isDarkMode ? "bg-gray-800 text-white border-gray-700" : "bg-gray-100 text-black border-gray-300"} border rounded-md`}
                  keyboardType="number-pad"
                  maxLength={1}
                  value={verificationCode[index] || ""}
                  onChangeText={(text) => {
                    const newCode = verificationCode.split("");
                    newCode[index] = text;
                    setVerificationCode(newCode.join(""));

                    // Auto-focus next input
                    if (text && index < 5) {
                      // Would focus next input in a real implementation
                    }
                  }}
                />
              ))}
            </View>
          </View>

          <TouchableOpacity
            className="bg-blue-600 py-3 rounded-md items-center mb-4"
            onPress={handleVerifyCode}
            disabled={isLoading || verificationCode.length !== 6}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-bold">VERIFY</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            className="items-center"
            onPress={() => {
              setShowVerification(false);
              setVerificationCode("");
            }}
          >
            <Text className="text-blue-600">Change Phone Number</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderAuthScreen = () => {
    if (showVerification) {
      return renderVerificationScreen();
    }

    return (
      <View className="flex-1 p-6">
        <View className="items-center mb-8">
          <Text className="text-2xl font-bold text-blue-600">ZaleKart</Text>
          <Text
            className={`${theme.isDarkMode ? "text-gray-300" : "text-gray-500"} mt-2`}
          >
            India's #1 Shopping App
          </Text>
        </View>

        <View
          className={`${theme.isDarkMode ? "bg-black" : "bg-white"} p-6 rounded-lg shadow-sm`}
        >
          <Text
            className={`text-xl font-bold mb-6 ${theme.isDarkMode ? "text-white" : "text-black"}`}
          >
            {isLoginMode ? "Login" : "Create Account"}
          </Text>

          {/* Login Method Tabs */}
          {isLoginMode && (
            <View className="flex-row mb-6 border-b border-gray-300">
              <TouchableOpacity
                className={`flex-1 pb-2 ${authMethod === "email" ? "border-b-2 border-blue-600" : ""}`}
                onPress={() => setAuthMethod("email")}
              >
                <Text
                  className={`text-center ${authMethod === "email" ? "text-blue-600 font-medium" : theme.isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                >
                  Email
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`flex-1 pb-2 ${authMethod === "phone" ? "border-b-2 border-blue-600" : ""}`}
                onPress={() => setAuthMethod("phone")}
              >
                <Text
                  className={`text-center ${authMethod === "phone" ? "text-blue-600 font-medium" : theme.isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                >
                  Phone
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {!isLoginMode && (
            <View className="mb-4">
              <Text
                className={`${theme.isDarkMode ? "text-gray-300" : "text-gray-700"} mb-1`}
              >
                Full Name
              </Text>
              <View
                className={`flex-row items-center border ${theme.isDarkMode ? "border-gray-700 bg-gray-800" : "border-gray-300"} rounded-md px-3 py-2`}
              >
                <User size={18} color={theme.isDarkMode ? "#9ca3af" : "#9ca3af"} />
                <TextInput
                  placeholder="Enter your full name"
                  className={`ml-2 flex-1 ${theme.isDarkMode ? "text-white" : "text-black"}`}
                  placeholderTextColor={theme.isDarkMode ? "#9ca3af" : "#9ca3af"}
                  value={name}
                  onChangeText={setName}
                />
              </View>
            </View>
          )}

          {(authMethod === "email" || !isLoginMode) && (
            <View className="mb-4">
              <Text
                className={`${theme.isDarkMode ? "text-gray-300" : "text-gray-700"} mb-1`}
              >
                Email
              </Text>
              <View
                className={`flex-row items-center border ${theme.isDarkMode ? "border-gray-700 bg-gray-800" : "border-gray-300"} rounded-md px-3 py-2`}
              >
                <Mail size={18} color={theme.isDarkMode ? "#9ca3af" : "#9ca3af"} />
                <TextInput
                  placeholder="Enter email"
                  className={`ml-2 flex-1 ${theme.isDarkMode ? "text-white" : "text-black"}`}
                  placeholderTextColor={theme.isDarkMode ? "#9ca3af" : "#9ca3af"}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                />
              </View>
            </View>
          )}

          {authMethod === "phone" && isLoginMode && (
            <View className="mb-4">
              <Text
                className={`${theme.isDarkMode ? "text-gray-300" : "text-gray-700"} mb-1`}
              >
                Phone Number
              </Text>
              <View
                className={`flex-row items-center border ${theme.isDarkMode ? "border-gray-700 bg-gray-800" : "border-gray-300"} rounded-md px-3 py-2`}
              >
                <Phone size={18} color={theme.isDarkMode ? "#9ca3af" : "#9ca3af"} />
                <TextInput
                  placeholder="Enter phone number"
                  className={`ml-2 flex-1 ${theme.isDarkMode ? "text-white" : "text-black"}`}
                  placeholderTextColor={theme.isDarkMode ? "#9ca3af" : "#9ca3af"}
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                />
              </View>
            </View>
          )}

          {(authMethod === "email" || !isLoginMode) && (
            <View className="mb-6">
              <Text
                className={`${theme.isDarkMode ? "text-gray-300" : "text-gray-700"} mb-1`}
              >
                Password
              </Text>
              <View
                className={`flex-row items-center border ${theme.isDarkMode ? "border-gray-700 bg-gray-800" : "border-gray-300"} rounded-md px-3 py-2`}
              >
                <Lock size={18} color={theme.isDarkMode ? "#9ca3af" : "#9ca3af"} />
                <TextInput
                  placeholder="Enter password"
                  className={`ml-2 flex-1 ${theme.isDarkMode ? "text-white" : "text-black"}`}
                  placeholderTextColor={theme.isDarkMode ? "#9ca3af" : "#9ca3af"}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff
                      size={18}
                      color={theme.isDarkMode ? "#9ca3af" : "#9ca3af"}
                    />
                  ) : (
                    <Eye size={18} color={theme.isDarkMode ? "#9ca3af" : "#9ca3af"} />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          )}

          <TouchableOpacity
            className="bg-blue-600 py-3 rounded-md items-center mb-4"
            onPress={isLoginMode ? handleLogin : handleSignup}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-bold">
                {isLoginMode ? "LOGIN" : "SIGN UP"}
              </Text>
            )}
          </TouchableOpacity>

          {/* Google Sign In Button */}
          <TouchableOpacity
            className={`flex-row items-center justify-center py-3 rounded-md mb-4 ${theme.isDarkMode ? "bg-gray-800" : "bg-white"} border border-gray-300`}
            onPress={handleGoogleLogin}
            disabled={isLoading}
          >
            <Image
              source={{
                uri: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
              }}
              style={{ width: 20, height: 20 }}
              resizeMode="contain"
            />
            <Text
              className={`ml-2 font-medium ${theme.isDarkMode ? "text-white" : "text-gray-800"}`}
            >
              Continue with Google
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="mt-2 items-center"
            onPress={toggleLoginMode}
          >
            <Text className="text-blue-600">
              {isLoginMode
                ? "New to ZaleKart? Create Account"
                : "Already have an account? Login"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderProfileScreen = () => {
    return (
      <View className="flex-1">
        {/* Profile Header */}
        <View
          className={`${theme.isDarkMode ? "bg-black" : "bg-white"} p-4 items-center`}
        >
          <Image
            source={{ uri: userData.avatar }}
            style={{ width: 96, height: 96, borderRadius: 48, backgroundColor: '#e5e7eb' }}
            resizeMode="cover"
            defaultSource={require('../../assets/images/icon.png')}
          />
          <Text
            className={`text-xl font-bold mt-2 ${theme.isDarkMode ? "text-white" : "text-black"}`}
          >
            {userData.name}
          </Text>
          <Text className={`${theme.isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
            {userData.email}
          </Text>
          <Text className={`${theme.isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
            {userData.phone}
          </Text>
        </View>

        {/* Account Options */}
        <View className={`${theme.isDarkMode ? "bg-black" : "bg-white"} mt-4`}>
          <TouchableOpacity
            className={`flex-row items-center justify-between p-4 border-b ${theme.isDarkMode ? "border-gray-800" : "border-gray-100"}`}
            onPress={() => handleNavigate("orders")}
          >
            <View className="flex-row items-center">
              <ShoppingBag
                size={20}
                color={theme.isDarkMode ? "#e5e7eb" : "#4b5563"}
              />
              <Text
                className={`ml-3 ${theme.isDarkMode ? "text-white" : "text-gray-800"}`}
              >
                My Orders
              </Text>
            </View>
            <ChevronRight
              size={20}
              color={theme.isDarkMode ? "#9ca3af" : "#9ca3af"}
            />
          </TouchableOpacity>

          <TouchableOpacity
            className={`flex-row items-center justify-between p-4 border-b ${theme.isDarkMode ? "border-gray-800" : "border-gray-100"}`}
            onPress={() => handleNavigate("wishlist")}
          >
            <View className="flex-row items-center">
              <Heart size={20} color={theme.isDarkMode ? "#e5e7eb" : "#4b5563"} />
              <Text
                className={`ml-3 ${theme.isDarkMode ? "text-white" : "text-gray-800"}`}
              >
                My Wishlist
              </Text>
            </View>
            <ChevronRight
              size={20}
              color={theme.isDarkMode ? "#9ca3af" : "#9ca3af"}
            />
          </TouchableOpacity>

          <TouchableOpacity
            className={`flex-row items-center justify-between p-4 border-b ${theme.isDarkMode ? "border-gray-800" : "border-gray-100"}`}
            onPress={() => handleNavigate("addresses")}
          >
            <View className="flex-row items-center">
              <MapPin size={20} color={theme.isDarkMode ? "#e5e7eb" : "#4b5563"} />
              <Text
                className={`ml-3 ${theme.isDarkMode ? "text-white" : "text-gray-800"}`}
              >
                My Addresses
              </Text>
            </View>
            <ChevronRight
              size={20}
              color={theme.isDarkMode ? "#9ca3af" : "#9ca3af"}
            />
          </TouchableOpacity>

          <TouchableOpacity
            className={`flex-row items-center justify-between p-4 border-b ${theme.isDarkMode ? "border-gray-800" : "border-gray-100"}`}
            onPress={() => handleNavigate("payments")}
          >
            <View className="flex-row items-center">
              <CreditCard
                size={20}
                color={theme.isDarkMode ? "#e5e7eb" : "#4b5563"}
              />
              <Text
                className={`ml-3 ${theme.isDarkMode ? "text-white" : "text-gray-800"}`}
              >
                Saved Cards
              </Text>
            </View>
            <ChevronRight
              size={20}
              color={theme.isDarkMode ? "#9ca3af" : "#9ca3af"}
            />
          </TouchableOpacity>

          <TouchableOpacity
            className={`flex-row items-center justify-between p-4 border-b ${theme.isDarkMode ? "border-gray-800" : "border-gray-100"}`}
            onPress={() => handleNavigate("settings")}
          >
            <View className="flex-row items-center">
              <Settings size={20} color={theme.isDarkMode ? "#e5e7eb" : "#4b5563"} />
              <Text
                className={`ml-3 ${theme.isDarkMode ? "text-white" : "text-gray-800"}`}
              >
                Settings
              </Text>
            </View>
            <ChevronRight
              size={20}
              color={theme.isDarkMode ? "#9ca3af" : "#9ca3af"}
            />
          </TouchableOpacity>

          <TouchableOpacity
            className={`flex-row items-center p-4 border-b ${theme.isDarkMode ? "border-gray-800" : "border-gray-100"}`}
            onPress={handleLogout}
          >
            <LogOut size={20} color="#ef4444" />
            <Text className="ml-3 text-red-500">Logout</Text>
          </TouchableOpacity>
        </View>

        {/* Seller Dashboard Link */}
        <View className={`${theme.isDarkMode ? "bg-black" : "bg-white"} mt-4 p-4`}>
          <TouchableOpacity
            className="flex-row items-center justify-between"
            onPress={() => router.push("/seller/dashboard")}
          >
            <View className="flex-row items-center">
              <ShoppingBag
                size={20}
                color={theme.isDarkMode ? "#e5e7eb" : "#4b5563"}
              />
              <View className="ml-3">
                <Text
                  className={`font-medium ${theme.isDarkMode ? "text-white" : "text-gray-800"}`}
                >
                  Seller Dashboard
                </Text>
                <Text
                  className={`text-xs ${theme.isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                >
                  Manage your shop and products
                </Text>
              </View>
            </View>
            <ChevronRight
              size={20}
              color={theme.isDarkMode ? "#9ca3af" : "#9ca3af"}
            />
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View className="mt-4 p-4">
          <Text
            className={`text-center ${theme.isDarkMode ? "text-gray-400" : "text-gray-500"}`}
          >
            ZaleKart v1.0.0
          </Text>
        </View>
      </View>
    );
  };

  if (isLoading) {
    return (
      <View
        className={`flex-1 ${theme.isDarkMode ? "bg-gray-900" : "bg-gray-100"} justify-center items-center`}
      >
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text className={`mt-4 ${theme.isDarkMode ? "text-white" : "text-gray-800"}`}>
          Loading...
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100">
      <Header notificationCount={3} />
      <ScrollView className="flex-1">
        {isLoggedIn ? renderProfileScreen() : renderAuthScreen()}
      </ScrollView>
      <BottomNavbar />
    </View>
  );
}
