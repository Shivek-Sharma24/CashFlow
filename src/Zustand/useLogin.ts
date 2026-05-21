import { create } from "zustand";
import axios from 'axios'
import toast from "react-hot-toast";
import { demoapi } from "./useSignup";

interface FormData {
  email: string;
  password: string;
}

interface FormStore {
  formdata: FormData;
  isLoading: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

const useLogin = create<FormStore>((set, get) => ({
  // State
  formdata: {
    email: "",
    password: "",
  },
  isLoading: false,
  // Update any field dynamically
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.name , "  :-" , e.target.value)
    set((state) => ({
      formdata: { ...state.formdata, [e.target.name]: e.target.value },
    }));
  },

  // Submit handler
  handleSubmit: async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { formdata } = get();
    console.log(formdata);
    if (!formdata.email || !formdata.password) {
      toast.error("All fields are required!");
      return;
    }
    set({ isLoading: true });
    try {
      const res = await axios.post<{ token: string }>(
        `${demoapi}/auth/login`,
        formdata,
        {
          withCredentials:true
        }
      )
      toast.success('Login Successfully')
      localStorage.setItem('token', res.data.token)
      setTimeout(() => window.location.assign('/'), 1000)
    } catch (error) {
      toast.error('Try Again, with right credentials!')
      console.log('Login error', error)
    }finally{
         set({isLoading:false})
    }
    
    set({ formdata: { email: '', password: '' } })
  },
}));

export default useLogin;
