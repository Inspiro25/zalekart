import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft, MapPin, Plus, Edit2, Trash2, X, Check } from "lucide-react-native";
import Header from "../../components/Header";
import BottomNavbar from "../../components/BottomNavbar";
import { useTheme } from "../../context/ThemeContext";
import { useAddress, AddressType } from "../../context/AddressContext";

export default function AddressesScreen() {
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const { 
    addresses, 
    selectedAddress, 
    defaultAddress,
    addAddress, 
    updateAddress, 
    deleteAddress, 
    setDefaultAddress,
    selectAddress
  } = useAddress();
  
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [currentAddress, setCurrentAddress] = useState<AddressType | null>(null);
  
  // Form state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [type, setType] = useState<"Home" | "Work" | "Other">("Home");
  const [isDefault, setIsDefault] = useState(false);

  const handleGoBack = () => {
    router.back();
  };

  const handleAddAddress = () => {
    setCurrentAddress(null);
    // Reset form fields
    setName("");
    setPhone("");
    setAddressLine1("");
    setAddressLine2("");
    setCity("");
    setState("");
    setPincode("");
    setType("Home");
    setIsDefault(false);
    setShowAddressForm(true);
  };

  const handleEditAddress = (address: AddressType) => {
    setCurrentAddress(address);
    
    // Populate form fields
    setName(address.name);
    setPhone(address.phone);
    setAddressLine1(address.addressLine1);
    setAddressLine2(address.addressLine2 || "");
    setCity(address.city);
    setState(address.state);
    setPincode(address.pincode);
    setType(address.type);
    setIsDefault(address.isDefault);
    
    setShowAddressForm(true);
  };

  const handleDeleteAddress = (id: string) => {
    Alert.alert(
      "Delete Address",
      "Are you sure you want to delete this address?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: () => deleteAddress(id),
          style: "destructive"
        }
      ]
    );
  };

  const handleSetDefault = (id: string) => {
    setDefaultAddress(id);
  };

  const handleSelectAddress = (id: string) => {
    selectAddress(id);
    // Navigate back after selecting
    router.back();
  };

  const handleSaveAddress = () => {
    // Validate form fields
    if (!name || !phone || !addressLine1 || !city || !state || !pincode) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }
    
    const addressData = {
      name,
      phone,
      addressLine1,
      addressLine2: addressLine2 || undefined,
      city,
      state,
      pincode,
      type,
      isDefault
    };
    
    if (currentAddress) {
      updateAddress(currentAddress.id, addressData);
    } else {
      addAddress(addressData);
    }
    
    setShowAddressForm(false);
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
            My Addresses
          </Text>
        </View>
        <TouchableOpacity
          className="bg-blue-600 p-2 rounded-full"
          onPress={handleAddAddress}
        >
          <Plus size={20} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 p-4">
        {addresses.length > 0 ? (
          addresses.map((address) => (
            <View
              key={address.id}
              className={`${isDarkMode ? "bg-black" : "bg-white"} mb-4 rounded-lg p-4`}
            >
              <View className="flex-row items-start justify-between">
                <View className="flex-row items-start">
                  <MapPin
                    size={20}
                    color={isDarkMode ? "#e5e7eb" : "#4b5563"}
                    className="mt-1"
                  />
                  <View className="ml-2">
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
                          <Text className="text-xs text-green-700">
                            Default
                          </Text>
                        </View>
                      )}
                      {selectedAddress?.id === address.id && (
                        <View className="ml-2 px-2 py-0.5 bg-blue-100 rounded">
                          <Text className="text-xs text-blue-700">
                            Selected
                          </Text>
                        </View>
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
                      {address.addressLine1}
                    </Text>
                    {address.addressLine2 && (
                      <Text
                        className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
                      >
                        {address.addressLine2}
                      </Text>
                    )}
                    <Text
                      className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
                    >
                      {address.city}, {address.state} - {address.pincode}
                    </Text>
                  </View>
                </View>
                <View className="flex-row">
                  <TouchableOpacity
                    className="p-2"
                    onPress={() => handleEditAddress(address)}
                  >
                    <Edit2
                      size={16}
                      color={isDarkMode ? "#e5e7eb" : "#4b5563"}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="p-2"
                    onPress={() => handleDeleteAddress(address.id)}
                  >
                    <Trash2 size={16} color="#ef4444" />
                  </TouchableOpacity>
                </View>
              </View>

              <View className="flex-row mt-3 space-x-2">
                {!address.isDefault && (
                  <TouchableOpacity
                    className="flex-1 border border-blue-600 py-2 rounded items-center"
                    onPress={() => handleSetDefault(address.id)}
                  >
                    <Text className="text-blue-600 font-medium">
                      Set as Default
                    </Text>
                  </TouchableOpacity>
                )}
                
                <TouchableOpacity
                  className="flex-1 bg-blue-600 py-2 rounded items-center"
                  onPress={() => handleSelectAddress(address.id)}
                >
                  <Text className="text-white font-medium">
                    Deliver Here
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <View className="flex-1 items-center justify-center p-4 mt-10">
            <MapPin size={60} color={isDarkMode ? "#4b5563" : "#d1d5db"} />
            <Text
              className={`text-lg font-medium mt-4 text-center ${isDarkMode ? "text-white" : "text-black"}`}
            >
              No Addresses Found
            </Text>
            <Text
              className={`${isDarkMode ? "text-gray-400" : "text-gray-500"} text-center mt-2`}
            >
              Add a delivery address to get started.
            </Text>
            <TouchableOpacity
              className="mt-4 bg-blue-600 px-4 py-2 rounded-md"
              onPress={handleAddAddress}
            >
              <Text className="text-white font-medium">Add New Address</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Address Form Modal */}
      <Modal visible={showAddressForm} animationType="slide" transparent={true}>
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
                {currentAddress ? "Edit Address" : "Add New Address"}
              </Text>
              <TouchableOpacity onPress={() => setShowAddressForm(false)}>
                <X size={24} color={isDarkMode ? "#fff" : "#000"} />
              </TouchableOpacity>
            </View>

            <ScrollView className="p-4">
              <View className="mb-4">
                <Text
                  className={`${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-1`}
                >
                  Full Name
                </Text>
                <TextInput
                  className={`border ${isDarkMode ? "border-gray-700 bg-gray-800 text-white" : "border-gray-300 bg-white text-black"} rounded-md px-3 py-2`}
                  placeholder="Enter your full name"
                  placeholderTextColor={isDarkMode ? "#9ca3af" : "#9ca3af"}
                  value={name}
                  onChangeText={setName}
                />
              </View>

              <View className="mb-4">
                <Text
                  className={`${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-1`}
                >
                  Phone Number
                </Text>
                <TextInput
                  className={`border ${isDarkMode ? "border-gray-700 bg-gray-800 text-white" : "border-gray-300 bg-white text-black"} rounded-md px-3 py-2`}
                  placeholder="Enter your phone number"
                  placeholderTextColor={isDarkMode ? "#9ca3af" : "#9ca3af"}
                  keyboardType="phone-pad"
                  value={phone}
                  onChangeText={setPhone}
                />
              </View>

              <View className="mb-4">
                <Text
                  className={`${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-1`}
                >
                  Address Line 1
                </Text>
                <TextInput
                  className={`border ${isDarkMode ? "border-gray-700 bg-gray-800 text-white" : "border-gray-300 bg-white text-black"} rounded-md px-3 py-2`}
                  placeholder="House No., Building Name"
                  placeholderTextColor={isDarkMode ? "#9ca3af" : "#9ca3af"}
                  value={addressLine1}
                  onChangeText={setAddressLine1}
                />
              </View>

              <View className="mb-4">
                <Text
                  className={`${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-1`}
                >
                  Address Line 2 (Optional)
                </Text>
                <TextInput
                  className={`border ${isDarkMode ? "border-gray-700 bg-gray-800 text-white" : "border-gray-300 bg-white text-black"} rounded-md px-3 py-2`}
                  placeholder="Street, Area"
                  placeholderTextColor={isDarkMode ? "#9ca3af" : "#9ca3af"}
                  value={addressLine2}
                  onChangeText={setAddressLine2}
                />
              </View>

              <View className="mb-4">
                <Text
                  className={`${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-1`}
                >
                  City
                </Text>
                <TextInput
                  className={`border ${isDarkMode ? "border-gray-700 bg-gray-800 text-white" : "border-gray-300 bg-white text-black"} rounded-md px-3 py-2`}
                  placeholder="Enter your city"
                  placeholderTextColor={isDarkMode ? "#9ca3af" : "#9ca3af"}
                  value={city}
                  onChangeText={setCity}
                />
              </View>

              <View className="mb-4">
                <Text
                  className={`${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-1`}
                >
                  State
                </Text>
                <TextInput
                  className={`border ${isDarkMode ? "border-gray-700 bg-gray-800 text-white" : "border-gray-300 bg-white text-black"} rounded-md px-3 py-2`}
                  placeholder="Enter your state"
                  placeholderTextColor={isDarkMode ? "#9ca3af" : "#9ca3af"}
                  value={state}
                  onChangeText={setState}
                />
              </View>

              <View className="mb-4">
                <Text
                  className={`${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-1`}
                >
                  Pincode
                </Text>
                <TextInput
                  className={`border ${isDarkMode ? "border-gray-700 bg-gray-800 text-white" : "border-gray-300 bg-white text-black"} rounded-md px-3 py-2`}
                  placeholder="Enter your pincode"
                  placeholderTextColor={isDarkMode ? "#9ca3af" : "#9ca3af"}
                  keyboardType="numeric"
                  value={pincode}
                  onChangeText={setPincode}
                />
              </View>

              <View className="mb-4">
                <Text
                  className={`${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-1`}
                >
                  Address Type
                </Text>
                <View className="flex-row mt-1">
                  <TouchableOpacity 
                    className="mr-4 flex-row items-center" 
                    onPress={() => setType("Home")}
                  >
                    <View className="w-5 h-5 rounded-full border border-blue-600 items-center justify-center">
                      {type === "Home" && (
                        <View className="w-3 h-3 rounded-full bg-blue-600" />
                      )}
                    </View>
                    <Text
                      className={`ml-2 ${isDarkMode ? "text-white" : "text-black"}`}
                    >
                      Home
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    className="mr-4 flex-row items-center"
                    onPress={() => setType("Work")}
                  >
                    <View className="w-5 h-5 rounded-full border border-blue-600 items-center justify-center">
                      {type === "Work" && (
                        <View className="w-3 h-3 rounded-full bg-blue-600" />
                      )}
                    </View>
                    <Text
                      className={`ml-2 ${isDarkMode ? "text-white" : "text-black"}`}
                    >
                      Work
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    className="flex-row items-center"
                    onPress={() => setType("Other")}
                  >
                    <View className="w-5 h-5 rounded-full border border-blue-600 items-center justify-center">
                      {type === "Other" && (
                        <View className="w-3 h-3 rounded-full bg-blue-600" />
                      )}
                    </View>
                    <Text
                      className={`ml-2 ${isDarkMode ? "text-white" : "text-black"}`}
                    >
                      Other
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity 
                className="mb-4 flex-row items-center"
                onPress={() => setIsDefault(!isDefault)}
              >
                <View className="w-5 h-5 rounded border border-blue-600 items-center justify-center">
                  {isDefault && (
                    <View className="w-3 h-3 bg-blue-600" />
                  )}
                </View>
                <Text
                  className={`ml-2 ${isDarkMode ? "text-white" : "text-black"}`}
                >
                  Make this my default address
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-blue-600 py-3 rounded-md items-center mt-4"
                onPress={handleSaveAddress}
              >
                <Text className="text-white font-bold">SAVE ADDRESS</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      <BottomNavbar />
    </View>
  );
}
