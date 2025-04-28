import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import Header from "../../components/Header";
import BottomNavbar from "../../components/BottomNavbar";
import { useTheme } from "../../context/ThemeContext";

// Mock data for categories
const categories = [
  {
    id: "1",
    name: "Electronics",
    icon: "https://api.dicebear.com/7.x/avataaars/svg?seed=electronics",
    subcategories: ["Mobiles", "Laptops", "Audio", "Cameras", "Accessories"],
  },
  {
    id: "2",
    name: "Fashion",
    icon: "https://api.dicebear.com/7.x/avataaars/svg?seed=fashion",
    subcategories: [
      "Men's Clothing",
      "Women's Clothing",
      "Footwear",
      "Watches",
      "Bags",
    ],
  },
  {
    id: "3",
    name: "Home",
    icon: "https://api.dicebear.com/7.x/avataaars/svg?seed=home",
    subcategories: ["Kitchen", "Furniture", "Decor", "Lighting", "Storage"],
  },
  {
    id: "4",
    name: "Beauty",
    icon: "https://api.dicebear.com/7.x/avataaars/svg?seed=beauty",
    subcategories: [
      "Makeup",
      "Skincare",
      "Haircare",
      "Fragrances",
      "Personal Care",
    ],
  },
  {
    id: "5",
    name: "Toys",
    icon: "https://api.dicebear.com/7.x/avataaars/svg?seed=toys",
    subcategories: [
      "Action Figures",
      "Board Games",
      "Dolls",
      "Educational Toys",
      "Outdoor Toys",
    ],
  },
  {
    id: "6",
    name: "Grocery",
    icon: "https://api.dicebear.com/7.x/avataaars/svg?seed=grocery",
    subcategories: [
      "Fruits & Vegetables",
      "Dairy",
      "Snacks",
      "Beverages",
      "Household",
    ],
  },
  {
    id: "7",
    name: "Appliances",
    icon: "https://api.dicebear.com/7.x/avataaars/svg?seed=appliances",
    subcategories: [
      "Refrigerators",
      "Washing Machines",
      "Air Conditioners",
      "Microwaves",
      "Kitchen Appliances",
    ],
  },
  {
    id: "8",
    name: "Sports",
    icon: "https://api.dicebear.com/7.x/avataaars/svg?seed=sports",
    subcategories: ["Cricket", "Football", "Fitness", "Cycling", "Swimming"],
  },
];

export default function CategoriesScreen() {
  const router = useRouter();
  const { isDarkMode } = useTheme();

  const handleCategoryPress = (categoryId: string) => {
    // To be implemented - navigate to category products
    console.log("Category pressed:", categoryId);
  };

  const handleSubcategoryPress = (category: string, subcategory: string) => {
    // To be implemented - navigate to subcategory products
    console.log(`Subcategory pressed: ${subcategory} in ${category}`);
  };

  return (
    <View className={`flex-1 ${isDarkMode ? "bg-gray-900" : "bg-gray-100"}`}>
      <Header showBack={true} title="Categories" showSearch={true} />

      <ScrollView className="flex-1">
        <View className="p-4">
          <Text
            className={`text-xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-black"}`}
          >
            All Categories
          </Text>

          {categories.map((category) => (
            <View
              key={category.id}
              className={`${isDarkMode ? "bg-black" : "bg-white"} rounded-lg mb-4 overflow-hidden shadow-sm`}
            >
              <TouchableOpacity
                className={`flex-row items-center p-4 border-b ${isDarkMode ? "border-gray-800" : "border-gray-100"}`}
                onPress={() => handleCategoryPress(category.id)}
              >
                <View className="w-12 h-12 rounded-full bg-gray-100 items-center justify-center overflow-hidden">
                  <Image
                    source={{ uri: category.icon }}
                    className="w-full h-full"
                    contentFit="cover"
                  />
                </View>
                <Text
                  className={`text-lg font-medium ml-3 flex-1 ${isDarkMode ? "text-white" : "text-black"}`}
                >
                  {category.name}
                </Text>
                <ChevronRight
                  size={20}
                  color={isDarkMode ? "#9ca3af" : "#6b7280"}
                />
              </TouchableOpacity>

              <View className="p-2">
                {category.subcategories.map((subcategory, index) => (
                  <TouchableOpacity
                    key={index}
                    className={`py-2 px-3 border-b ${isDarkMode ? "border-gray-800" : "border-gray-50"} flex-row justify-between items-center`}
                    onPress={() =>
                      handleSubcategoryPress(category.name, subcategory)
                    }
                  >
                    <Text
                      className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                    >
                      {subcategory}
                    </Text>
                    <ChevronRight
                      size={16}
                      color={isDarkMode ? "#9ca3af" : "#9ca3af"}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <BottomNavbar />
    </View>
  );
}
