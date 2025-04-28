import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ArrowLeft,
  Heart,
  Share2,
  Star,
  MapPin,
  Clock,
  ShoppingBag,
  ChevronRight,
  Filter,
} from "lucide-react-native";
import ProductCard from "../../components/ProductCard";
import Header from "../../components/Header";
import BottomNavbar from "../../components/BottomNavbar";

// Mock shop data
const shops = {
  "101": {
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
    joinedDate: "June 2019",
    location: "Mumbai, India",
    isFollowing: false,
    categories: ["Electronics", "Audio", "Accessories"],
    products: [
      {
        id: "1",
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80",
        name: "Wireless Headphones",
        price: 1299,
        originalPrice: 2499,
        discount: 48,
        rating: 4.3,
        ratingCount: 1250,
        seller: "AudioTech",
      },
      {
        id: "3",
        image:
          "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=300&q=80",
        name: "Bluetooth Speaker",
        price: 999,
        originalPrice: 1499,
        discount: 33,
        rating: 4.1,
        ratingCount: 542,
        seller: "AudioTech",
      },
      {
        id: "6",
        image:
          "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=300&q=80",
        name: "Wireless Earbuds",
        price: 899,
        originalPrice: 1299,
        discount: 31,
        rating: 4.2,
        ratingCount: 476,
        seller: "AudioTech",
      },
    ],
  },
  "102": {
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
    joinedDate: "March 2020",
    location: "Bangalore, India",
    isFollowing: true,
    categories: ["Electronics", "Wearables", "Smart Devices"],
    products: [
      {
        id: "2",
        image:
          "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&q=80",
        name: "Smart Watch",
        price: 2499,
        originalPrice: 3999,
        discount: 38,
        rating: 4.5,
        ratingCount: 856,
        seller: "SmartGear",
      },
      {
        id: "5",
        image:
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80",
        name: "Smart Watch Pro",
        price: 4999,
        originalPrice: 6999,
        discount: 29,
        rating: 4.8,
        ratingCount: 189,
        seller: "SmartGear",
      },
    ],
  },
};

// Sort options
const sortOptions = [
  { id: "popularity", label: "Popularity" },
  { id: "price_low", label: "Price: Low to High" },
  { id: "price_high", label: "Price: High to Low" },
  { id: "newest", label: "Newest First" },
];

export default function ShopProfileScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const shopId = Array.isArray(id) ? id[0] : id;
  const [activeSort, setActiveSort] = useState("popularity");
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [isGridView, setIsGridView] = useState(true);

  // Get shop data based on ID
  const shop = shops[shopId as keyof typeof shops] || {
    id: "0",
    name: "Shop Not Found",
    logo: "https://ui-avatars.com/api/?name=Not+Found&background=9ca3af&color=fff&size=128",
    coverImage:
      "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=800&q=80",
    description: "This shop does not exist or has been removed.",
    rating: 0,
    ratingCount: 0,
    followers: 0,
    joinedDate: "Unknown",
    location: "Unknown",
    isFollowing: false,
    categories: [],
    products: [],
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleProductPress = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  const handleFollowToggle = () => {
    // To be implemented
    console.log("Follow/Unfollow:", shop.id);
  };

  const handleSortChange = (sortId: string) => {
    setActiveSort(sortId);
    setShowSortOptions(false);
    // Implement sorting logic here
  };

  const toggleSortOptions = () => {
    setShowSortOptions(!showSortOptions);
  };

  const toggleViewMode = () => {
    setIsGridView(!isGridView);
  };

  return (
    <View className="flex-1 bg-gray-100">
      <Header notificationCount={3} />

      <View className="flex-1">
        <ScrollView>
          {/* Cover Image and Back Button */}
          <View className="relative">
            <Image
              source={{ uri: shop.coverImage }}
              style={{ width: '100%', height: 160 }}
              resizeMode="cover"
            />
            <TouchableOpacity
              onPress={handleGoBack}
              className="absolute top-4 left-4 z-10 bg-white rounded-full p-1.5 shadow-sm"
            >
              <ArrowLeft size={20} color="#000" />
            </TouchableOpacity>
            <View className="absolute top-4 right-4 flex-row">
              <TouchableOpacity className="bg-white rounded-full p-1.5 shadow-sm mr-2">
                <Share2 size={20} color="#000" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Shop Info */}
          <View className="bg-white p-4 -mt-10 mx-4 rounded-t-xl shadow-sm">
            <View className="flex-row">
              <Image
                source={{ uri: shop.logo }}
                style={{ width: 80, height: 80, borderRadius: 40, borderWidth: 4, borderColor: 'white', backgroundColor: 'white' }}
                resizeMode="cover"
                defaultSource={require('../../assets/images/icon.png')}
              />
              <View className="ml-3 flex-1 justify-center">
                <Text className="text-xl font-bold">{shop.name}</Text>
                <View className="flex-row items-center mt-1">
                  <View className="flex-row items-center bg-green-600 px-2 py-0.5 rounded">
                    <Text className="text-sm text-white font-medium">
                      {shop.rating}
                    </Text>
                    <Star
                      size={12}
                      color="white"
                      fill="white"
                      className="ml-0.5"
                    />
                  </View>
                  <Text className="text-sm text-gray-500 ml-2">
                    {shop.ratingCount} ratings
                  </Text>
                </View>
              </View>
            </View>

            {/* Follow Button */}
            <TouchableOpacity
              onPress={handleFollowToggle}
              className={`mt-4 py-2 rounded-md items-center ${shop.isFollowing ? "bg-gray-200" : "bg-blue-600"}`}
            >
              <Text
                className={`font-medium ${shop.isFollowing ? "text-gray-800" : "text-white"}`}
              >
                {shop.isFollowing ? "Following" : "Follow"}
              </Text>
            </TouchableOpacity>

            {/* Shop Details */}
            <View className="mt-4">
              <Text className="text-gray-600">{shop.description}</Text>
              <View className="flex-row items-center mt-3">
                <MapPin size={16} color="#4b5563" />
                <Text className="text-sm text-gray-600 ml-2">
                  {shop.location}
                </Text>
              </View>
              <View className="flex-row items-center mt-2">
                <Clock size={16} color="#4b5563" />
                <Text className="text-sm text-gray-600 ml-2">
                  Joined {shop.joinedDate}
                </Text>
              </View>
              <View className="flex-row items-center mt-2">
                <ShoppingBag size={16} color="#4b5563" />
                <Text className="text-sm text-gray-600 ml-2">
                  {shop.products.length} products
                </Text>
              </View>
            </View>

            {/* Categories */}
            {shop.categories.length > 0 && (
              <View className="mt-4">
                <Text className="text-base font-medium mb-2">Categories</Text>
                <View className="flex-row flex-wrap">
                  {shop.categories.map((category, index) => (
                    <View
                      key={index}
                      className="bg-gray-100 rounded-full px-3 py-1 mr-2 mb-2"
                    >
                      <Text className="text-xs text-gray-700">{category}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>

          {/* Products Section */}
          <View className="bg-white mt-2 p-4">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-lg font-bold">Products</Text>
              <View className="flex-row">
                <TouchableOpacity
                  className="mr-4 flex-row items-center"
                  onPress={toggleSortOptions}
                >
                  <Filter size={18} color="#6b7280" />
                  <Text className="ml-1 text-gray-600">Sort</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleViewMode}>
                  <Text className="text-blue-600">
                    {isGridView ? "List View" : "Grid View"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Sort Options Dropdown */}
            {showSortOptions && (
              <View className="bg-white rounded-md shadow-md mb-4 border border-gray-200">
                {sortOptions.map((option) => (
                  <TouchableOpacity
                    key={option.id}
                    className={`py-3 px-4 border-b border-gray-100 ${activeSort === option.id ? "bg-blue-50" : ""}`}
                    onPress={() => handleSortChange(option.id)}
                  >
                    <Text
                      className={`${activeSort === option.id ? "text-blue-600 font-medium" : "text-gray-700"}`}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {shop.products.length > 0 ? (
              isGridView ? (
                <View className="flex-row flex-wrap justify-between">
                  {shop.products.map((product) => (
                    <View key={product.id} className="w-[48%] mb-4">
                      <ProductCard
                        {...product}
                        onPress={() => handleProductPress(product.id)}
                      />
                    </View>
                  ))}
                </View>
              ) : (
                <View>
                  {shop.products.map((product) => (
                    <TouchableOpacity
                      key={product.id}
                      className="flex-row border-b border-gray-100 py-3"
                      onPress={() => handleProductPress(product.id)}
                    >
                      <Image
                        source={{ uri: product.image }}
                        style={{ width: 80, height: 80, borderRadius: 6 }}
                        resizeMode="cover"
                      />
                      <View className="ml-3 flex-1 justify-center">
                        <Text className="font-medium" numberOfLines={2}>
                          {product.name}
                        </Text>
                        <View className="flex-row items-center mt-1">
                          <Text className="font-bold">
                            ₹{product.price.toLocaleString()}
                          </Text>
                          {product.originalPrice > product.price && (
                            <Text className="text-xs text-gray-500 line-through ml-1">
                              ₹{product.originalPrice.toLocaleString()}
                            </Text>
                          )}
                          {product.discount > 0 && (
                            <Text className="text-xs font-medium text-green-600 ml-1">
                              {product.discount}% off
                            </Text>
                          )}
                        </View>
                        <View className="flex-row items-center mt-1">
                          <View className="flex-row items-center bg-green-600 px-1 rounded">
                            <Text className="text-xs text-white font-medium">
                              {product.rating}
                            </Text>
                            <Star
                              size={10}
                              color="white"
                              fill="white"
                              className="ml-0.5"
                            />
                          </View>
                          <Text className="text-xs text-gray-500 ml-1">
                            ({product.ratingCount})
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              )
            ) : (
              <Text className="text-gray-500 text-center py-4">
                No products available
              </Text>
            )}
          </View>
        </ScrollView>
      </View>

      <BottomNavbar />
    </View>
  );
}
