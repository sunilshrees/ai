import { create } from 'zustand'

const useGlobalStore = create((set) => ({
  navData: [],
  infoDetails: {},
  isOpen: false,

  add: (key: string, data: any) => {
    set((state: any) => {
      return { ...state, [key]: data }
    })
  },

  toggleOpen: () => set((state: any) => ({ isOpen: !state.isOpen })),
}))
export default useGlobalStore
