import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { ArrowLeft, Package, ChevronRight } from "lucide-react-native";
import Header from "../../components/Header";
import BottomNavbar from "../../components/BottomNavbar";
import { useTheme } from "../../context/ThemeContext";

// Mock orders data
const orders = [
  {
    id: "ORD001",
    date: "15 Jun 2023",
    total: 1299,
    status: "Delivered",
    items: [
      {
        id: "1",
        name: "Wireless Headphones",
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80",
        price: 1299,
        quantity: 1,
      },
    ],
  },
  {
    id: "ORD002",
    date: "10 Jun 2023",
    total: 4998,
    status: "Shipped",
    items: [
      {
        id: "2",
        name: "Smart Watch",
        image:
          "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&q=80",
        price: 2499,
        quantity: 2,
      },
    ],
  },
  {
    id: "ORD003",
    date: "5 Jun 2023",
    total: 999,
    status: "Processing",
    items: [
      {
        id: "3",
        name: "Bluetooth Speaker",
        image:
          "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=300&q=80",
        price: 999,
        quantity: 1,
      },
    ],
  },
  {
    id: "ORD004",
    date: "1 Jun 2023",
    total: 3499,
    status: "Delivered",
    items: [
      {
        id: "4",
        name: "Running Shoes",
        image:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80",
        price: 1999,
        quantity: 1,
      },
      {
        id: "6",
        name: "Wireless Earbuds",
        image:
          "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=300&q=80",
        price: 1500,
        quantity: 1,
      },
    ],
  },
];

export default function OrdersScreen() {
  const router = useRouter();
  const { isDarkMode } = useTheme();

  const handleGoBack = () => {
    router.back();
  };

  const handleOrderPress = (orderId: string) => {
    // Navigate to order details
    console.log("View order details:", orderId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Shipped":
        return "bg-blue-100 text-blue-700";
      case "Processing":
        return "bg-orange-100 text-orange-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const renderOrderItem = ({ item }: { item: (typeof orders)[0] }) => (
    <TouchableOpacity
      className={`${isDarkMode ? "bg-black" : "bg-white"} mb-3 rounded-lg overflow-hidden`}
      onPress={() => handleOrderPress(item.id)}
    >
      <View
        className={`p-4 border-b ${isDarkMode ? "border-gray-800" : "border-gray-100"}`}
      >
        <View className="flex-row justify-between items-center">
          <Text
            className={`font-bold ${isDarkMode ? "text-white" : "text-black"}`}
          >
            {item.id}
          </Text>
          <View
            className={`px-2 py-0.5 rounded ${getStatusColor(item.status).split(" ")[0]}`}
          >
            <Text
              className={`text-xs font-medium ${getStatusColor(item.status).split(" ")[1]}`}
            >
              {item.status}
            </Text>
          </View>
        </View>
        <Text
          className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
        >
          {item.date}
        </Text>
        <Text
          className={`font-medium mt-1 ${isDarkMode ? "text-white" : "text-black"}`}
        >
          ₹{item.total.toLocaleString()}
        </Text>
      </View>

      <View className="p-4">
        <Text
          className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"} mb-2`}
        >
          {item.items.length} {item.items.length > 1 ? "items" : "item"}
        </Text>

        {item.items.map((product, index) => (
          <View key={index} className="flex-row items-center mb-2 last:mb-0">
            <Image
              source={{ uri: product.image }}
              className="w-12 h-12 rounded-md"
              contentFit="cover"
            />
            <View className="ml-3 flex-1">
              <Text
                numberOfLines={1}
                className={`font-medium ${isDarkMode ? "text-white" : "text-black"}`}
              >
                {product.name}
              </Text>
              <Text
                className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
              >
                Qty: {product.quantity}
              </Text>
            </View>
          </View>
        ))}

        <TouchableOpacity
          className={`flex-row items-center justify-center mt-2 py-2 border-t ${isDarkMode ? "border-gray-800" : "border-gray-100"}`}
          onPress={() => handleOrderPress(item.id)}
        >
          <Text className="text-blue-600 font-medium">View Details</Text>
          <ChevronRight size={16} color="#2563eb" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
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
          My Orders
        </Text>
      </View>

      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 12 }}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center p-4">
            <Package size={60} color={isDarkMode ? "#4b5563" : "#d1d5db"} />
            <Text
              className={`text-lg font-medium mt-4 text-center ${isDarkMode ? "text-white" : "text-black"}`}
            >
              No Orders Yet
            </Text>
            <Text
              className={`${isDarkMode ? "text-gray-400" : "text-gray-500"} text-center mt-2`}
            >
              You haven't placed any orders yet.
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
