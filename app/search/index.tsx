import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  TextInput,
  Image,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { Search, Filter, Star, X, ChevronDown } from "lucide-react-native";
import Header from "../../components/Header";
import BottomNavbar from "../../components/BottomNavbar";

// Mock search results data
const allProducts = [
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80",
    name: "Wireless Headphones with Active Noise Cancellation",
    price: 1299,
    originalPrice: 2499,
    discount: 48,
    rating: 4.3,
    ratingCount: 1250,
    seller: "AudioTech",
    category: "Electronics",
    isNew: false,
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&q=80",
    name: "Smart Watch with Health Monitoring",
    price: 2499,
    originalPrice: 3999,
    discount: 38,
    rating: 4.5,
    ratingCount: 856,
    seller: "SmartGear",
    category: "Electronics",
    isNew: false,
  },
  {
    id: "3",
    image:
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=300&q=80",
    name: "Bluetooth Speaker Waterproof",
    price: 999,
    originalPrice: 1499,
    discount: 33,
    rating: 4.1,
    ratingCount: 542,
    seller: "SoundWave",
    category: "Electronics",
    isNew: false,
  },
  {
    id: "4",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80",
    name: "Running Shoes Lightweight",
    price: 1999,
    originalPrice: 3499,
    discount: 43,
    rating: 4.7,
    ratingCount: 320,
    seller: "SportyFeet",
    category: "Fashion",
    isNew: true,
  },
  {
    id: "5",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80",
    name: "Smart Watch Pro with GPS",
    price: 4999,
    originalPrice: 6999,
    discount: 29,
    rating: 4.8,
    ratingCount: 189,
    seller: "TechGadgets",
    category: "Electronics",
    isNew: true,
  },
  {
    id: "6",
    image:
      "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=300&q=80",
    name: "Wireless Earbuds with Charging Case",
    price: 899,
    originalPrice: 1299,
    discount: 31,
    rating: 4.2,
    ratingCount: 476,
    seller: "AudioPro",
    category: "Electronics",
    isNew: true,
  },
];

const sortOptions = [
  { id: "popular", label: "Popularity" },
  { id: "priceAsc", label: "Price: Low to High" },
  { id: "priceDesc", label: "Price: High to Low" },
  { id: "newest", label: "Newest First" },
];

const filterOptions = [
  { id: "all", label: "All Products" },
  { id: "new", label: "New Arrivals" },
  { id: "discount", label: "Discounted" },
  { id: "electronics", label: "Electronics" },
  { id: "fashion", label: "Fashion" },
];

export default function SearchScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState(params.filter || "all");
  const [activeSort, setActiveSort] = useState("popular");
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(allProducts);

  useEffect(() => {
    if (params.query) {
      setSearchQuery(params.query as string);
    }
    if (params.filter) {
      setActiveFilter(params.filter as string);
    }
  }, [params]);

  useEffect(() => {
    let filtered = [...allProducts];

    // Apply search query
    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (activeFilter === "new") {
      filtered = filtered.filter(product => product.isNew);
    } else if (activeFilter === "discount") {
      filtered = filtered.filter(product => product.discount >= 30);
    } else if (activeFilter === "electronics") {
      filtered = filtered.filter(product => product.category === "Electronics");
    } else if (activeFilter === "fashion") {
      filtered = filtered.filter(product => product.category === "Fashion");
    }

    // Apply sorting
    if (activeSort === "priceAsc") {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (activeSort === "priceDesc") {
      filtered = filtered.sort((a, b) => b.price - a.price);
    } else if (activeSort === "newest") {
      filtered = filtered.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
    }

    setFilteredProducts(filtered);
  }, [searchQuery, activeFilter, activeSort]);

  const handleSearch = () => {
    // Update URL params
    router.setParams({ query: searchQuery });
  };

  const handleProductPress = (id: string) => {
    router.push(`/product/${id}`);
  };

  const toggleSortOptions = () => {
    setShowSortOptions(!showSortOptions);
  };

  const handleSortChange = (sortId: string) => {
    setActiveSort(sortId);
    setShowSortOptions(false);
  };

  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId);
    router.setParams({ filter: filterId });
  };

  const renderProductItem = ({ item }: { item: typeof allProducts[0] }) => (
    <TouchableOpacity
      className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-4 mx-2"
      style={{ width: '47%' }}
      activeOpacity={0.7}
      onPress={() => handleProductPress(item.id)}
    >
      <View className="relative">
        <Image
          source={{ uri: item.image }}
          style={{ width: '100%', height: 180 }}
          resizeMode="cover"
        />
        {item.discount > 0 && (
          <View className="absolute top-0 right-0 bg-red-500 px-2 py-0.5">
            <Text className="text-white text-xs font-bold">{item.discount}% OFF</Text>
          </View>
        )}
        {item.isNew && (
          <View className="absolute top-0 left-0 bg-green-500 px-2 py-0.5">
            <Text className="text-white text-xs font-bold">NEW</Text>
          </View>
        )}
      </View>
      <View className="p-2">
        <Text numberOfLines={2} className="text-sm font-medium text-gray-800">
          {item.name}
        </Text>
        <View className="flex-row items-center mt-1">
          <Text className="text-sm font-bold text-gray-900">
            ₹{item.price}
          </Text>
          {item.originalPrice > item.price && (
            <Text className="text-xs text-gray-500 line-through ml-1">
              ₹{item.originalPrice}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-100">
      <Header notificationCount={3} />

      {/* Filter Bar */}
      <View className="bg-white">
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          className="py-2 border-b border-gray-200"
        >
          {filterOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              className={`px-4 py-1 mx-1 rounded-full ${
                activeFilter === option.id ? "bg-blue-100" : "bg-gray-100"
              }`}
              onPress={() => handleFilterChange(option.id)}
            >
              <Text
                className={
                  activeFilter === option.id
                    ? "text-blue-600 font-medium"
                    : "text-gray-600"
                }
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Sort Options */}
        <View className="flex-row justify-between items-center px-4 py-2 border-b border-gray-200">
          <Text className="text-gray-500">
            {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
          </Text>
          <TouchableOpacity
            className="flex-row items-center"
            onPress={toggleSortOptions}
          >
            <Filter size={16} color="#4b5563" />
            <Text className="text-gray-700 mx-1">Sort by</Text>
            <Text className="text-blue-600 font-medium mr-1">
              {sortOptions.find(opt => opt.id === activeSort)?.label || "Popularity"}
            </Text>
            <ChevronDown size={16} color="#3b82f6" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Sort Options Dropdown */}
      {showSortOptions && (
        <View className="absolute top-[200] right-4 z-10 bg-white rounded-md shadow-lg border border-gray-200 w-56">
          {sortOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              className={`py-3 px-4 border-b border-gray-100 ${
                activeSort === option.id ? "bg-blue-50" : ""
              }`}
              onPress={() => handleSortChange(option.id)}
            >
              <Text
                className={
                  activeSort === option.id
                    ? "text-blue-600 font-medium"
                    : "text-gray-700"
                }
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Product List */}
      <FlatList
        data={filteredProducts}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={{ padding: 8 }}
        ListEmptyComponent={
          <View className="items-center justify-center py-10">
            <Text className="text-gray-500 text-center">
              No products found matching your criteria.
            </Text>
          </View>
        }
      />

      <BottomNavbar />
    </View>
  );
}
