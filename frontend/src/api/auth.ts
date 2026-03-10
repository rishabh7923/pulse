import { AxiosError } from "axios";
import axios from "../utils/axios"
import type { LoginResponse, LOGINSCHEMA, SignupResponse, SIGNUPSCHEMA } from "@/types/auth";

export async function loginApi(creds: LOGINSCHEMA): Promise<LoginResponse> {
  try {
    const { data } = await axios.post("auth/login", creds);
    return data;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error(err.response?.data?.error.message || "Login failed");
    }
    throw err;
  }
}

export async function signupApi(creds: SIGNUPSCHEMA): Promise<SignupResponse> {
  try {
    const res = await axios("auth/signup", {
      method: "POST",
      data: creds
    })
    const data = res.data;
    return data;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error(err.response?.data.error.message || "Signup failed")
    }
    throw err;
  }
}