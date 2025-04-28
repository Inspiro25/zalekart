import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { Star, MapPin, ChevronRight } from "lucide-react-native";
import Header from "../../components/Header";
import BottomNavbar from "../../components/BottomNavbar";
import { useTheme } from "../../context/ThemeContext";

// Mock shops data
const shops = [
  {
    id: "101",
    name: "AudioTech",
    logo: "https://ui-avatars.com/api/?name=Audio+Tech&background=3b82f6&color=fff&size=128",
    coverImage:
      "https://images.unsplash.com/photo-1558478551-1a378f63328e?w=800&q=80",
    description:
      "Premium audio equipment at affordable prices. We specialize in headphones, speakers, and other audio accessories.",
    rating: 4.2,
    ratingCount: 1823,
    followers: 5642,
    location: "Mumbai, India",
    productCount: 24,
    categories: ["Electronics", "Audio", "Accessories"],
  },
  {
    id: "102",
    name: "SmartGear",
    logo: "https://ui-avatars.com/api/?name=Smart+Gear&background=10b981&color=fff&size=128",
    coverImage:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&q=80",
    description:
      "Cutting-edge smart wearables and gadgets for the modern lifestyle. From smartwatches to fitness trackers, we have it all.",
    rating: 4.5,
    ratingCount: 1245,
    followers: 8932,
    location: "Bangalore, India",
    productCount: 18,
    categories: ["Electronics", "Wearables", "Smart Devices"],
  },
  {
    id: "103",
    name: "FashionHub",
    logo: "https://ui-avatars.com/api/?name=Fashion+Hub&background=ef4444&color=fff&size=128",
    coverImage:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    description:
      "Your one-stop destination for trendy fashion. We offer the latest styles in clothing, footwear, and accessories for men and women.",
    rating: 4.3,
    ratingCount: 2156,
    followers: 12453,
    location: "Delhi, India",
    productCount: 156,
    categories: ["Fashion", "Clothing", "Accessories"],
  },
  {
    id: "104",
    name: "HomeDecor",
    logo: "https://ui-avatars.com/api/?name=Home+Decor&background=f59e0b&color=fff&size=128",
    coverImage:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80",
    description:
      "Transform your living space with our exquisite home decor items. From furniture to wall art, we have everything to make your house a home.",
    rating: 4.6,
    ratingCount: 987,
    followers: 7654,
    location: "Pune, India",
    productCount: 89,
    categories: ["Home", "Furniture", "Decor"],
  },
  {
    id: "105",
    name: "BeautyBoutique",
    logo: "https://ui-avatars.com/api/?name=Beauty+Boutique&background=8b5cf6&color=fff&size=128",
    coverImage:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80",
    description:
      "Premium beauty and skincare products for all skin types. We believe in beauty that's cruelty-free and sustainable.",
    rating: 4.4,
    ratingCount: 1543,
    followers: 9876,
    location: "Chennai, India",
    productCount: 112,
    categories: ["Beauty", "Skincare", "Makeup"],
  },
];

export default function ShopsScreen() {
  const router = useRouter();
  const { isDarkMode } = useTheme();

  const handleShopPress = (id: string) => {
    router.push(`/shop/${id}`);
  };

  const renderShopItem = ({ item }: { item: (typeof shops)[0] }) => (
    <TouchableOpacity
      className={`${isDarkMode ? "bg-black" : "bg-white"} mb-3 rounded-lg overflow-hidden shadow-sm`}
      onPress={() => handleShopPress(item.id)}
      activeOpacity={0.7}
    >
      {/* Cover Image */}
      <Image
        source={{ uri: item.coverImage }}
        style={{ width: '100%', height: 128 }}
        resizeMode="cover"
      />

      <View className="p-4">
        <View className="flex-row">
          {/* Shop Logo */}
          <Image
            source={{ uri: item.logo }}
            style={{ width: 64, height: 64, borderRadius: 32, borderWidth: 2, borderColor: 'white', backgroundColor: 'white' }}
            resizeMode="cover"
            defaultSource={require('../../assets/images/icon.png')}
          />

          {/* Shop Info */}
          <View className="ml-3 flex-1 justify-center">
            <Text
              className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-black"}`}
            >
              {item.name}
            </Text>
            <View className="flex-row items-center mt-1">
              <View className="flex-row items-center bg-green-600 px-2 py-0.5 rounded">
                <Text className="text-xs text-white font-medium">
                  {item.rating}
                </Text>
                <Star size={10} color="white" fill="white" className="ml-0.5" />
              </View>
              <Text
                className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"} ml-2`}
              >
                {item.ratingCount} ratings
              </Text>
              <Text
                className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"} ml-2`}
              >
                {item.followers} followers
              </Text>
            </View>
          </View>

          <ChevronRight size={20} color={isDarkMode ? "#9ca3af" : "#9ca3af"} />
        </View>

        {/* Shop Description */}
        <Text
          numberOfLines={2}
          className={`${isDarkMode ? "text-gray-300" : "text-gray-600"} mt-2`}
        >
          {item.description}
        </Text>

        {/* Shop Location and Product Count */}
        <View className="flex-row items-center mt-2">
          <MapPin size={14} color={isDarkMode ? "#9ca3af" : "#4b5563"} />
          <Text
            className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"} ml-1`}
          >
            {item.location}
          </Text>
          <Text
            className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"} ml-3`}
          >
            {item.productCount} products
          </Text>
        </View>

        {/* Categories */}
        <View className="flex-row flex-wrap mt-2">
          {item.categories.map((category, index) => (
            <View
              key={index}
              className={`${isDarkMode ? "bg-gray-800" : "bg-gray-100"} rounded-full px-2 py-0.5 mr-2 mb-1`}
            >
              <Text
                className={`text-xs ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
              >
                {category}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-100">
      <Header notificationCount={3} />

      <FlatList
        data={shops}
        renderItem={renderShopItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 12 }}
      />

      <BottomNavbar />
    </View>
  );
}
