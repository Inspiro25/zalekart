import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  StatusBar,
  SafeAreaView,
  Animated,
  Dimensions,
  RefreshControl,
  ImageBackground,
  Easing,
} from "react-native";
import { useRouter } from "expo-router";
import { ChevronRight, Star, Clock, TrendingUp, Gift, Truck, Heart } from "lucide-react-native";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import BottomNavbar from "../components/BottomNavbar";
import { useTheme } from "../context/ThemeContext";

// Banner data with improved images
const banners = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=800&q=80",
    title: "Summer Sale",
    subtitle: "Up to 70% off",
    trending: true,
    color: "rgba(59, 130, 246, 0.8)",
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=800&q=80",
    title: "Tech Bonanza",
    subtitle: "Latest gadgets",
    trending: false,
    color: "rgba(239, 68, 68, 0.8)",
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=800&q=80",
    title: "Premium Fashion",
    subtitle: "Designer brands",
    trending: false,
    color: "rgba(16, 185, 129, 0.8)",
  },
];

// Category data with emoji icons
const categories = [
  { id: "1", name: "Fashion", icon: "👕", color: "#F9A8D4" },
  { id: "2", name: "Electronics", icon: "📱", color: "#93C5FD" },
  { id: "3", name: "Home", icon: "🏠", color: "#BEF264" },
  { id: "4", name: "Beauty", icon: "💄", color: "#FED7AA" },
  { id: "5", name: "Toys", icon: "🧸", color: "#C7D2FE" },
  { id: "6", name: "Grocery", icon: "🛒", color: "#A7F3D0" },
  { id: "7", name: "Sports", icon: "⚽", color: "#FDBA74" },
  { id: "8", name: "Books", icon: "📚", color: "#D8B4FE" },
];

// Flash deals
const flashDeals = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1615655406736-b37c4fabf923?w=300&q=80",
    name: "Wireless Headphones",
    price: 499,
    originalPrice: 1999,
    discount: 75,
    rating: 4.5,
    endTime: "2023-12-31T23:59:59",
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1631214504999-63fba29ff9db?w=300&q=80",
    name: "Scalp massager",
    price: 299,
    originalPrice: 999,
    discount: 70,
    rating: 4.3,
    endTime: "2023-12-31T23:59:59",
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1584735175315-9d5df23be5d8?w=300&q=80",
    name: "Yoga Comfort Pants",
    price: 399,
    originalPrice: 1499,
    discount: 73,
    rating: 4.7,
    endTime: "2023-12-31T23:59:59",
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=300&q=80",
    name: "Business Shoes",
    price: 899,
    originalPrice: 2999,
    discount: 70,
    rating: 4.6,
    endTime: "2023-12-31T23:59:59",
  },
];

// New arrivals
const newArrivals = [
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80",
    name: "Running Shoes",
    price: 1999,
    originalPrice: 3499,
    discount: 43,
    rating: 4.8,
    new: true,
  },
  {
    id: "5",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80",
    name: "Smart Watch Pro",
    price: 4999,
    originalPrice: 6999,
    discount: 29,
    rating: 4.6,
    new: true,
  },
  {
    id: "6",
    image: "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=300&q=80",
    name: "Wireless Earbuds",
    price: 899,
    originalPrice: 1299,
    discount: 31,
    rating: 4.5,
    new: true,
  },
];

// Trending Brands
const trendingBrands = [
  { id: "1", name: "Nike", logo: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&q=80" },
  { id: "2", name: "Apple", logo: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&q=80" },
  { id: "3", name: "Samsung", logo: "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=100&q=80" },
  { id: "4", name: "Adidas", logo: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=100&q=80" },
];

const { width } = Dimensions.get("window");
const BANNER_WIDTH = width;

export default function Home() {
  const router = useRouter();
  const theme = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const bannerRef = useRef<ScrollView>(null);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleProductPress = (id: string) => {
    router.push(`/product/${id}` as any);
  };

  const handleCategoryPress = (id: string) => {
    router.push({
      pathname: "/search",
      params: { filter: id },
    } as any);
  };

  const handleViewAll = (section: string) => {
    if (section === "flashDeals") {
      router.push("/offers" as any);
    } else if (section === "newArrivals") {
      router.push({
        pathname: "/search",
        params: { filter: "new" },
      } as any);
    }
  };

  // Auto scroll for banner
  useEffect(() => {
    const timer = setInterval(() => {
      if (currentBannerIndex < banners.length - 1) {
        bannerRef.current?.scrollTo({
          x: BANNER_WIDTH * (currentBannerIndex + 1),
          animated: true,
        });
        setCurrentBannerIndex(currentBannerIndex + 1);
      } else {
        bannerRef.current?.scrollTo({
          x: 0,
          animated: true,
        });
        setCurrentBannerIndex(0);
      }
    }, 3000);

    return () => clearInterval(timer);
  }, [currentBannerIndex]);

  const renderBannerIndicator = (total: number, current: number) => {
    return (
      <View className="flex-row justify-center my-3">
        {Array.from({ length: total }).map((_, index) => (
          <View
            key={index}
            className={`h-1.5 rounded-full mx-1 ${
              index === current 
                ? "bg-blue-600 w-6" 
                : "bg-gray-300 w-1.5"
            }`}
          />
        ))}
      </View>
    );
  };

  const handleBannerScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const handleMomentumScrollEnd = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / BANNER_WIDTH);
    setCurrentBannerIndex(index);
  };

  return (
    <SafeAreaView 
      className="flex-1 bg-gray-100" 
      style={{ paddingTop: 0 }}
    >
      <Header notificationCount={3} />

      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[theme.secondaryColor]} />
        }
      >
        {/* Banner Carousel */}
        <View>
          <Animated.ScrollView
            ref={bannerRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleBannerScroll}
            onMomentumScrollEnd={handleMomentumScrollEnd}
          >
            {banners.map((banner) => (
              <View key={banner.id} className="relative" style={{ width: BANNER_WIDTH }}>
                <ImageBackground
                  source={{ uri: banner.image }}
                  style={{ width: BANNER_WIDTH, height: 220 }}
                  resizeMode="cover"
                >
                  <View 
                    className="absolute inset-0 flex justify-end" 
                    style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
                  >
                    <View className="p-5" style={{ backgroundColor: banner.color }}>
                      {banner.trending && (
                        <View className="flex-row items-center mb-1">
                          <TrendingUp size={14} color="white" />
                          <Text className="text-white font-medium text-xs ml-1">TRENDING</Text>
                        </View>
                      )}
                      <Text className="text-white text-2xl font-bold">{banner.title}</Text>
                      <Text className="text-gray-100 mb-2">{banner.subtitle}</Text>
                      <TouchableOpacity 
                        className="bg-white mt-2 px-5 py-1.5 rounded-full self-start"
                        onPress={() => router.push("/categories" as any)}
                      >
                        <Text className="text-blue-800 font-medium">Shop Now</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </ImageBackground>
              </View>
            ))}
          </Animated.ScrollView>
          {renderBannerIndicator(banners.length, currentBannerIndex)}
        </View>

        {/* Services Row */}
        <View className="bg-white py-4 mb-2">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-2">
            <View className="flex-row space-x-4">
              <TouchableOpacity className="items-center px-3">
                <View className="w-10 h-10 rounded-full bg-blue-100 items-center justify-center mb-1">
                  <Truck size={18} color="#3b82f6" />
                </View>
                <Text className="text-xs text-gray-600">Free Shipping</Text>
              </TouchableOpacity>
              
              <TouchableOpacity className="items-center px-3">
                <View className="w-10 h-10 rounded-full bg-green-100 items-center justify-center mb-1">
                  <Gift size={18} color="#10b981" />
                </View>
                <Text className="text-xs text-gray-600">Daily Gifts</Text>
              </TouchableOpacity>
              
              <TouchableOpacity className="items-center px-3">
                <View className="w-10 h-10 rounded-full bg-yellow-100 items-center justify-center mb-1">
                  <TrendingUp size={18} color="#f59e0b" />
                </View>
                <Text className="text-xs text-gray-600">Trending</Text>
              </TouchableOpacity>
              
              <TouchableOpacity className="items-center px-3">
                <View className="w-10 h-10 rounded-full bg-purple-100 items-center justify-center mb-1">
                  <Clock size={18} color="#8b5cf6" />
                </View>
                <Text className="text-xs text-gray-600">Flash Sales</Text>
              </TouchableOpacity>
              
              <TouchableOpacity className="items-center px-3">
                <View className="w-10 h-10 rounded-full bg-pink-100 items-center justify-center mb-1">
                  <Heart size={18} color="#ec4899" />
                </View>
                <Text className="text-xs text-gray-600">Wishlist</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>

        {/* Categories */}
        <View className="px-2 py-4 bg-white mb-2">
          <View className="flex-row justify-between items-center px-2 mb-3">
            <Text className="text-lg font-bold text-gray-800">Categories</Text>
            <TouchableOpacity className="flex-row items-center"
              onPress={() => router.push("/categories" as any)}>
              <Text className="text-blue-500 mr-1 text-sm">View All</Text>
              <ChevronRight size={16} color="#3b82f6" />
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row px-2">
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  className="items-center mr-4"
                  activeOpacity={0.7}
                  onPress={() => handleCategoryPress(category.id)}
                >
                  <View 
                    className="w-14 h-14 rounded-full items-center justify-center mb-1"
                    style={{ backgroundColor: category.color }}
                  >
                    <Text className="text-2xl">{category.icon}</Text>
                  </View>
                  <Text className="text-xs text-center font-medium">
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Flash Deals */}
        <View className="mt-2 py-4 bg-white mb-2">
          <View className="flex-row justify-between items-center px-4 mb-3">
            <View className="flex-row items-center">
              <Text className="text-lg font-bold text-gray-800">Flash Deals</Text>
              <View className="ml-2 bg-red-500 rounded px-2 py-0.5">
                <Text className="text-white text-xs font-bold">LIVE</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => handleViewAll("flashDeals")} className="flex-row items-center">
              <Text className="text-blue-500 mr-1 text-sm">View All</Text>
              <ChevronRight size={16} color="#3b82f6" />
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="px-2"
          >
            {flashDeals.map((deal) => (
              <TouchableOpacity
                key={deal.id}
                className="mr-3 bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm"
                style={{ width: 150 }}
                onPress={() => handleProductPress(deal.id)}
              >
                <View className="relative">
                  <Image
                    source={{ uri: deal.image }}
                    style={{ width: 150, height: 150 }}
                    resizeMode="cover"
                  />
                  <View className="absolute top-0 left-0 bg-red-500 px-2 py-0.5">
                    <Text className="text-white text-xs font-bold">{deal.discount}% OFF</Text>
                  </View>
                </View>
                <View className="p-2">
                  <Text numberOfLines={2} className="text-sm font-medium text-gray-800">
                    {deal.name}
                  </Text>
                  <View className="flex-row items-center mt-1">
                    <Text className="text-sm font-bold text-gray-900">
                      ₹{deal.price}
                    </Text>
                    <Text className="text-xs text-gray-500 line-through ml-1">
                      ₹{deal.originalPrice}
                    </Text>
                  </View>
                  <View className="flex-row items-center mt-1">
                    <Star size={12} color="#f59e0b" fill="#f59e0b" />
                    <Text className="text-xs text-gray-600 ml-1">
                      {deal.rating}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Trending Brands */}
        <View className="mt-2 py-4 bg-white mb-2">
          <View className="flex-row justify-between items-center px-4 mb-3">
            <Text className="text-lg font-bold text-gray-800">Trending Brands</Text>
            <TouchableOpacity className="flex-row items-center">
              <Text className="text-blue-500 mr-1 text-sm">View All</Text>
              <ChevronRight size={16} color="#3b82f6" />
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="px-2"
          >
            {trendingBrands.map((brand) => (
              <TouchableOpacity
                key={brand.id}
                className="mr-4 items-center"
                onPress={() => router.push(`/shop/${brand.id}` as any)}
              >
                <View className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200">
                  <Image
                    source={{ uri: brand.logo }}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="cover"
                  />
                </View>
                <Text className="text-xs text-center mt-1 font-medium">
                  {brand.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* New Arrivals */}
        <View className="mt-2 py-4 bg-white mb-20">
          <View className="flex-row justify-between items-center px-4 mb-3">
            <Text className="text-lg font-bold text-gray-800">New Arrivals</Text>
            <TouchableOpacity onPress={() => handleViewAll("newArrivals")} className="flex-row items-center">
              <Text className="text-blue-500 mr-1 text-sm">View All</Text>
              <ChevronRight size={16} color="#3b82f6" />
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="px-2"
          >
            {newArrivals.map((product) => (
              <TouchableOpacity
                key={product.id}
                className="mr-3 bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm"
                style={{ width: 150 }}
                onPress={() => handleProductPress(product.id)}
              >
                <View className="relative">
                  <Image
                    source={{ uri: product.image }}
                    style={{ width: 150, height: 150 }}
                    resizeMode="cover"
                  />
                  {product.new && (
                    <View className="absolute top-0 left-0 bg-green-500 px-2 py-0.5">
                      <Text className="text-white text-xs font-bold">NEW</Text>
                    </View>
                  )}
                </View>
                <View className="p-2">
                  <Text numberOfLines={2} className="text-sm font-medium text-gray-800">
                    {product.name}
                  </Text>
                  <View className="flex-row items-center mt-1">
                    <Text className="text-sm font-bold text-gray-900">
                      ₹{product.price}
                    </Text>
                    <Text className="text-xs text-gray-500 line-through ml-1">
                      ₹{product.originalPrice}
                    </Text>
                  </View>
                  <View className="flex-row items-center mt-1">
                    <Star size={12} color="#f59e0b" fill="#f59e0b" />
                    <Text className="text-xs text-gray-600 ml-1">
                      {product.rating}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      <BottomNavbar />
    </SafeAreaView>
  );
}
