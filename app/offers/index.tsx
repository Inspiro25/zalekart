import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { Tag, ChevronRight } from "lucide-react-native";
import Header from "../../components/Header";
import BottomNavbar from "../../components/BottomNavbar";

// Mock data for offers
const offers = [
  {
    id: "1",
    title: "Flash Sale",
    description: "Up to 70% off on electronics",
    code: "FLASH70",
    validUntil: "24 hours left",
    image: "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=800&q=80",
  },
  {
    id: "2",
    title: "Weekend Special",
    description: "Buy 1 Get 1 Free on clothing",
    code: "WEEKEND",
    validUntil: "Ends Sunday",
    image: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=800&q=80",
  },
  {
    id: "3",
    title: "New User Offer",
    description: "₹500 off on your first order",
    code: "WELCOME500",
    validUntil: "Valid for 7 days",
    image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=800&q=80",
  },
  {
    id: "4",
    title: "Loyalty Bonus",
    description: "Extra 10% off for premium members",
    code: "PREMIUM10",
    validUntil: "Always valid",
    image: "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=800&q=80",
  },
];

export default function OffersScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-gray-100">
      <Header notificationCount={3} />

      <ScrollView className="flex-1">
        <View className="bg-[#151D3B] p-4">
          <Text className="text-white text-xl font-bold mb-1">Special Offers</Text>
          <Text className="text-gray-300 text-sm">Use these codes at checkout to save big!</Text>
        </View>

        {/* Offers List */}
        <View className="p-4">
          {offers.map((offer) => (
            <TouchableOpacity
              key={offer.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden mb-4 border border-gray-100"
              activeOpacity={0.7}
            >
              <Image
                source={{ uri: offer.image }}
                style={{ width: '100%', height: 120 }}
                resizeMode="cover"
              />
              <View className="p-4">
                <View className="flex-row justify-between items-center mb-2">
                  <Text className="text-lg font-bold text-gray-800">{offer.title}</Text>
                  <View className="bg-orange-100 rounded-full px-2 py-1">
                    <Text className="text-xs text-orange-600">{offer.validUntil}</Text>
                  </View>
                </View>
                <Text className="text-gray-600 mb-3">{offer.description}</Text>
                <View className="flex-row justify-between items-center">
                  <View className="flex-row items-center bg-gray-100 rounded-md p-2">
                    <Tag size={16} color="#4b5563" />
                    <Text className="text-gray-700 font-medium ml-2">{offer.code}</Text>
                  </View>
                  <TouchableOpacity className="bg-blue-500 rounded-md px-3 py-1.5">
                    <Text className="text-white font-medium">Apply</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recommended Products */}
        <View className="bg-white p-4 mt-2 mb-2">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold text-gray-800">Trending Deals</Text>
            <TouchableOpacity className="flex-row items-center">
              <Text className="text-blue-500 mr-1">See All</Text>
              <ChevronRight size={16} color="#3b82f6" />
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[1, 2, 3, 4].map((item) => (
              <TouchableOpacity
                key={item}
                className="mr-4 bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100"
                style={{ width: 150 }}
                activeOpacity={0.7}
              >
                <View className="bg-red-500 absolute top-2 right-2 z-10 px-2 py-0.5 rounded">
                  <Text className="text-white text-xs font-bold">50% OFF</Text>
                </View>
                <Image
                  source={{ uri: `https://source.unsplash.com/random/150x150?product=${item}` }}
                  style={{ width: 150, height: 150 }}
                  resizeMode="cover"
                />
                <View className="p-2">
                  <Text className="text-sm font-medium text-gray-800" numberOfLines={2}>
                    Product Name {item}
                  </Text>
                  <View className="flex-row items-center mt-1">
                    <Text className="text-sm font-bold text-gray-900">₹499</Text>
                    <Text className="text-xs text-gray-500 line-through ml-1">₹999</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      <BottomNavbar />
    </View>
  );
} 