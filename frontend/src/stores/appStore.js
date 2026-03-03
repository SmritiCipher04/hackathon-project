import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAppStore = create()(
  persist(
    (set) => ({
      // ── Auth ────────────────────────────────────────────────────────────
      currentUser: null,
      setCurrentUser: (user) => set({ currentUser: user }),
      logout: () =>
        set({
          currentUser: null,
          currentPage: "marketplace",
          interests: [],
          notifications: [],
        }),

      // ── Navigation ───────────────────────────────────────────────────────
      currentPage: "marketplace",
      setCurrentPage: (page) => set({ currentPage: page }),

      // ── Products ─────────────────────────────────────────────────────────
      products: [],
      setProducts: (products) => set({ products }),
      addProduct: (product) =>
        set((state) => ({ products: [product, ...state.products] })),
      updateProduct: (id, updates) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...updates } : p,
          ),
        })),
      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),

      // ── Interests ────────────────────────────────────────────────────────
      interests: [],
      setInterests: (interests) => set({ interests }),
      addInterest: (interest) =>
        set((state) => ({ interests: [interest, ...state.interests] })),
      updateInterestStatus: (id, status) =>
        set((state) => ({
          interests: state.interests.map((i) =>
            i.id === id ? { ...i, status } : i,
          ),
        })),

      // ── Notifications ────────────────────────────────────────────────────
      notifications: [],
      setNotifications: (notifications) => set({ notifications }),
      addNotification: (notification) =>
        set((state) => ({
          notifications: [notification, ...state.notifications],
        })),
      markNotificationRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, readStatus: true } : n,
          ),
        })),
      markAllNotificationsRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({
            ...n,
            readStatus: true,
          })),
        })),

      // ── Language ─────────────────────────────────────────────────────────
      language: "en",
      setLanguage: (language) => set({ language }),
    }),
    {
      name: "local-connect-store",
      partialize: (state) => ({
        currentUser: state.currentUser,
        language: state.language,
        products: state.products,
        interests: state.interests,
        notifications: state.notifications,
        currentPage: state.currentPage,
      }),
    },
  ),
);
