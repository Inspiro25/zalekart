import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import {
  BarChart3,
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  ChevronRight,
  Plus,
  Settings,
  Bell,
  Search,
  Calendar,
  ArrowLeft,
} from "lucide-react-native";

// Mock data for seller dashboard
const sellerData = {
  id: "101",
  name: "AudioTech",
  logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=audiotech",
  stats: {
    revenue: 125000,
    orders: 78,
    products: 12,
    customers: 65,
  },
  recentOrders: [
    {
      id: "ORD001",
      date: "2023-06-15",
      customer: "Rahul Sharma",
      amount: 1299,
      status: "Delivered",
      items: 1,
    },
    {
      id: "ORD002",
      date: "2023-06-14",
      customer: "Priya Patel",
      amount: 2499,
      status: "Shipped",
      items: 2,
    },
    {
      id: "ORD003",
      date: "2023-06-13",
      customer: "Amit Kumar",
      amount: 999,
      status: "Processing",
      items: 1,
    },
    {
      id: "ORD004",
      date: "2023-06-12",
      customer: "Neha Singh",
      amount: 3499,
      status: "Delivered",
      items: 3,
    },
  ],
  topProducts: [
    {
      id: "1",
      name: "Wireless Headphones",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80",
      sold: 42,
      revenue: 54558,
    },
    {
      id: "3",
      name: "Bluetooth Speaker",
      image:
        "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=300&q=80",
      sold: 28,
      revenue: 27972,
    },
    {
      id: "6",
      name: "Wireless Earbuds",
      image:
        "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=300&q=80",
      sold: 35,
      revenue: 31465,
    },
  ],
};

// Tab options for the dashboard
const tabs = [
  { id: "overview", label: "Overview" },
  { id: "orders", label: "Orders" },
  { id: "products", label: "Products" },
  { id: "analytics", label: "Analytics" },
];

export default function SellerDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState("This Week");

  const handleAddProduct = () => {
    // To be implemented
    console.log("Add product");
  };

  const handleOrderPress = (orderId: string) => {
    // To be implemented
    console.log("Order pressed:", orderId);
  };

  const handleProductPress = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  const handleGoBack = () => {
    router.push("/");
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <>
            {/* Date Range Selector */}
            <View className="flex-row items-center justify-between bg-white p-4 rounded-lg shadow-sm mb-4">
              <Text className="text-base font-medium">Performance</Text>
              <TouchableOpacity className="flex-row items-center">
                <Calendar size={16} color="#4b5563" />
                <Text className="ml-1 text-gray-600">{dateRange}</Text>
                <ChevronRight size={16} color="#4b5563" />
              </TouchableOpacity>
            </View>

            {/* Stats Cards */}
            <View className="flex-row flex-wrap justify-between">
              <View className="w-[48%] bg-white rounded-lg p-4 mb-4 shadow-sm">
                <View className="bg-blue-100 p-2 rounded-full w-10 h-10 items-center justify-center mb-2">
                  <TrendingUp size={20} color="#3b82f6" />
                </View>
                <Text className="text-gray-500 text-sm">Revenue</Text>
                <Text className="text-lg font-bold">
                  ₹{sellerData.stats.revenue.toLocaleString()}
                </Text>
              </View>

              <View className="w-[48%] bg-white rounded-lg p-4 mb-4 shadow-sm">
                <View className="bg-green-100 p-2 rounded-full w-10 h-10 items-center justify-center mb-2">
                  <ShoppingCart size={20} color="#10b981" />
                </View>
                <Text className="text-gray-500 text-sm">Orders</Text>
                <Text className="text-lg font-bold">
                  {sellerData.stats.orders}
                </Text>
              </View>

              <View className="w-[48%] bg-white rounded-lg p-4 mb-4 shadow-sm">
                <View className="bg-purple-100 p-2 rounded-full w-10 h-10 items-center justify-center mb-2">
                  <Package size={20} color="#8b5cf6" />
                </View>
                <Text className="text-gray-500 text-sm">Products</Text>
                <Text className="text-lg font-bold">
                  {sellerData.stats.products}
                </Text>
              </View>

              <View className="w-[48%] bg-white rounded-lg p-4 mb-4 shadow-sm">
                <View className="bg-orange-100 p-2 rounded-full w-10 h-10 items-center justify-center mb-2">
                  <Users size={20} color="#f59e0b" />
                </View>
                <Text className="text-gray-500 text-sm">Customers</Text>
                <Text className="text-lg font-bold">
                  {sellerData.stats.customers}
                </Text>
              </View>
            </View>

            {/* Recent Orders */}
            <View className="bg-white rounded-lg p-4 mb-4 shadow-sm">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-lg font-bold">Recent Orders</Text>
                <TouchableOpacity onPress={() => setActiveTab("orders")}>
                  <Text className="text-blue-600">View All</Text>
                </TouchableOpacity>
              </View>

              {sellerData.recentOrders.map((order) => (
                <TouchableOpacity
                  key={order.id}
                  className="flex-row justify-between items-center py-3 border-b border-gray-100"
                  onPress={() => handleOrderPress(order.id)}
                >
                  <View>
                    <Text className="font-medium">{order.id}</Text>
                    <Text className="text-sm text-gray-500">
                      {order.customer}
                    </Text>
                  </View>
                  <View>
                    <Text className="font-medium text-right">
                      ₹{order.amount}
                    </Text>
                    <View className="flex-row items-center justify-end">
                      <View
                        className={`w-2 h-2 rounded-full mr-1 ${order.status === "Delivered" ? "bg-green-500" : order.status === "Shipped" ? "bg-blue-500" : "bg-orange-500"}`}
                      />
                      <Text className="text-xs text-gray-500">
                        {order.status}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {/* Top Products */}
            <View className="bg-white rounded-lg p-4 mb-4 shadow-sm">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-lg font-bold">Top Products</Text>
                <TouchableOpacity onPress={() => setActiveTab("products")}>
                  <Text className="text-blue-600">View All</Text>
                </TouchableOpacity>
              </View>

              {sellerData.topProducts.map((product) => (
                <TouchableOpacity
                  key={product.id}
                  className="flex-row items-center py-3 border-b border-gray-100"
                  onPress={() => handleProductPress(product.id)}
                >
                  <Image
                    source={{ uri: product.image }}
                    className="w-12 h-12 rounded-md"
                    contentFit="cover"
                  />
                  <View className="flex-1 ml-3">
                    <Text className="font-medium" numberOfLines={1}>
                      {product.name}
                    </Text>
                    <Text className="text-sm text-gray-500">
                      {product.sold} sold
                    </Text>
                  </View>
                  <Text className="font-medium">
                    ₹{product.revenue.toLocaleString()}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        );
      case "orders":
        return (
          <>
            {/* Search and Filter */}
            <View className="bg-white p-4 rounded-lg shadow-sm mb-4">
              <View className="flex-row items-center bg-gray-100 rounded-md px-3 py-2 mb-3">
                <Search size={18} color="#9ca3af" />
                <TextInput
                  placeholder="Search orders..."
                  className="ml-2 flex-1"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </View>

              <View className="flex-row justify-between">
                <TouchableOpacity className="bg-gray-100 px-3 py-1 rounded-full">
                  <Text className="text-gray-700">All Orders</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-gray-100 px-3 py-1 rounded-full">
                  <Text className="text-gray-700">Processing</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-gray-100 px-3 py-1 rounded-full">
                  <Text className="text-gray-700">Shipped</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-gray-100 px-3 py-1 rounded-full">
                  <Text className="text-gray-700">Delivered</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Orders List */}
            <View className="bg-white rounded-lg p-4 shadow-sm">
              <Text className="text-lg font-bold mb-3">All Orders</Text>

              {sellerData.recentOrders.map((order) => (
                <TouchableOpacity
                  key={order.id}
                  className="border border-gray-200 rounded-lg p-3 mb-3"
                  onPress={() => handleOrderPress(order.id)}
                >
                  <View className="flex-row justify-between items-center mb-2">
                    <Text className="font-bold">{order.id}</Text>
                    <View
                      className={`px-2 py-0.5 rounded ${order.status === "Delivered" ? "bg-green-100" : order.status === "Shipped" ? "bg-blue-100" : "bg-orange-100"}`}
                    >
                      <Text
                        className={`text-xs font-medium ${order.status === "Delivered" ? "text-green-700" : order.status === "Shipped" ? "text-blue-700" : "text-orange-700"}`}
                      >
                        {order.status}
                      </Text>
                    </View>
                  </View>

                  <View className="flex-row justify-between items-center">
                    <View>
                      <Text className="text-gray-500">{order.date}</Text>
                      <Text className="font-medium">{order.customer}</Text>
                      <Text className="text-sm text-gray-500">
                        {order.items} {order.items > 1 ? "items" : "item"}
                      </Text>
                    </View>
                    <View>
                      <Text className="text-lg font-bold">₹{order.amount}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </>
        );
      case "products":
        return (
          <>
            {/* Search and Filter */}
            <View className="bg-white p-4 rounded-lg shadow-sm mb-4">
              <View className="flex-row items-center bg-gray-100 rounded-md px-3 py-2">
                <Search size={18} color="#9ca3af" />
                <TextInput
                  placeholder="Search products..."
                  className="ml-2 flex-1"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </View>
            </View>

            {/* Products List */}
            <View className="bg-white rounded-lg p-4 shadow-sm">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-lg font-bold">
                  All Products ({sellerData.topProducts.length})
                </Text>
                <TouchableOpacity className="bg-blue-600 px-3 py-1 rounded">
                  <Text className="text-white">Add New</Text>
                </TouchableOpacity>
              </View>

              {sellerData.topProducts.map((product) => (
                <TouchableOpacity
                  key={product.id}
                  className="flex-row items-center border-b border-gray-100 py-3"
                  onPress={() => handleProductPress(product.id)}
                >
                  <Image
                    source={{ uri: product.image }}
                    className="w-16 h-16 rounded-md"
                    contentFit="cover"
                  />
                  <View className="flex-1 ml-3">
                    <Text className="font-medium" numberOfLines={2}>
                      {product.name}
                    </Text>
                    <View className="flex-row items-center mt-1">
                      <Text className="text-sm text-gray-500">Stock: 42</Text>
                      <Text className="text-sm text-gray-500 ml-3">
                        Sold: {product.sold}
                      </Text>
                    </View>
                    <Text className="font-bold mt-1">
                      ₹{(product.revenue / product.sold).toFixed(0)}
                    </Text>
                  </View>
                  <TouchableOpacity className="p-2">
                    <Settings size={18} color="#6b7280" />
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
            </View>
          </>
        );
      case "analytics":
        return (
          <View className="bg-white rounded-lg p-6 shadow-sm items-center justify-center">
            <BarChart3 size={60} color="#d1d5db" />
            <Text className="text-lg font-medium mt-4 text-center">
              Analytics Dashboard
            </Text>
            <Text className="text-gray-500 text-center mt-2">
              Detailed analytics and reporting features will be available soon.
            </Text>
            <TouchableOpacity className="mt-4 bg-blue-600 px-4 py-2 rounded">
              <Text className="text-white font-medium">
                Request Early Access
              </Text>
            </TouchableOpacity>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="bg-blue-600 p-4">
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            <TouchableOpacity onPress={handleGoBack} className="mr-2">
              <ArrowLeft size={24} color="white" />
            </TouchableOpacity>
            <Image
              source={{ uri: sellerData.logo }}
              className="w-10 h-10 rounded-full bg-white"
              contentFit="cover"
            />
            <Text className="text-white font-bold text-lg ml-2">
              {sellerData.name} Dashboard
            </Text>
          </View>
          <View className="flex-row">
            <TouchableOpacity className="mr-4">
              <Bell size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Settings size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Tabs */}
      <View className="flex-row bg-white border-b border-gray-200">
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            className={`flex-1 py-3 ${activeTab === tab.id ? "border-b-2 border-blue-600" : ""}`}
            onPress={() => setActiveTab(tab.id)}
          >
            <Text
              className={`text-center ${activeTab === tab.id ? "text-blue-600 font-medium" : "text-gray-500"}`}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <ScrollView className="flex-1 p-4">{renderTabContent()}</ScrollView>

      {/* Add Product FAB */}
      <TouchableOpacity
        className="absolute bottom-6 right-6 bg-blue-600 w-14 h-14 rounded-full items-center justify-center shadow-lg"
        onPress={handleAddProduct}
      >
        <Plus size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}
