import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  discountCode: string | null;
  shippingCost: number;
}

// ❌ BỎ dòng gọi localStorage, thay bằng mảng trống []
const initialState: CartState = {
  items: [],
  discountCode: null,
  shippingCost: 10,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      // ❌ XÓA dòng localStorage.setItem ở đây
    },
    
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.quantity += 1;
      // ❌ XÓA dòng localStorage.setItem ở đây
    },
    
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else if (item && item.quantity === 1) {
        state.items = state.items.filter((i) => i.id !== action.payload);
      }
      // ❌ XÓA dòng localStorage.setItem ở đây
    },
    
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
      // ❌ XÓA dòng localStorage.setItem ở đây
    },
    
    clearCart: (state) => {
      state.items = [];
      // ❌ XÓA dòng localStorage.removeItem ở đây
    },
    
    applyDiscount: (state, action: PayloadAction<string | null>) => {
      state.discountCode = action.payload;
    },
    
    setShippingCost: (state, action: PayloadAction<number>) => {
      state.shippingCost = action.payload;
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
  applyDiscount,
  setShippingCost,
} = cartSlice.actions;

export default cartSlice.reducer;