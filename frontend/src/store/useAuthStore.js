import { create } from 'zustand'
import toast from 'react-hot-toast'

import { axiosInstance } from '../lib/axios'
export const useAuthStore = create((set, get) => ({
    authUser: null,
    onlineUsers: [],
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
        set({ isSigningUp: true })
        try {
            const res = await axiosInstance.post('/auth/signup', data)
            set({ authUser: res.data })
            toast.success(res?.data?.message ?? "Signup successful!")
        } catch (error) {
            toast.error(
                error?.response?.data?.message ??
                    error?.message ??
                    "Signup failed. Please try again."
            )
            throw error
        } finally {
            set({ isSigningUp: false })
        }

        },

    logout: async () => {
        try {
            await axiosInstance.get('/auth/logout')
            set({ authUser: null })
            toast.success("Logged out successfully!")
            
        } catch {
            toast.error("Failed to log out. Please try again.")

        }
    },

    signin: async (data) => {
        try {
            set({ isLoggingIn: true })
            const res = await axiosInstance.post('/auth/signin', data)
            set({ authUser: res.data })
            toast.success(res?.data?.message ?? "Login successful!")
        } catch (error) {
            toast.error(
                error?.response?.data?.message ??
                    error?.message ??
                    "Login failed. Please try again."
            )
        } finally {
            set({ isLoggingIn: false })
        }
    },

    login: async (data) => {
        return get().signin(data)
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true })
        try {
            const res = await axiosInstance.put('/auth/update-profile', data)
            set((state) => ({
                authUser: {
                    ...state.authUser,
                    ...res.data,
                }
            }))
            toast.success(res?.data?.message ?? "Profile updated successfully!")
        } catch (error) {
            toast.error(
                error?.response?.data?.message ??
                    error?.message ??
                    "Failed to update profile. Please try again."
            )
        } finally {
            set({ isUpdatingProfile: false })
        }
    }
}))
