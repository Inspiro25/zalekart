import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import {
  ArrowLeft,
  Heart,
  ShoppingCart,
  Star,
  Trash2,
} from "lucide-react-native";
import Header from "../../components/Header";
import BottomNavbar from "../../components/BottomNavbar";
import { useTheme } from "../../context/ThemeContext";

// Mock wishlist data
const wishlistItems = [
  {
    id: "1",
    name: "Wireless Headphones with Active Noise Cancellation",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80",
    price: 1299,
    originalPrice: 2499,
    discount: 48,
    rating: 4.3,
    ratingCount: 1250,
    seller: "AudioTech",
    inStock: true,
  },
  {
    id: "3",
    name: "Bluetooth Speaker Waterproof",
    image:
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=300&q=80",
    price: 999,
    originalPrice: 1499,
    discount: 33,
    rating: 4.1,
    ratingCount: 542,
    seller: "SoundWave",
    inStock: true,
  },
  {
    id: "5",
    name: "Smart Watch Pro with GPS",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80",
    price: 4999,
    originalPrice: 6999,
    discount: 29,
    rating: 4.8,
    ratingCount: 189,
    seller: "TechGadgets",
    inStock: false,
  },
];

export default function WishlistScreen() {
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const [items, setItems] = React.useState(wishlistItems);

  const handleGoBack = () => {
    router.back();
  };

  const handleProductPress = (id: string) => {
    router.push(`/product/${id}`);
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleAddToCart = (id: string) => {
    console.log("Add to cart:", id);
    router.push("/cart");
  };

  const renderWishlistItem = ({
    item,
  }: {
    item: (typeof wishlistItems)[0];
  }) => (
    <View
      className={`${isDarkMode ? "bg-black" : "bg-white"} mb-3 rounded-lg overflow-hidden`}
    >
      <TouchableOpacity
        className="flex-row p-3"
        onPress={() => handleProductPress(item.id)}
      >
        <Image
          source={{ uri: item.image }}
          className="w-20 h-20 rounded-md"
          contentFit="cover"
        />
        <View className="ml-3 flex-1">
          <Text
            numberOfLines={2}
            className={`font-medium ${isDarkMode ? "text-white" : "text-black"}`}
          >
            {item.name}
          </Text>
          <Text
            className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"} mt-1`}
          >
            Seller: {item.seller}
          </Text>

          <View className="flex-row items-center mt-1">
            <Text
              className={`font-bold ${isDarkMode ? "text-white" : "text-black"}`}
            >
              ₹{item.price.toLocaleString()}
            </Text>
            {item.originalPrice > item.price && (
              <Text className="text-xs text-gray-500 line-through ml-1">
                ₹{item.originalPrice.toLocaleString()}
              </Text>
            )}
            {item.discount > 0 && (
              <Text className="text-xs font-medium text-green-600 ml-1">
                {item.discount}% off
              </Text>
            )}
          </View>

          <View className="flex-row items-center mt-1">
            <View className="flex-row items-center bg-green-600 px-1 rounded">
              <Text className="text-xs text-white font-medium">
                {item.rating}
              </Text>
              <Star size={10} color="white" fill="white" className="ml-0.5" />
            </View>
            <Text
              className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"} ml-1`}
            >
              ({item.ratingCount})
            </Text>
            {!item.inStock && (
              <Text className="text-xs text-red-500 ml-2">Out of Stock</Text>
            )}
          </View>
        </View>
      </TouchableOpacity>

      <View
        className={`flex-row ${isDarkMode ? "border-t border-gray-800" : "border-t border-gray-100"}`}
      >
        <TouchableOpacity
          className={`flex-1 py-2 flex-row items-center justify-center ${isDarkMode ? "border-r border-gray-800" : "border-r border-gray-100"}`}
          onPress={() => handleRemoveItem(item.id)}
        >
          <Trash2 size={16} color="#ef4444" />
          <Text className="ml-1 text-red-500 font-medium">Remove</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`flex-1 py-2 flex-row items-center justify-center ${!item.inStock ? "opacity-50" : ""}`}
          onPress={() => item.inStock && handleAddToCart(item.id)}
          disabled={!item.inStock}
        >
          <ShoppingCart size={16} color="#2563eb" />
          <Text className="ml-1 text-blue-600 font-medium">Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View className={`flex-1 ${isDarkMode ? "bg-gray-900" : "bg-gray-100"}`}>
      <Header showSearch={false} />

      <View
        className={`p-4 ${isDarkMode ? "bg-black" : "bg-white"} border-b ${isDarkMode ? "border-gray-800" : "border-gray-200"} flex-row items-center`}
      >
        <TouchableOpacity onPress={handleGoBack} className="mr-3">
          <ArrowLeft size={24} color={isDarkMode ? "#fff" : "#000"} />
        </TouchableOpacity>
        <Text
          className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-black"}`}
        >
          My Wishlist
        </Text>
      </View>

      <FlatList
        data={items}
        renderItem={renderWishlistItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 12 }}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center p-4">
            <Heart size={60} color={isDarkMode ? "#4b5563" : "#d1d5db"} />
            <Text
              className={`text-lg font-medium mt-4 text-center ${isDarkMode ? "text-white" : "text-black"}`}
            >
              Your Wishlist is Empty
            </Text>
            <Text
              className={`${isDarkMode ? "text-gray-400" : "text-gray-500"} text-center mt-2`}
            >
              Save items you like in your wishlist and buy them later.
            </Text>
            <TouchableOpacity
              className="mt-4 bg-blue-600 px-4 py-2 rounded-md"
              onPress={() => router.push("/")}
            >
              <Text className="text-white font-medium">Start Shopping</Text>
            </TouchableOpacity>
          </View>
        }
      />

      <BottomNavbar />
    </View>
  );
}
