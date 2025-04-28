import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import {
  Trash2,
  Plus,
  Minus,
  ChevronRight,
  ShoppingBag,
} from "lucide-react-native";
import Header from "../../components/Header";
import BottomNavbar from "../../components/BottomNavbar";
import { useTheme } from "../../context/ThemeContext";

// Mock cart data
const initialCartItems = [
  {
    id: "1",
    name: "Wireless Headphones with Active Noise Cancellation",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80",
    price: 1299,
    originalPrice: 2499,
    discount: 48,
    quantity: 1,
    seller: "AudioTech",
  },
  {
    id: "2",
    name: "Smart Watch with Health Monitoring",
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&q=80",
    price: 2499,
    originalPrice: 3999,
    discount: 38,
    quantity: 2,
    seller: "SmartGear",
  },
];

export default function CartScreen() {
  const router = useRouter();
  const theme = useTheme();
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  // Calculate cart totals
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const discount = cartItems.reduce(
    (total, item) => total + (item.originalPrice - item.price) * item.quantity,
    0,
  );
  const deliveryFee = subtotal > 0 ? 40 : 0;
  const couponDiscount = couponApplied ? 100 : 0;
  const total = subtotal + deliveryFee - couponDiscount;

  const handleQuantityChange = (
    id: string,
    action: "increase" | "decrease",
  ) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          if (action === "increase") {
            return { ...item, quantity: item.quantity + 1 };
          } else if (action === "decrease" && item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          }
        }
        return item;
      }),
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleProductPress = (id: string) => {
    router.push(`/product/${id}`);
  };

  const handleApplyCoupon = () => {
    if (couponCode.toLowerCase() === "zalekart100") {
      setCouponApplied(true);
    }
  };

  const handleCheckout = () => {
    // Navigate to checkout
    router.push("/cart/checkout");
  };

  return (
    <View className="flex-1 bg-gray-100">
      <Header notificationCount={3} />

      <View className="flex-1">
        {cartItems.length > 0 ? (
          <>
            <ScrollView className="flex-1">
              {/* Cart Items */}
              <View className="bg-white p-4 mb-2">
                <Text className="text-lg font-bold mb-4 text-black">
                  My Cart ({cartItems.length})
                </Text>

                {cartItems.map((item) => (
                  <View
                    key={item.id}
                    className="border-b border-gray-100 py-3"
                  >
                    <View className="flex-row">
                      <TouchableOpacity
                        onPress={() => handleProductPress(item.id)}
                      >
                        <Image
                          source={{ uri: item.image }}
                          className="w-20 h-20 rounded-md"
                          contentFit="cover"
                        />
                      </TouchableOpacity>

                      <View className="ml-3 flex-1">
                        <TouchableOpacity
                          onPress={() => handleProductPress(item.id)}
                        >
                          <Text
                            className={`font-medium text-black`}
                            numberOfLines={2}
                          >
                            {item.name}
                          </Text>
                        </TouchableOpacity>
                        <Text
                          className={`text-xs text-gray-500 mt-1`}
                        >
                          Seller: {item.seller}
                        </Text>

                        <View className="flex-row items-center mt-1">
                          <Text
                            className={`font-bold text-black`}
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

                        <View className="flex-row items-center justify-between mt-2">
                          <View
                            className={`flex-row items-center border border-gray-300 rounded-md`}
                          >
                            <TouchableOpacity
                              className="p-1"
                              onPress={() =>
                                handleQuantityChange(item.id, "decrease")
                              }
                              disabled={item.quantity <= 1}
                            >
                              <Minus
                                size={14}
                                color={
                                  item.quantity <= 1
                                    ? "#d1d5db"
                                    : "#000"
                                }
                              />
                            </TouchableOpacity>
                            <Text
                              className={`px-2 py-0.5 text-center min-w-[30px] text-black`}
                            >
                              {item.quantity}
                            </Text>
                            <TouchableOpacity
                              className="p-1"
                              onPress={() =>
                                handleQuantityChange(item.id, "increase")
                              }
                            >
                              <Plus
                                size={14}
                                color="#000"
                              />
                            </TouchableOpacity>
                          </View>

                          <TouchableOpacity
                            onPress={() => handleRemoveItem(item.id)}
                          >
                            <Trash2 size={18} color="#ef4444" />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
              </View>

              {/* Coupon Section */}
              <View className="bg-white p-4 mb-2">
                <View className="flex-row items-center justify-between">
                  <Text className="font-medium text-black">
                    Apply Coupon
                  </Text>
                  <TouchableOpacity
                    className="bg-blue-600 px-3 py-1 rounded"
                    onPress={handleApplyCoupon}
                  >
                    <Text className="text-white">Apply</Text>
                  </TouchableOpacity>
                </View>

                {couponApplied && (
                  <View className="mt-2 p-2 bg-green-50 rounded border border-green-200">
                    <Text className="text-green-700">
                      Coupon ZALEKART100 applied successfully!
                    </Text>
                  </View>
                )}

                <Text className="text-xs text-gray-500 mt-2">
                  Try coupon code: ZALEKART100
                </Text>
              </View>

              {/* Price Details */}
              <View className="bg-white p-4 mb-4">
                <Text className="text-lg font-bold mb-3 text-black">
                  Price Details
                </Text>

                <View className="flex-row justify-between py-1">
                  <Text className="text-gray-600">
                    Price ({cartItems.length} items)
                  </Text>
                  <Text className="text-black">
                    ₹{subtotal + discount}
                  </Text>
                </View>

                <View className="flex-row justify-between py-1">
                  <Text className="text-gray-600">
                    Discount
                  </Text>
                  <Text className="text-green-600">- ₹{discount}</Text>
                </View>

                <View className="flex-row justify-between py-1">
                  <Text className="text-gray-600">
                    Delivery Fee
                  </Text>
                  <Text className="text-black">
                    {deliveryFee > 0 ? `₹${deliveryFee}` : "FREE"}
                  </Text>
                </View>

                {couponApplied && (
                  <View className="flex-row justify-between py-1">
                    <Text className="text-gray-600">
                      Coupon Discount
                    </Text>
                    <Text className="text-green-600">- ₹{couponDiscount}</Text>
                  </View>
                )}

                <View className="flex-row justify-between py-2 mt-2 border-t border-gray-200">
                  <Text className="font-bold text-black">
                    Total Amount
                  </Text>
                  <Text className="font-bold text-black">
                    ₹{total}
                  </Text>
                </View>

                <Text className="text-green-600 font-medium mt-2">
                  You will save ₹{discount + couponDiscount} on this order
                </Text>
              </View>
            </ScrollView>

            {/* Checkout Button */}
            <View className="bg-white p-4 border-t border-gray-200">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-gray-500">
                  Total:
                </Text>
                <Text className="text-xl font-bold text-black">
                  ₹{total}
                </Text>
              </View>
              <TouchableOpacity
                className="bg-orange-500 py-3 rounded-md items-center"
                onPress={handleCheckout}
              >
                <Text className="text-white font-bold">
                  PROCEED TO CHECKOUT
                </Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View className="flex-1 items-center justify-center p-4">
            <ShoppingBag size={64} color="#d1d5db" />
            <Text className="text-lg font-medium mt-4 text-gray-800">
              Your cart is empty
            </Text>
            <Text className="mt-2 text-center text-gray-500">
              Looks like you haven't added any items to your cart yet.
            </Text>
            <TouchableOpacity
              className="mt-6 bg-blue-500 px-6 py-3 rounded-full"
              onPress={() => router.push("/")}
            >
              <Text className="text-white font-medium">Shop Now</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <BottomNavbar />
    </View>
  );
}
