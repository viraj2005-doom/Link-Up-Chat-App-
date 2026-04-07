import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import { axiosInstance } from '../lib/axios';

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    onlineUsers: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    setSelectedUser: (selectedUser) => set({ selectedUser }),

    getUsers: async() => {
        set({ isUsersLoading: true })
        try {
            const res = await axiosInstance.get('/message/users')
            set({ users: res.data, isUsersLoading: false })
        } catch (error) {
            set({ isUsersLoading: false })
            toast.error(
                error?.response?.data?.message ??
                error?.message ??
                'Failed to fetch users'
            )
        }
        finally {    
            set({ isUsersLoading: false })
        }
    },

    getMessages: async(userId) => {
        set({ isMessagesLoading: true })
        try {
            const res = await axiosInstance.get(`/message/${userId}`)
            set({ messages: res.data, isMessagesLoading: false })
        } catch (error) {
            set({ isMessagesLoading: false })
            toast.error(
                error?.response?.data?.message ??
                error?.message ??
                'Failed to fetch messages'
            )
        }
        finally {    
            set({ isMessagesLoading: false })
        }
    },

    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();

        if (!selectedUser?._id) {
            toast.error("Please select a user first");
            return;
        }

        try {
            const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, messageData)
            set({ messages: [...messages, res.data] })
        } catch (error) {
            toast.error(
                error?.response?.data?.message ??
                error?.message ??
                'Failed to send message'
            )
            throw error
        } 
    }, 
    
    subscribeToMessages: () => {},
    unsubscribeFromMessages: () => {},


}))
