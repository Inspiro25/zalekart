import React, { useState } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput, 
  SafeAreaView, 
  StatusBar, 
  Platform,
  Image,
  Animated
} from "react-native";
import { useRouter } from "expo-router";
import { Search, Bell, Menu, MapPin, User, ArrowLeft, X, ChevronDown } from "lucide-react-native";
import { useTheme } from "../context/ThemeContext";
import { useAddress } from "../context/AddressContext";

// This is no longer needed as we're using context
// const defaultAddress = {
//   id: "1",
//   name: "Rahul Sharma",
//   addressLine1: "Flat 101, Sunshine Apartments",
//   city: "Bangalore",
//   pincode: "560001",
//   type: "Home"
// };

const AnimatedLogo = () => {
  const theme = useTheme();
  
  return (
    <View className="flex-row items-center">
      <Text className="text-white text-xl font-bold">
        Z<Text className="text-gray-200">ALEKART</Text>
      </Text>
    </View>
  );
};

interface HeaderProps {
  notificationCount?: number;
  showBack?: boolean;
  title?: string;
  showSearch?: boolean;
  showLogo?: boolean;
}

const Header = ({ 
  notificationCount = 0, 
  showBack = false,
  title = "",
  showSearch = true,
  showLogo = true
}: HeaderProps) => {
  const router = useRouter();
  const theme = useTheme();
  const { selectedAddress, defaultAddress } = useAddress();
  const [searchQuery, setSearchQuery] = useState("");

  // Get the current delivery address
  const currentAddress = selectedAddress || defaultAddress;

  // Format address for display
  const getFormattedAddress = () => {
    if (!currentAddress) {
      return "Select delivery location";
    }
    return `${currentAddress.addressLine1}, ${currentAddress.pincode}`;
  };

  // Calculate status bar height safely
  const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;

  const handleBackPress = () => {
    router.back();
  };

  const handleMenuPress = () => {
    router.push("/categories");
  };

  const handleLocationPress = () => {
    router.push("/account/addresses");
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push({
        pathname: "/search",
        params: { query: searchQuery },
      });
    }
  };

  const handleNotificationsPress = () => {
    console.log("Notifications pressed");
  };

  const handleProfilePress = () => {
    router.push("/account");
  };

  return (
    <>
      <StatusBar backgroundColor={theme.primaryColor} translucent barStyle="light-content" />
      <View 
        style={{ 
          backgroundColor: theme.primaryColor,
          paddingTop: statusBarHeight
        }}>
        {/* Main Header Row */}
        <View className="px-4 pt-2 pb-2">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              {showBack ? (
                <TouchableOpacity 
                  className="mr-3 p-1 rounded-full" 
                  onPress={handleBackPress}
                >
                  <ArrowLeft size={22} color="white" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity 
                  className="mr-3 p-1 rounded-full" 
                  onPress={handleMenuPress}
                >
                  <Menu size={22} color="white" />
                </TouchableOpacity>
              )}
              
              {showLogo ? (
                <AnimatedLogo />
              ) : title ? (
                <Text className="text-white text-lg font-medium">{title}</Text>
              ) : null}
            </View>
            
            <View className="flex-row items-center space-x-4">
              <TouchableOpacity 
                className="relative"
                onPress={handleNotificationsPress}
              >
                <Bell size={20} color="white" />
                {notificationCount > 0 && (
                  <View className="absolute -top-1 -right-1 bg-red-500 rounded-full h-4 w-4 items-center justify-center">
                    <Text className="text-white text-xs font-bold">{notificationCount}</Text>
                  </View>
                )}
              </TouchableOpacity>
              
              <TouchableOpacity 
                className="relative"
                onPress={handleProfilePress}
              >
                <User size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Location Bar - Only on Home */}
          {!title && !showBack && (
            <TouchableOpacity 
              className="flex-row items-center mt-2 justify-between" 
              onPress={handleLocationPress}
              activeOpacity={0.7}
            >
              <View className="flex-row items-center">
                <MapPin size={14} color="#9ca3af" />
                <Text className="text-gray-300 text-xs ml-1">
                  Deliver to{" "}
                  <Text className="font-bold text-white">
                    {currentAddress ? getFormattedAddress() : "Select address"}
                  </Text>
                </Text>
              </View>
              <ChevronDown size={14} color="#9ca3af" />
            </TouchableOpacity>
          )}
          
          {/* Search Bar */}
          {showSearch && (
            <View className="mt-2 bg-white rounded-md px-3 py-2.5 flex-row items-center">
              <Search size={18} color="#9ca3af" />
              <TextInput
                placeholder="Search products, brands and more..."
                className="ml-2 flex-1 text-gray-800"
                placeholderTextColor="#9ca3af"
                value={searchQuery}
                onChangeText={setSearchQuery}
                onSubmitEditing={handleSearch}
                returnKeyType="search"
              />
              {searchQuery ? (
                <TouchableOpacity 
                  onPress={() => setSearchQuery("")}
                  className="p-1"
                >
                  <X size={16} color="#9ca3af" />
                </TouchableOpacity>
              ) : null}
            </View>
          )}
        </View>
      </View>
    </>
  );
};

export default Header; 