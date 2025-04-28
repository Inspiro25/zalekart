import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ArrowLeft,
  Heart,
  Share2,
  ShoppingCart,
  Star,
  Truck,
  ChevronRight,
  Plus,
  Minus,
} from "lucide-react-native";
import Header from "../../components/Header";
import BottomNavbar from "../../components/BottomNavbar";

// Mock product data
const products = {
  "1": {
    id: "1",
    name: "Wireless Headphones with Active Noise Cancellation",
    description:
      "Experience premium sound quality with these wireless headphones featuring active noise cancellation, 30-hour battery life, and comfortable over-ear design.",
    price: 1299,
    originalPrice: 2499,
    discount: 48,
    rating: 4.3,
    ratingCount: 1250,
    seller: "AudioTech",
    sellerId: "101",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
      "https://images.unsplash.com/photo-1577174881658-0f30ed549adc?w=800&q=80",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80",
    ],
    specifications: [
      { key: "Brand", value: "AudioTech" },
      { key: "Model", value: "AT-WH100" },
      { key: "Type", value: "Over-ear" },
      { key: "Connectivity", value: "Bluetooth 5.0" },
      { key: "Battery Life", value: "30 hours" },
      { key: "Charging Time", value: "2 hours" },
      { key: "Noise Cancellation", value: "Active" },
      { key: "Warranty", value: "1 year" },
    ],
    inStock: true,
    deliveryDate: "Delivery by Tomorrow",
  },
  "2": {
    id: "2",
    name: "Smart Watch with Health Monitoring",
    description:
      "Track your fitness goals with this advanced smartwatch featuring heart rate monitoring, sleep tracking, and 14-day battery life. Water-resistant up to 50 meters.",
    price: 2499,
    originalPrice: 3999,
    discount: 38,
    rating: 4.5,
    ratingCount: 856,
    seller: "SmartGear",
    sellerId: "102",
    images: [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80",
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&q=80",
    ],
    specifications: [
      { key: "Brand", value: "SmartGear" },
      { key: "Model", value: "SG-W200" },
      { key: "Display", value: "1.4 inch AMOLED" },
      { key: "Water Resistance", value: "50 meters" },
      { key: "Battery Life", value: "14 days" },
      { key: "Sensors", value: "Heart rate, SpO2, Accelerometer" },
      { key: "Compatibility", value: "Android, iOS" },
      { key: "Warranty", value: "1 year" },
    ],
    inStock: true,
    deliveryDate: "Delivery by Tomorrow",
  },
};

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const productId = Array.isArray(id) ? id[0] : id;
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  // Get product data based on ID
  const product = products[productId as keyof typeof products] || {
    id: "0",
    name: "Product Not Found",
    description: "This product does not exist or has been removed.",
    price: 0,
    originalPrice: 0,
    discount: 0,
    rating: 0,
    ratingCount: 0,
    seller: "Unknown",
    sellerId: "0",
    images: [
      "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=800&q=80",
    ],
    specifications: [],
    inStock: false,
    deliveryDate: "Not Available",
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleAddToCart = () => {
    // To be implemented
    console.log("Add to cart:", product.id, "Quantity:", quantity);
  };

  const handleBuyNow = () => {
    // To be implemented
    console.log("Buy now:", product.id, "Quantity:", quantity);
    router.push("/cart");
  };

  const handleSellerPress = () => {
    router.push(`/shop/${product.sellerId}`);
  };

  const handleQuantityChange = (action: "increase" | "decrease") => {
    if (action === "increase") {
      setQuantity((prev) => prev + 1);
    } else if (action === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <View className="flex-1 bg-gray-100">
      <Header notificationCount={3} />

      <View className="flex-1">
        <ScrollView>
          {/* Product Images */}
          <View className="relative bg-white">
            <TouchableOpacity
              onPress={handleGoBack}
              className="absolute top-4 left-4 z-10 bg-white rounded-full p-1.5 shadow-sm"
            >
              <ArrowLeft size={20} color="#000" />
            </TouchableOpacity>

            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={(e) => {
                const contentOffset = e.nativeEvent.contentOffset;
                const viewSize = e.nativeEvent.layoutMeasurement;
                const pageNum = Math.floor(contentOffset.x / viewSize.width);
                setActiveImageIndex(pageNum);
              }}
            >
              {product.images.map((image, index) => (
                <Image
                  key={index}
                  source={{ uri: image }}
                  style={{ width: '100%', height: 320 }}
                  resizeMode="contain"
                />
              ))}
            </ScrollView>

            {/* Image Pagination Dots */}
            {product.images.length > 1 && (
              <View className="flex-row justify-center my-2">
                {product.images.map((_, index) => (
                  <View
                    key={index}
                    className={`h-2 w-2 rounded-full mx-1 ${index === activeImageIndex ? "bg-blue-600" : "bg-gray-300"}`}
                  />
                ))}
              </View>
            )}

            <View className="absolute top-4 right-4 flex-row">
              <TouchableOpacity className="bg-white rounded-full p-1.5 shadow-sm mr-2">
                <Share2 size={20} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-white rounded-full p-1.5 shadow-sm"
                onPress={handleToggleFavorite}
              >
                <Heart
                  size={20}
                  color={isFavorite ? "#ef4444" : "#000"}
                  fill={isFavorite ? "#ef4444" : "none"}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Product Info */}
          <View className="bg-white p-4 mt-2">
            <Text className="text-lg font-medium">{product.name}</Text>

            {/* Rating */}
            <View className="flex-row items-center mt-1">
              <View className="flex-row items-center bg-green-600 px-2 py-0.5 rounded">
                <Text className="text-sm text-white font-medium">
                  {product.rating}
                </Text>
                <Star size={12} color="white" fill="white" className="ml-0.5" />
              </View>
              <Text className="text-sm text-gray-500 ml-2">
                {product.ratingCount} ratings
              </Text>
            </View>

            {/* Price */}
            <View className="flex-row items-center mt-3">
              <Text className="text-xl font-bold">
                ₹{product.price.toLocaleString()}
              </Text>
              {product.originalPrice > product.price && (
                <Text className="text-sm text-gray-500 line-through ml-2">
                  ₹{product.originalPrice.toLocaleString()}
                </Text>
              )}
              {product.discount > 0 && (
                <Text className="text-sm font-medium text-green-600 ml-2">
                  {product.discount}% off
                </Text>
              )}
            </View>

            {/* Quantity Selector */}
            <View className="flex-row items-center mt-4">
              <Text className="text-gray-700 mr-4">Quantity:</Text>
              <View className="flex-row items-center border border-gray-300 rounded-md">
                <TouchableOpacity
                  className="p-2"
                  onPress={() => handleQuantityChange("decrease")}
                  disabled={quantity <= 1}
                >
                  <Minus size={16} color={quantity <= 1 ? "#d1d5db" : "#000"} />
                </TouchableOpacity>
                <Text className="px-4 py-1 text-center min-w-[40px]">
                  {quantity}
                </Text>
                <TouchableOpacity
                  className="p-2"
                  onPress={() => handleQuantityChange("increase")}
                >
                  <Plus size={16} color="#000" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Delivery */}
            <View className="flex-row items-center mt-3">
              <Truck size={16} color="#4b5563" />
              <Text className="text-sm text-gray-600 ml-2">
                {product.deliveryDate}
              </Text>
            </View>
          </View>

          {/* Seller Info */}
          <TouchableOpacity
            className="bg-white p-4 mt-2 flex-row justify-between items-center"
            onPress={handleSellerPress}
          >
            <View>
              <Text className="text-sm text-gray-500">Seller</Text>
              <Text className="text-base font-medium">{product.seller}</Text>
            </View>
            <ChevronRight size={20} color="#6b7280" />
          </TouchableOpacity>

          {/* Description */}
          <View className="bg-white p-4 mt-2">
            <Text className="text-base font-medium mb-2">Description</Text>
            <Text className="text-sm text-gray-600">{product.description}</Text>
          </View>

          {/* Specifications */}
          {product.specifications.length > 0 && (
            <View className="bg-white p-4 mt-2 mb-20">
              <Text className="text-base font-medium mb-2">Specifications</Text>
              {product.specifications.map((spec, index) => (
                <View
                  key={index}
                  className="flex-row py-2 border-b border-gray-100"
                >
                  <Text className="text-sm text-gray-500 w-1/3">
                    {spec.key}
                  </Text>
                  <Text className="text-sm flex-1">{spec.value}</Text>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </View>

      {/* Bottom Action Bar */}
      <View className="flex-row bg-white border-t border-gray-200 p-2">
        <TouchableOpacity
          className="flex-1 bg-yellow-400 rounded-md py-2.5 mx-1 items-center"
          onPress={handleAddToCart}
        >
          <View className="flex-row items-center">
            <ShoppingCart size={18} color="#000" />
            <Text className="font-medium ml-1">ADD TO CART</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 bg-orange-500 rounded-md py-2.5 mx-1 items-center"
          onPress={handleBuyNow}
        >
          <Text className="text-white font-medium">BUY NOW</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
