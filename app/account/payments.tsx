import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import { useRouter } from "expo-router";
import {
  ArrowLeft,
  CreditCard,
  Plus,
  Edit2,
  Trash2,
  X,
  Check,
} from "lucide-react-native";
import Header from "../../components/Header";
import BottomNavbar from "../../components/BottomNavbar";
import { useTheme } from "../../context/ThemeContext";

// Mock saved cards data
const initialCards = [
  {
    id: "1",
    cardNumber: "**** **** **** 1234",
    cardHolder: "Rahul Sharma",
    expiryDate: "12/25",
    cardType: "VISA",
    isDefault: true,
  },
  {
    id: "2",
    cardNumber: "**** **** **** 5678",
    cardHolder: "Rahul Sharma",
    expiryDate: "09/24",
    cardType: "Mastercard",
    isDefault: false,
  },
];

export default function PaymentsScreen() {
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const [cards, setCards] = useState(initialCards);
  const [showCardForm, setShowCardForm] = useState(false);
  const [currentCard, setCurrentCard] = useState<(typeof cards)[0] | null>(
    null,
  );

  const handleGoBack = () => {
    router.back();
  };

  const handleAddCard = () => {
    setCurrentCard(null);
    setShowCardForm(true);
  };

  const handleEditCard = (card: (typeof cards)[0]) => {
    setCurrentCard(card);
    setShowCardForm(true);
  };

  const handleDeleteCard = (id: string) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  const handleSetDefault = (id: string) => {
    setCards(
      cards.map((card) => ({
        ...card,
        isDefault: card.id === id,
      })),
    );
  };

  const handleSaveCard = () => {
    // In a real app, this would save to backend
    setShowCardForm(false);
  };

  const getCardLogo = (cardType: string) => {
    return cardType.toLowerCase() === "visa" ? "💳 VISA" : "💳 MC";
  };

  return (
    <View className={`flex-1 ${isDarkMode ? "bg-gray-900" : "bg-gray-100"}`}>
      <Header showSearch={false} />

      <View
        className={`p-4 ${isDarkMode ? "bg-black" : "bg-white"} border-b ${isDarkMode ? "border-gray-800" : "border-gray-200"} flex-row items-center justify-between`}
      >
        <View className="flex-row items-center">
          <TouchableOpacity onPress={handleGoBack} className="mr-3">
            <ArrowLeft size={24} color={isDarkMode ? "#fff" : "#000"} />
          </TouchableOpacity>
          <Text
            className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-black"}`}
          >
            Saved Cards
          </Text>
        </View>
        <TouchableOpacity
          className="bg-blue-600 p-2 rounded-full"
          onPress={handleAddCard}
        >
          <Plus size={20} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 p-4">
        {cards.length > 0 ? (
          cards.map((card) => (
            <View
              key={card.id}
              className={`${isDarkMode ? "bg-black" : "bg-white"} mb-4 rounded-lg overflow-hidden`}
            >
              <View className="p-4 bg-gradient-to-r from-blue-500 to-purple-500">
                <View className="flex-row justify-between items-start">
                  <Text className="text-white font-bold text-lg">
                    {getCardLogo(card.cardType)}
                  </Text>
                  <View className="flex-row">
                    <TouchableOpacity
                      className="p-1 bg-white bg-opacity-20 rounded mr-2"
                      onPress={() => handleEditCard(card)}
                    >
                      <Edit2 size={16} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="p-1 bg-white bg-opacity-20 rounded"
                      onPress={() => handleDeleteCard(card.id)}
                    >
                      <Trash2 size={16} color="white" />
                    </TouchableOpacity>
                  </View>
                </View>

                <Text className="text-white text-lg mt-4">
                  {card.cardNumber}
                </Text>

                <View className="flex-row justify-between mt-4">
                  <View>
                    <Text className="text-white text-xs opacity-70">
                      CARD HOLDER
                    </Text>
                    <Text className="text-white">{card.cardHolder}</Text>
                  </View>
                  <View>
                    <Text className="text-white text-xs opacity-70">
                      EXPIRES
                    </Text>
                    <Text className="text-white">{card.expiryDate}</Text>
                  </View>
                </View>
              </View>

              {!card.isDefault ? (
                <TouchableOpacity
                  className="py-3 border-t border-gray-100 items-center"
                  onPress={() => handleSetDefault(card.id)}
                >
                  <Text className="text-blue-600 font-medium">
                    Set as Default
                  </Text>
                </TouchableOpacity>
              ) : (
                <View className="py-3 border-t border-gray-100 flex-row items-center justify-center bg-blue-50">
                  <Check size={16} color="#2563eb" />
                  <Text className="text-blue-600 font-medium ml-1">
                    Default Payment Method
                  </Text>
                </View>
              )}
            </View>
          ))
        ) : (
          <View className="flex-1 items-center justify-center p-4 mt-10">
            <CreditCard size={60} color={isDarkMode ? "#4b5563" : "#d1d5db"} />
            <Text
              className={`text-lg font-medium mt-4 text-center ${isDarkMode ? "text-white" : "text-black"}`}
            >
              No Cards Saved
            </Text>
            <Text
              className={`${isDarkMode ? "text-gray-400" : "text-gray-500"} text-center mt-2`}
            >
              Add a payment method to make checkout faster.
            </Text>
            <TouchableOpacity
              className="mt-4 bg-blue-600 px-4 py-2 rounded-md"
              onPress={handleAddCard}
            >
              <Text className="text-white font-medium">Add New Card</Text>
            </TouchableOpacity>
          </View>
        )}

        <View
          className={`mt-4 ${isDarkMode ? "bg-black" : "bg-white"} rounded-lg p-4`}
        >
          <Text
            className={`font-bold mb-3 ${isDarkMode ? "text-white" : "text-black"}`}
          >
            Other Payment Methods
          </Text>

          <TouchableOpacity
            className={`flex-row items-center py-3 border-b ${isDarkMode ? "border-gray-800" : "border-gray-100"}`}
          >
            <View className="w-10 h-10 rounded-full bg-green-100 items-center justify-center">
              <Text className="text-lg">₹</Text>
            </View>
            <Text
              className={`ml-3 font-medium ${isDarkMode ? "text-white" : "text-black"}`}
            >
              UPI
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`flex-row items-center py-3 border-b ${isDarkMode ? "border-gray-800" : "border-gray-100"}`}
          >
            <View className="w-10 h-10 rounded-full bg-blue-100 items-center justify-center">
              <Text className="text-lg">🏦</Text>
            </View>
            <Text
              className={`ml-3 font-medium ${isDarkMode ? "text-white" : "text-black"}`}
            >
              Net Banking
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center py-3">
            <View className="w-10 h-10 rounded-full bg-orange-100 items-center justify-center">
              <Text className="text-lg">📦</Text>
            </View>
            <Text
              className={`ml-3 font-medium ${isDarkMode ? "text-white" : "text-black"}`}
            >
              Cash on Delivery
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Card Form Modal */}
      <Modal visible={showCardForm} animationType="slide" transparent={true}>
        <View className="flex-1 bg-black bg-opacity-50">
          <View
            className={`mt-20 ${isDarkMode ? "bg-black" : "bg-white"} rounded-t-xl h-full`}
          >
            <View
              className={`p-4 border-b ${isDarkMode ? "border-gray-800" : "border-gray-200"} flex-row justify-between items-center`}
            >
              <Text
                className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-black"}`}
              >
                {currentCard ? "Edit Card" : "Add New Card"}
              </Text>
              <TouchableOpacity onPress={() => setShowCardForm(false)}>
                <X size={24} color={isDarkMode ? "#fff" : "#000"} />
              </TouchableOpacity>
            </View>

            <ScrollView className="p-4">
              <View className="mb-4">
                <Text
                  className={`${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-1`}
                >
                  Card Number
                </Text>
                <TextInput
                  className={`border ${isDarkMode ? "border-gray-700 bg-gray-800 text-white" : "border-gray-300 bg-white text-black"} rounded-md px-3 py-2`}
                  placeholder="1234 5678 9012 3456"
                  placeholderTextColor={isDarkMode ? "#9ca3af" : "#9ca3af"}
                  keyboardType="number-pad"
                  maxLength={19}
                  defaultValue={currentCard?.cardNumber.replace(/\*/g, "")}
                />
              </View>

              <View className="mb-4">
                <Text
                  className={`${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-1`}
                >
                  Card Holder Name
                </Text>
                <TextInput
                  className={`border ${isDarkMode ? "border-gray-700 bg-gray-800 text-white" : "border-gray-300 bg-white text-black"} rounded-md px-3 py-2`}
                  placeholder="Name as on card"
                  placeholderTextColor={isDarkMode ? "#9ca3af" : "#9ca3af"}
                  defaultValue={currentCard?.cardHolder}
                />
              </View>

              <View className="flex-row mb-4">
                <View className="flex-1 mr-2">
                  <Text
                    className={`${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-1`}
                  >
                    Expiry Date
                  </Text>
                  <TextInput
                    className={`border ${isDarkMode ? "border-gray-700 bg-gray-800 text-white" : "border-gray-300 bg-white text-black"} rounded-md px-3 py-2`}
                    placeholder="MM/YY"
                    placeholderTextColor={isDarkMode ? "#9ca3af" : "#9ca3af"}
                    maxLength={5}
                    defaultValue={currentCard?.expiryDate}
                  />
                </View>
                <View className="flex-1 ml-2">
                  <Text
                    className={`${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-1`}
                  >
                    CVV
                  </Text>
                  <TextInput
                    className={`border ${isDarkMode ? "border-gray-700 bg-gray-800 text-white" : "border-gray-300 bg-white text-black"} rounded-md px-3 py-2`}
                    placeholder="123"
                    placeholderTextColor={isDarkMode ? "#9ca3af" : "#9ca3af"}
                    keyboardType="number-pad"
                    maxLength={3}
                    secureTextEntry
                  />
                </View>
              </View>

              <View className="mb-4 flex-row items-center">
                <View className="w-5 h-5 rounded border border-blue-600 items-center justify-center">
                  {(currentCard?.isDefault || !currentCard) && (
                    <View className="w-3 h-3 bg-blue-600" />
                  )}
                </View>
                <Text
                  className={`ml-2 ${isDarkMode ? "text-white" : "text-black"}`}
                >
                  Save as default payment method
                </Text>
              </View>

              <TouchableOpacity
                className="bg-blue-600 py-3 rounded-md items-center mt-4"
                onPress={handleSaveCard}
              >
                <Text className="text-white font-bold">SAVE CARD</Text>
              </TouchableOpacity>

              <Text
                className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"} text-center mt-4`}
              >
                Your card information is secure and encrypted. We do not store
                your CVV. By saving your card, you agree to our Terms and
                Conditions.
              </Text>
            </ScrollView>
          </View>
        </View>
      </Modal>

      <BottomNavbar />
    </View>
  );
}
