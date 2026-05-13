import type { Notification, User } from "@/backend";
import type { Role } from "@/backend";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppState {
  user: User | null;
  role: Role | null;
  isDarkMode: boolean;
  sidebarOpen: boolean;
  notifications: Notification[];
  globalSearch: string;
  setUser: (user: User | null) => void;
  setRole: (role: Role | null) => void;
  setIsDarkMode: (isDarkMode: boolean) => void;
  setSidebarOpen: (open: boolean) => void;
  setNotifications: (notifications: Notification[]) => void;
  setGlobalSearch: (search: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      role: null,
      isDarkMode: true,
      sidebarOpen: true,
      notifications: [],
      globalSearch: "",
      setUser: (user) => set({ user }),
      setRole: (role) => set({ role }),
      setIsDarkMode: (isDarkMode) => set({ isDarkMode }),
      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
      setNotifications: (notifications) => set({ notifications }),
      setGlobalSearch: (globalSearch) => set({ globalSearch }),
    }),
    {
      name: "schoolfee-app-store",
      partialize: (state) => ({
        isDarkMode: state.isDarkMode,
        sidebarOpen: state.sidebarOpen,
      }),
    },
  ),
);
