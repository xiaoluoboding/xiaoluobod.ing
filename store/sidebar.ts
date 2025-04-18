import { create } from "zustand"

interface SidebarState {
  isVisible: boolean
  toggleSidebar: () => void
  hideSidebar: () => void
  showSidebar: () => void
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isVisible: true,
  toggleSidebar: () => set((state) => ({ isVisible: !state.isVisible })),
  hideSidebar: () => set({ isVisible: false }),
  showSidebar: () => set({ isVisible: true }),
}))
