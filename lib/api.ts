import { supabase } from "./supabase";

// Products API
export async function getProducts(limit = 10, category?: string) {
  let query = supabase
    .from("products")
    .select("*, shops:seller_id(*)")
    .limit(limit);

  if (category) {
    query = query.eq("category_id", category);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }

  return data;
}

export async function getProductById(id: string) {
  const { data, error } = await supabase
    .from("products")
    .select("*, shops:seller_id(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching product:", error);
    return null;
  }

  return data;
}

// Categories API
export async function getCategories() {
  const { data, error } = await supabase.from("categories").select("*");

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }

  return data;
}

// Shops API
export async function getShops(limit = 10) {
  const { data, error } = await supabase.from("shops").select("*").limit(limit);

  if (error) {
    console.error("Error fetching shops:", error);
    return [];
  }

  return data;
}

export async function getShopById(id: string) {
  const { data, error } = await supabase
    .from("shops")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching shop:", error);
    return null;
  }

  return data;
}

// Banners API
export async function getBanners() {
  const { data, error } = await supabase.from("banners").select("*");

  if (error) {
    console.error("Error fetching banners:", error);
    return [];
  }

  return data;
}

// Cart API
export async function getCartItems(userId: string) {
  const { data, error } = await supabase
    .from("cart_items")
    .select("*, products:product_id(*)")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching cart items:", error);
    return [];
  }

  return data;
}

export async function addToCart(
  userId: string,
  productId: string,
  quantity = 1,
) {
  // Check if item already exists in cart
  const { data: existingItem } = await supabase
    .from("cart_items")
    .select("*")
    .eq("user_id", userId)
    .eq("product_id", productId)
    .single();

  if (existingItem) {
    // Update quantity if item exists
    const { error } = await supabase
      .from("cart_items")
      .update({
        quantity: existingItem.quantity + quantity,
        updated_at: new Date().toISOString(),
      })
      .eq("id", existingItem.id);

    if (error) {
      console.error("Error updating cart item:", error);
      return false;
    }
  } else {
    // Add new item to cart
    const { error } = await supabase.from("cart_items").insert([
      {
        user_id: userId,
        product_id: productId,
        quantity,
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error("Error adding item to cart:", error);
      return false;
    }
  }

  return true;
}

export async function updateCartItemQuantity(
  cartItemId: string,
  quantity: number,
) {
  const { error } = await supabase
    .from("cart_items")
    .update({ quantity, updated_at: new Date().toISOString() })
    .eq("id", cartItemId);

  if (error) {
    console.error("Error updating cart item quantity:", error);
    return false;
  }

  return true;
}

export async function removeFromCart(cartItemId: string) {
  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("id", cartItemId);

  if (error) {
    console.error("Error removing item from cart:", error);
    return false;
  }

  return true;
}

// Wishlist API
export async function getWishlistItems(userId: string) {
  const { data, error } = await supabase
    .from("wishlist_items")
    .select("*, products:product_id(*)")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching wishlist items:", error);
    return [];
  }

  return data;
}

export async function addToWishlist(userId: string, productId: string) {
  // Check if item already exists in wishlist
  const { data: existingItem } = await supabase
    .from("wishlist_items")
    .select("*")
    .eq("user_id", userId)
    .eq("product_id", productId)
    .single();

  if (existingItem) {
    return true; // Item already in wishlist
  }

  const { error } = await supabase.from("wishlist_items").insert([
    {
      user_id: userId,
      product_id: productId,
      created_at: new Date().toISOString(),
    },
  ]);

  if (error) {
    console.error("Error adding item to wishlist:", error);
    return false;
  }

  return true;
}

export async function removeFromWishlist(wishlistItemId: string) {
  const { error } = await supabase
    .from("wishlist_items")
    .delete()
    .eq("id", wishlistItemId);

  if (error) {
    console.error("Error removing item from wishlist:", error);
    return false;
  }

  return true;
}

// Address API
export async function getUserAddresses(userId: string) {
  const { data, error } = await supabase
    .from("addresses")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching addresses:", error);
    return [];
  }

  return data;
}

export async function addAddress(address: any) {
  const { error } = await supabase.from("addresses").insert([
    {
      ...address,
      created_at: new Date().toISOString(),
    },
  ]);

  if (error) {
    console.error("Error adding address:", error);
    return false;
  }

  return true;
}

export async function updateAddress(addressId: string, address: any) {
  const { error } = await supabase
    .from("addresses")
    .update({
      ...address,
      updated_at: new Date().toISOString(),
    })
    .eq("id", addressId);

  if (error) {
    console.error("Error updating address:", error);
    return false;
  }

  return true;
}

export async function deleteAddress(addressId: string) {
  const { error } = await supabase
    .from("addresses")
    .delete()
    .eq("id", addressId);

  if (error) {
    console.error("Error deleting address:", error);
    return false;
  }

  return true;
}

// Orders API
export async function createOrder(order: any, orderItems: any[]) {
  // Start a transaction
  const { data: newOrder, error: orderError } = await supabase
    .from("orders")
    .insert([
      {
        ...order,
        created_at: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (orderError || !newOrder) {
    console.error("Error creating order:", orderError);
    return null;
  }

  // Add order items
  const orderItemsWithOrderId = orderItems.map((item) => ({
    ...item,
    order_id: newOrder.id,
    created_at: new Date().toISOString(),
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItemsWithOrderId);

  if (itemsError) {
    console.error("Error adding order items:", itemsError);
    return null;
  }

  // Clear cart after successful order
  const { error: cartError } = await supabase
    .from("cart_items")
    .delete()
    .eq("user_id", order.user_id);

  if (cartError) {
    console.error("Error clearing cart:", cartError);
  }

  return newOrder;
}

export async function getUserOrders(userId: string) {
  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      *,
      addresses:address_id(*),
      order_items(*)
    `,
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching orders:", error);
    return [];
  }

  return data;
}

export async function getOrderById(orderId: string) {
  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      *,
      addresses:address_id(*),
      order_items(*, products:product_id(*))
    `,
    )
    .eq("id", orderId)
    .single();

  if (error) {
    console.error("Error fetching order:", error);
    return null;
  }

  return data;
}
