//example
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/* ------------- 1. Обычный стор без localStorage ------------- */
const storeSlice = (set, get) => ({
  baseUrl: 'http://localhost:3000',
  products: [],
  workItems: [],
  basket: [],
  quantity: 0,

  /* ---------- сеттеры/геттеры ---------- */
  getProducts: async (url) => {
    try {
      const res = await fetch(`${get().baseUrl}${url}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      set({ products: await res.json() });
    } catch (e) {
      console.error('Ошибка загрузки products:', e);
    }
  },

  getWorkItems: async (url) => {
    try {
      const res = await fetch(`${get().baseUrl}${url}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      set({ workItems: await res.json() });
    } catch (e) {
      console.error('Ошибка загрузки workItems:', e);
    }
  },

  /* ---------- корзина ---------- */
  addProductToBasket: (item) => {
    set((state) => {
      const idx = state.basket.findIndex(
        (p) => p.id === item.id && p.category === item.category
      );
      let nextBasket;
      if (idx !== -1) {
        nextBasket = [...state.basket];
        nextBasket[idx].quantity += 1;
      } else {
        nextBasket = [...state.basket, { ...item, quantity: 1 }];
      }
      const qty = nextBasket.reduce((s, p) => s + p.quantity, 0);
      return { basket: nextBasket, quantity: qty };
    });
  },

  incrementProductQuantity: (id, category) =>
    set((s) => {
      const b = s.basket.map((p) =>
        p.id === id && p.category === category
          ? { ...p, quantity: p.quantity + 1 }
          : p
      );
      return { basket: b, quantity: b.reduce((sum, p) => sum + p.quantity, 0) };
    }),

  decrementProductQuantity: (id, category) =>
    set((s) => {
      let b = s.basket.map((p) =>
        p.id === id && p.category === category
          ? { ...p, quantity: p.quantity - 1 }
          : p
      );
      b = b.filter((p) => p.quantity > 0);
      return { basket: b, quantity: b.reduce((sum, p) => sum + p.quantity, 0) };
    }),

  deleteProductFromBasket: (id, category) =>
    set((s) => {
      const b = s.basket.filter(
        (p) => !(p.id === id && p.category === category)
      );
      return { basket: b, quantity: b.reduce((sum, p) => sum + p.quantity, 0) };
    }),

  clearBasket: () => set({ basket: [], quantity: 0 }),
});

/* ------------- 2. Оборачиваем persist’ом ------------- */
export const useCatalogueStore = create(
  persist(storeSlice, {
    name: 'catalogue-storage',      // ключ localStorage
    partialize: (state) => ({      // сохраняем только корзину
      basket: state.basket,
      quantity: state.quantity,
    }),
    // версия + миграция (при необходимости)
    // version: 1,
    // migrate: (persisted, version) => { ... }
  })
);
