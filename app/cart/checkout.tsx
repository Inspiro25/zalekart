import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import {
  ArrowLeft,
  MapPin,
  CreditCard,
  Truck,
  Shield,
  Check,
} from "lucide-react-native";
import Header from "../../components/Header";
import { useTheme } from "../../context/ThemeContext";

// Mock cart items
const cartItems = [
  {
    id: "1",
    name: "Wireless Headphones with Active Noise Cancellation",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80",
    price: 1299,
    quantity: 1,
    seller: "AudioTech",
  },
  {
    id: "3",
    name: "Bluetooth Speaker Waterproof",
    image:
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=300&q=80",
    price: 999,
    quantity: 2,
    seller: "SoundWave",
  },
];

// Mock addresses
const addresses = [
  {
    id: "1",
    name: "Rahul Sharma",
    phone: "+91 9876543210",
    addressLine1: "Flat 101, Sunshine Apartments",
    addressLine2: "MG Road, Bangalore",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560001",
    isDefault: true,
    type: "Home",
  },
  {
    id: "2",
    name: "Rahul Sharma",
    phone: "+91 9876543210",
    addressLine1: "42, Tech Park",
    addressLine2: "Whitefield",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560066",
    isDefault: false,
    type: "Work",
  },
];

// Mock payment methods
const paymentMethods = [
  { id: "1", type: "CARD", name: "Credit/Debit Card", icon: "💳" },
  { id: "2", type: "UPI", name: "UPI", icon: "₹" },
  { id: "3", type: "NETBANKING", name: "Net Banking", icon: "🏦" },
  { id: "4", type: "COD", name: "Cash on Delivery", icon: "📦" },
];

export default function CheckoutScreen() {
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const [selectedAddress, setSelectedAddress] = useState(addresses[0].id);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const handleGoBack = () => {
    router.back();
  };

  const handleApplyCoupon = () => {
    if (couponCode.trim().toUpperCase() === "SAVE10") {
      setCouponApplied(true);
    } else {
      Alert.alert(
        "Invalid Coupon",
        "The coupon code you entered is invalid or expired.",
      );
      setCouponApplied(false);
    }
  };

  const handlePlaceOrder = () => {
    if (!selectedPayment) {
      Alert.alert(
        "Select Payment Method",
        "Please select a payment method to continue.",
      );
      return;
    }

    // Mock order placement
    Alert.alert(
      "Order Placed Successfully",
      "Your order has been placed successfully. You will receive a confirmation shortly.",
      [{ text: "OK", onPress: () => router.push("/") }],
    );
  };

  // Calculate totals
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const deliveryFee = subtotal > 1000 ? 0 : 40;
  const total = subtotal - discount + deliveryFee;

  return (
    <View className="flex-1 bg-gray-100">
      <Header notificationCount={3} />

      <View
        className={`p-4 ${isDarkMode ? "bg-black" : "bg-white"} border-b ${isDarkMode ? "border-gray-800" : "border-gray-200"} flex-row items-center`}
      >
        <TouchableOpacity onPress={handleGoBack} className="mr-3">
          <ArrowLeft size={24} color={isDarkMode ? "#fff" : "#000"} />
        </TouchableOpacity>
        <Text
          className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-black"}`}
        >
          Checkout
        </Text>
      </View>

      <ScrollView className="flex-1">
        {/* Delivery Address */}
        <View className={`${isDarkMode ? "bg-black" : "bg-white"} p-4 mt-2`}>
          <View className="flex-row items-center mb-3">
            <MapPin size={20} color={isDarkMode ? "#e5e7eb" : "#4b5563"} />
            <Text
              className={`ml-2 font-bold text-lg ${isDarkMode ? "text-white" : "text-black"}`}
            >
              Delivery Address
            </Text>
          </View>

          {addresses.map((address) => (
            <TouchableOpacity
              key={address.id}
              className={`p-3 mb-2 rounded-lg border ${selectedAddress === address.id ? "border-blue-500" : isDarkMode ? "border-gray-800" : "border-gray-200"}`}
              onPress={() => setSelectedAddress(address.id)}
            >
              <View className="flex-row justify-between">
                <View className="flex-row items-center">
                  <Text
                    className={`font-bold ${isDarkMode ? "text-white" : "text-black"}`}
                  >
                    {address.name}
                  </Text>
                  <View
                    className={`ml-2 px-2 py-0.5 ${isDarkMode ? "bg-gray-800" : "bg-gray-100"} rounded`}
                  >
                    <Text
                      className={`text-xs ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                    >
                      {address.type}
                    </Text>
                  </View>
                  {address.isDefault && (
                    <View className="ml-2 px-2 py-0.5 bg-green-100 rounded">
                      <Text className="text-xs text-green-700">Default</Text>
                    </View>
                  )}
                </View>
                {selectedAddress === address.id && (
                  <Check size={20} color="#2563eb" />
                )}
              </View>
              <Text
                className={`${isDarkMode ? "text-gray-300" : "text-gray-600"} mt-1`}
              >
                {address.phone}
              </Text>
              <Text
                className={`${isDarkMode ? "text-gray-300" : "text-gray-600"} mt-1`}
              >
                {address.addressLine1},{" "}
                {address.addressLine2 && `${address.addressLine2}, `}
                {address.city}, {address.state} - {address.pincode}
              </Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            className="mt-2 border border-blue-600 py-2 rounded-lg items-center"
            onPress={() => router.push("/account/addresses")}
          >
            <Text className="text-blue-600 font-medium">ADD NEW ADDRESS</Text>
          </TouchableOpacity>
        </View>

        {/* Order Summary */}
        <View className={`${isDarkMode ? "bg-black" : "bg-white"} p-4 mt-2`}>
          <Text
            className={`font-bold text-lg mb-3 ${isDarkMode ? "text-white" : "text-black"}`}
          >
            Order Summary
          </Text>

          {cartItems.map((item) => (
            <View
              key={item.id}
              className={`flex-row mb-3 pb-3 ${isDarkMode ? "border-b border-gray-800" : "border-b border-gray-200"}`}
            >
              <View className="flex-1">
                <Text
                  numberOfLines={2}
                  className={`font-medium ${isDarkMode ? "text-white" : "text-black"}`}
                >
                  {item.name}
                </Text>
                <Text
                  className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"} mt-1`}
                >
                  Seller: {item.seller}
                </Text>
                <Text
                  className={`font-bold mt-1 ${isDarkMode ? "text-white" : "text-black"}`}
                >
                  ₹{item.price.toLocaleString()}
                </Text>
              </View>
              <Text
                className={`${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
              >
                Qty: {item.quantity}
              </Text>
            </View>
          ))}

          {/* Coupon */}
          <View className="mt-2 mb-4">
            <Text
              className={`font-medium mb-2 ${isDarkMode ? "text-white" : "text-black"}`}
            >
              Apply Coupon
            </Text>
            <View className="flex-row">
              <TextInput
                className={`flex-1 border ${isDarkMode ? "border-gray-700 bg-gray-800 text-white" : "border-gray-300 bg-white text-black"} rounded-l-md px-3 py-2`}
                placeholder="Enter coupon code"
                placeholderTextColor={isDarkMode ? "#9ca3af" : "#9ca3af"}
                value={couponCode}
                onChangeText={setCouponCode}
              />
              <TouchableOpacity
                className="bg-blue-600 rounded-r-md px-4 items-center justify-center"
                onPress={handleApplyCoupon}
              >
                <Text className="text-white font-medium">Apply</Text>
              </TouchableOpacity>
            </View>
            {couponApplied && (
              <Text className="text-green-600 text-sm mt-2">
                Coupon applied successfully! 10% off
              </Text>
            )}
          </View>

          {/* Price Details */}
          <View
            className={`pt-3 ${isDarkMode ? "border-t border-gray-800" : "border-t border-gray-200"}`}
          >
            <Text
              className={`font-bold mb-3 ${isDarkMode ? "text-white" : "text-black"}`}
            >
              Price Details
            </Text>

            <View className="flex-row justify-between mb-2">
              <Text
                className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
              >
                Price ({cartItems.length} items)
              </Text>
              <Text className={`${isDarkMode ? "text-white" : "text-black"}`}>
                ₹{subtotal.toLocaleString()}
              </Text>
            </View>

            <View className="flex-row justify-between mb-2">
              <Text
                className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
              >
                Discount
              </Text>
              <Text className="text-green-600">
                - ₹{discount.toLocaleString()}
              </Text>
            </View>

            <View className="flex-row justify-between mb-2">
              <Text
                className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
              >
                Delivery Fee
              </Text>
              {deliveryFee > 0 ? (
                <Text className={`${isDarkMode ? "text-white" : "text-black"}`}>
                  ₹{deliveryFee}
                </Text>
              ) : (
                <Text className="text-green-600">FREE</Text>
              )}
            </View>

            <View
              className={`flex-row justify-between pt-2 mt-2 ${isDarkMode ? "border-t border-gray-800" : "border-t border-gray-200"}`}
            >
              <Text
                className={`font-bold ${isDarkMode ? "text-white" : "text-black"}`}
              >
                Total Amount
              </Text>
              <Text
                className={`font-bold ${isDarkMode ? "text-white" : "text-black"}`}
              >
                ₹{total.toLocaleString()}
              </Text>
            </View>
          </View>
        </View>

        {/* Payment Methods */}
        <View
          className={`${isDarkMode ? "bg-black" : "bg-white"} p-4 mt-2 mb-24`}
        >
          <View className="flex-row items-center mb-3">
            <CreditCard size={20} color={isDarkMode ? "#e5e7eb" : "#4b5563"} />
            <Text
              className={`ml-2 font-bold text-lg ${isDarkMode ? "text-white" : "text-black"}`}
            >
              Payment Method
            </Text>
          </View>

          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              className={`flex-row items-center p-3 mb-2 rounded-lg border ${selectedPayment === method.id ? "border-blue-500" : isDarkMode ? "border-gray-800" : "border-gray-200"}`}
              onPress={() => setSelectedPayment(method.id)}
            >
              <View className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center mr-3">
                <Text className="text-lg">{method.icon}</Text>
              </View>
              <Text
                className={`flex-1 font-medium ${isDarkMode ? "text-white" : "text-black"}`}
              >
                {method.name}
              </Text>
              {selectedPayment === method.id ? (
                <Check size={20} color="#2563eb" />
              ) : (
                <View className="w-5 h-5 rounded-full border border-gray-400" />
              )}
            </TouchableOpacity>
          ))}

          <View className="flex-row items-center mt-4">
            <Shield size={16} color={isDarkMode ? "#e5e7eb" : "#4b5563"} />
            <Text
              className={`ml-2 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
            >
              Your payment information is secure and encrypted
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Button */}
      <View
        className={`absolute bottom-0 left-0 right-0 ${isDarkMode ? "bg-black" : "bg-white"} p-4 border-t ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}
      >
        <View className="flex-row justify-between items-center mb-3">
          <Text
            className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-black"}`}
          >
            ₹{total.toLocaleString()}
          </Text>
          <TouchableOpacity onPress={() => {}}>
            <Text className="text-blue-600">View Details</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          className="bg-orange-500 py-3 rounded-md items-center"
          onPress={handlePlaceOrder}
        >
          <Text className="text-white font-bold">PLACE ORDER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
