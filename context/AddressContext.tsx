import React, { createContext, useContext, useState, useEffect } from "react";

// Address interface
export interface AddressType {
  id: string;
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
  type: 'Home' | 'Work' | 'Other';
}

// Mock addresses data
const initialAddresses: AddressType[] = [
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

interface AddressContextType {
  addresses: AddressType[];
  selectedAddress: AddressType | null;
  defaultAddress: AddressType | null;
  addAddress: (address: Omit<AddressType, 'id'>) => void;
  updateAddress: (id: string, address: Partial<AddressType>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  selectAddress: (id: string) => void;
}

const AddressContext = createContext<AddressContextType | undefined>(undefined);

export const AddressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [addresses, setAddresses] = useState<AddressType[]>(initialAddresses);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  
  // Initialize selected address with the default address
  useEffect(() => {
    const defaultAddr = addresses.find(addr => addr.isDefault);
    if (defaultAddr && !selectedAddressId) {
      setSelectedAddressId(defaultAddr.id);
    }
  }, []);

  const defaultAddress = addresses.find(addr => addr.isDefault) || null;
  const selectedAddress = selectedAddressId 
    ? addresses.find(addr => addr.id === selectedAddressId) || defaultAddress
    : defaultAddress;

  const addAddress = (address: Omit<AddressType, 'id'>) => {
    const newAddress = {
      ...address,
      id: Date.now().toString(),
    };
    
    // If this is the first address or it's marked as default, update other addresses
    if (address.isDefault || addresses.length === 0) {
      setAddresses(prevAddresses => 
        prevAddresses.map(addr => ({
          ...addr,
          isDefault: false
        })).concat([newAddress])
      );
    } else {
      setAddresses(prevAddresses => [...prevAddresses, newAddress]);
    }
  };

  const updateAddress = (id: string, updatedFields: Partial<AddressType>) => {
    // If updating to make this the default, update other addresses too
    if (updatedFields.isDefault) {
      setAddresses(prevAddresses => 
        prevAddresses.map(addr => ({
          ...addr,
          isDefault: addr.id === id
        }))
      );
    } else {
      setAddresses(prevAddresses => 
        prevAddresses.map(addr => 
          addr.id === id ? { ...addr, ...updatedFields } : addr
        )
      );
    }
  };

  const deleteAddress = (id: string) => {
    const addressToDelete = addresses.find(addr => addr.id === id);
    
    setAddresses(prevAddresses => {
      const filteredAddresses = prevAddresses.filter(addr => addr.id !== id);
      
      // If we're deleting the default address, make another one default
      if (addressToDelete?.isDefault && filteredAddresses.length > 0) {
        filteredAddresses[0].isDefault = true;
      }
      
      return filteredAddresses;
    });
    
    // If the selected address was deleted, select the default
    if (selectedAddressId === id) {
      setSelectedAddressId(null);
    }
  };

  const setDefaultAddress = (id: string) => {
    setAddresses(prevAddresses => 
      prevAddresses.map(addr => ({
        ...addr,
        isDefault: addr.id === id
      }))
    );
  };

  const selectAddress = (id: string) => {
    setSelectedAddressId(id);
  };

  return (
    <AddressContext.Provider 
      value={{
        addresses,
        selectedAddress,
        defaultAddress,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
        selectAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => {
  const context = useContext(AddressContext);
  if (context === undefined) {
    throw new Error('useAddress must be used within an AddressProvider');
  }
  return context;
}; 