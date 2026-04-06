import { create } from 'zustand'
import { axiosInstance } from '../lib/axios'
export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/auth/check-auth')
            set({ authUser: res.data, isCheckingAuth: false })
        } catch (error) {
            console.log("Error checking auth:", error)
            set({ authUser: null, isCheckingAuth: false })
        }
        finally{
            set({ isCheckingAuth: false })
        }
    },

    signup: async (data) => {

}
}))
