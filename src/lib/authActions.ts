/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/redux/featured/auth/authApi";
import { getSession, signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/featured/auth/authSlice";

export function useAuthHandlers() {
  const dispatch = useAppDispatch();
  const [registerUser] = useRegisterUserMutation();

  const handleRegister = async (data: {
    name?: string;
    email: string;
    password: string;
    role: string;
    status: string;
  }) => {
    try {
      const res = await registerUser(data).unwrap();
      toast.success("Registration successful!");
    } catch (err: any) {
      throw new Error(err?.data?.message || "Registration failed");
    }
  };
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const handleLogin = async (data: { email: string; password: string }) => {
    try {
      const res = await loginUser(data).unwrap();

      if (res?.success) {
        dispatch(setUser(res.data));
        toast.success("Login successful");
      } else {
        toast.error(res.message || "Login failed");
      }
    } catch (error: any) {
      toast.error("Invalid credentials");
    }
  };

  return { handleRegister, handleLogin };
}
