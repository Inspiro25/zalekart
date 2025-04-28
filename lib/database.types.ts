export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          phone: string | null;
          full_name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          email: string;
          phone?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          email?: string;
          phone?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string | null;
        };
      };
      shops: {
        Row: {
          id: string;
          name: string;
          logo: string;
          cover_image: string;
          description: string;
          rating: number;
          rating_count: number;
          followers: number;
          location: string;
          product_count: number;
          categories: string[];
          created_at: string;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          logo: string;
          cover_image: string;
          description: string;
          rating?: number;
          rating_count?: number;
          followers?: number;
          location: string;
          product_count?: number;
          categories: string[];
          created_at?: string;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          logo?: string;
          cover_image?: string;
          description?: string;
          rating?: number;
          rating_count?: number;
          followers?: number;
          location?: string;
          product_count?: number;
          categories?: string[];
          created_at?: string;
          updated_at?: string | null;
        };
      };
      products: {
        Row: {
          id: string;
          name: string;
          images: string[];
          price: number;
          original_price: number;
          discount: number;
          rating: number;
          rating_count: number;
          seller_id: string;
          in_stock: boolean;
          description: string;
          highlights: string[];
          specifications: Json;
          category_id: string;
          created_at: string;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          images: string[];
          price: number;
          original_price: number;
          discount: number;
          rating?: number;
          rating_count?: number;
          seller_id: string;
          in_stock?: boolean;
          description: string;
          highlights: string[];
          specifications: Json;
          category_id: string;
          created_at?: string;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          images?: string[];
          price?: number;
          original_price?: number;
          discount?: number;
          rating?: number;
          rating_count?: number;
          seller_id?: string;
          in_stock?: boolean;
          description?: string;
          highlights?: string[];
          specifications?: Json;
          category_id?: string;
          created_at?: string;
          updated_at?: string | null;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          icon: string;
          image: string;
          sub_categories: string[];
          created_at: string;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          icon: string;
          image: string;
          sub_categories: string[];
          created_at?: string;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          icon?: string;
          image?: string;
          sub_categories?: string[];
          created_at?: string;
          updated_at?: string | null;
        };
      };
      banners: {
        Row: {
          id: string;
          image: string;
          title: string;
          link: string;
          created_at: string;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          image: string;
          title: string;
          link: string;
          created_at?: string;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          image?: string;
          title?: string;
          link?: string;
          created_at?: string;
          updated_at?: string | null;
        };
      };
      cart_items: {
        Row: {
          id: string;
          user_id: string;
          product_id: string;
          quantity: number;
          created_at: string;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          product_id: string;
          quantity: number;
          created_at?: string;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          product_id?: string;
          quantity?: number;
          created_at?: string;
          updated_at?: string | null;
        };
      };
      wishlist_items: {
        Row: {
          id: string;
          user_id: string;
          product_id: string;
          created_at: string;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          product_id: string;
          created_at?: string;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          product_id?: string;
          created_at?: string;
          updated_at?: string | null;
        };
      };
      addresses: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          phone: string;
          address_line1: string;
          address_line2: string | null;
          city: string;
          state: string;
          pincode: string;
          is_default: boolean;
          type: string;
          created_at: string;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          phone: string;
          address_line1: string;
          address_line2?: string | null;
          city: string;
          state: string;
          pincode: string;
          is_default?: boolean;
          type: string;
          created_at?: string;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          phone?: string;
          address_line1?: string;
          address_line2?: string | null;
          city?: string;
          state?: string;
          pincode?: string;
          is_default?: boolean;
          type?: string;
          created_at?: string;
          updated_at?: string | null;
        };
      };
      orders: {
        Row: {
          id: string;
          user_id: string;
          address_id: string;
          total: number;
          status: string;
          payment_method: string;
          created_at: string;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          address_id: string;
          total: number;
          status?: string;
          payment_method: string;
          created_at?: string;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          address_id?: string;
          total?: number;
          status?: string;
          payment_method?: string;
          created_at?: string;
          updated_at?: string | null;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string;
          quantity: number;
          price: number;
          created_at: string;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          order_id: string;
          product_id: string;
          quantity: number;
          price: number;
          created_at?: string;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          order_id?: string;
          product_id?: string;
          quantity?: number;
          price?: number;
          created_at?: string;
          updated_at?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
