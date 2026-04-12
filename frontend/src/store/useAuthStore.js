import { create } from 'zustand'
import toast from 'react-hot-toast'
import { io } from 'socket.io-client'
import { signInWithPopup, signOut } from 'firebase/auth'

import { axiosInstance } from '../lib/axios'
import { getAccessToken, setAccessToken } from '../lib/auth'
import { auth, googleProvider, isFirebaseConfigured } from '../lib/firebase'
const SOCKET_URL =
    import.meta.env.VITE_SOCKET_URL ||
    (import.meta.env.MODE === "development" ? 'http://localhost:5001' : window.location.origin)
export const useAuthStore = create((set, get) => ({
    authUser: null,
    onlineUsers: [],
    isSigningUp: false,
    isLoggingIn: false,
    isGoogleSigningIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    socket:null,
    checkAuth: async () => {
        const token = getAccessToken()
        if (!token) {
            set({ authUser: null, isCheckingAuth: false })
            return
        }

        try {
            const res = await axiosInstance.get('/auth/check-auth')
            set({ authUser: res.data, isCheckingAuth: false })
            get().connectSocket()
        } catch (error) {
            console.log("Error checking auth:", error)
            setAccessToken(null)
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
            setAccessToken(res.data.accessToken)
            set({ authUser: res.data })
            toast.success(res?.data?.message ?? "Signup successful!")
            get().connectSocket()
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
            if (auth) {
                await signOut(auth)
            }
            setAccessToken(null)
            set({ authUser: null })
            toast.success("Logged out successfully!")
            get().disconnectSocket()
        } catch {
            toast.error("Failed to log out. Please try again.")

        }
    },

    googleSignin: async () => {
        if (!isFirebaseConfigured || !auth || !googleProvider) {
            toast.error("Firebase Google sign-in is not configured yet.")
            return
        }

        try {
            set({ isGoogleSigningIn: true })
            const result = await signInWithPopup(auth, googleProvider)
            const idToken = await result.user.getIdToken()
            const res = await axiosInstance.post('/auth/google', { idToken })

            setAccessToken(res.data.accessToken)
            set({ authUser: res.data })
            toast.success(res?.data?.message ?? "Google sign-in successful!")
            get().connectSocket()
        } catch (error) {
            const errorCode = error?.code

            if (errorCode !== 'auth/popup-closed-by-user') {
                if (auth) {
                    await signOut(auth)
                }
                setAccessToken(null)
                toast.error(
                    error?.response?.data?.message ??
                        error?.message ??
                        "Google sign-in failed. Please try again."
                )
            }
        } finally {
            set({ isGoogleSigningIn: false })
        }
    },

    signin: async (data) => {
        try {
            set({ isLoggingIn: true })
            const res = await axiosInstance.post('/auth/signin', data)
            setAccessToken(res.data.accessToken)
            set({ authUser: res.data })
            toast.success(res?.data?.message ?? "Login successful!")
            get().connectSocket()
        } catch (error) {
            setAccessToken(null)
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
             // Refresh auth data after profile update
        } catch (error) {
            toast.error(
                error?.response?.data?.message ??
                    error?.message ??
                    "Failed to update profile. Please try again."
            )
        } finally {
            set({ isUpdatingProfile: false })
        }
    },

    connectSocket: () => {
        const { authUser } = get()
        const token = getAccessToken()
        if (!authUser || get().socket?.connected) return // if user is not authenticated, do not connect to socket
        if (!token) return
        const socket = io(SOCKET_URL, {
            auth: {
                token,
            },
        })

        socket.on("getOnlineUsers", (onlineUsers) => {
            set({ onlineUsers })
        })

        set({ socket })
    },

    disconnectSocket: () => {
        if (get().socket) {
            get().socket.off("getOnlineUsers")
            get().socket.disconnect()
            set({ socket: null })
        }
        set({ onlineUsers: [] })
    }
}))
