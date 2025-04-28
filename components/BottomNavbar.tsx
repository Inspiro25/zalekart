import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { Home, Search, Tag, ShoppingBag, ShoppingCart } from "lucide-react-native";

type AppRoute = string;

interface NavItem {
  icon: any;
  label: string;
  path: AppRoute;
}

const BottomNavbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path);
  };

  const navItems: NavItem[] = [
    {
      icon: Home,
      label: "Home",
      path: "/",
    },
    {
      icon: Search,
      label: "Search",
      path: "/search",
    },
    {
      icon: Tag,
      label: "Offers",
      path: "/offers",
    },
    {
      icon: ShoppingBag,
      label: "Shops",
      path: "/shops",
    },
  ];

  const navigate = (path: AppRoute) => {
    router.push(path as any);
  };

  return (
    <View className="bg-white border-t border-gray-200">
      <View className="flex-row justify-between">
        {navItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            className="flex-1 items-center py-2"
            onPress={() => navigate(item.path)}
          >
            <item.icon
              size={20}
              color={isActive(item.path) ? "#3b82f6" : "#6b7280"}
            />
            <Text
              className={`text-xs mt-1 ${
                isActive(item.path) ? "text-blue-500 font-medium" : "text-gray-500"
              }`}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
        
        {/* Cart Button (Special styling) */}
        <TouchableOpacity
          className="flex-1 items-center py-2"
          onPress={() => navigate("/cart")}
        >
          <View className="relative">
            <ShoppingCart
              size={20}
              color={isActive("/cart") ? "#3b82f6" : "#6b7280"}
            />
            <View className="absolute -top-2 -right-2 bg-red-500 rounded-full h-4 w-4 items-center justify-center">
              <Text className="text-white text-xs font-bold">0</Text>
            </View>
          </View>
          <Text
            className={`text-xs mt-1 ${
              isActive("/cart") ? "text-blue-500 font-medium" : "text-gray-500"
            }`}
          >
            Cart
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BottomNavbar;
