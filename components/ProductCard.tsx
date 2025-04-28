import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Star } from "lucide-react-native";

interface ProductCardProps {
  id?: string;
  image?: string;
  name?: string;
  price?: number;
  originalPrice?: number;
  discount?: number;
  rating?: number;
  ratingCount?: number;
  seller?: string;
  onPress?: () => void;
}

const ProductCard = ({
  id = "1",
  image = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80",
  name = "Wireless Headphones",
  price = 1299,
  originalPrice = 2499,
  discount = 48,
  rating = 4.3,
  ratingCount = 1250,
  seller = "AudioTech",
  onPress = () => console.log("Product pressed"),
}: ProductCardProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="w-40 h-60 bg-white rounded-md overflow-hidden shadow-sm border border-gray-200 m-1"
      activeOpacity={0.7}
    >
      {/* Product Image */}
      <View className="h-24 w-full bg-gray-100">
        <Image
          source={{ uri: image }}
          style={{ height: '100%', width: '100%' }}
          resizeMode="cover"
        />
      </View>

      {/* Product Details */}
      <View className="p-2">
        {/* Product Name - truncated to 2 lines */}
        <Text numberOfLines={2} className="text-sm font-medium text-gray-800">
          {name}
        </Text>

        {/* Price Section */}
        <View className="flex-row items-center mt-1">
          <Text className="text-sm font-bold text-gray-900">
            ₹{price.toLocaleString()}
          </Text>
          {originalPrice > price && (
            <Text className="text-xs text-gray-500 line-through ml-1">
              ₹{originalPrice.toLocaleString()}
            </Text>
          )}
        </View>

        {/* Discount */}
        {discount > 0 && (
          <Text className="text-xs font-medium text-green-600 mt-0.5">
            {discount}% off
          </Text>
        )}

        {/* Rating */}
        <View className="flex-row items-center mt-1">
          <View className="flex-row items-center bg-green-600 px-1 rounded">
            <Text className="text-xs text-white font-medium">{rating}</Text>
            <Star size={10} color="white" fill="white" className="ml-0.5" />
          </View>
          <Text className="text-xs text-gray-500 ml-1">({ratingCount})</Text>
        </View>

        {/* Seller */}
        <Text className="text-xs text-gray-500 mt-1" numberOfLines={1}>
          {seller}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
