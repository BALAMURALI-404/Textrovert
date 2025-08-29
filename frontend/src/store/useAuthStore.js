import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';
const BASE_URL = process.env.NODE_ENV === 'development' ? "http://localhost:5000" : "https://textrovert-0xaq.onrender.com";

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isUpdatingName: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,
    baseurl: BASE_URL,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/auth/check');
            set({ authUser: res.data})
            get().connectSocket();
        }
        catch (error) {
            console.error("Error checking authentication:", error);
            set({ authUser: null });
        }
        finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (data) => {
        set({isSigningUp: true})
        try{
            const res = await axiosInstance.post("/auth/signup",data);
            toast.success("Verify your email to continue");
        }   
        catch(error){
            toast.error(error.response.data.message);
        } 
        finally {
            set({isSigningUp: false})
        }
    },

    login: async (data) => {
        set({isLoggingIn: true});
        try{
            const res = await axiosInstance.post("/auth/login",data);
            set({authUser: res.data});
            toast.success("Loggin successful");

            get().connectSocket()
        }
        catch(error){
            toast.error(error.response.data.message);
        }
        finally{
            set({isLoggingIn: false})
        }
    },

    logout: async () => {
        try{
            await axiosInstance.post("/auth/logout");
            set({authUser: null});
            toast.success("Logged in successfully");
            get().disconnectSocket()
        }
        catch(error){
            toast.error(error.response.data.message);
        }
    },

    updateProfile: async (data) => {
        set({isUpdatingProfile : true});
        try{
            const res = await axiosInstance.put("/auth/update-profile",data);
            set({authUser:res.data});
            toast.success("Profile updated successfully");
        }
        catch(error){
            console.log("Error in updating profile:",error);
            toast.error(error.response.data.message);
        }
        finally{
            set({isUpdatingProfile : false});
        }
    },
         
    updateName: async (date) => {
        set({isUpdatingName : true});
        try{
            const res = await axiosInstance.put("/auth/update-name",date);
            set({authUser:res.data});
            toast.success("Name updated successfully");
        }
        catch(error){
            console.log("Error in updating name:",error);
            toast.error(error.response.data.message);
        }
        finally{
            set({isUpdatingName : false});
        }
    },

    connectSocket: () => {
        const {authUser} = get();
        if(!authUser || get().socket?.connected) return;
        const socket = io( BASE_URL, {
            query: {
                userId: authUser._id,
            }
        });
        socket.connect();
        set({socket: socket});

        socket.on("getOnlineUsers", (userIds) => {
            set({onlineUsers: userIds});
        }); 
    },

    disconnectSocket: () =>{
        if(get().socket?.connected) get().socket.disconnect()
    },
})); 