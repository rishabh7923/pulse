import { AxiosError } from "axios";
import axios from "../utils/axios"
import type { LOGINSCHEMA, SIGNUPSCHEMA } from "@/types/auth";

export async function loginApi(creds: LOGINSCHEMA) {
  try {
    const { data } = await axios.post("/login", creds);
    return data;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error(err.response?.data?.error || "Login failed");
    }
    throw err;
  }
}

export async function signupApi(creds: SIGNUPSCHEMA):Promise<{}> {
    try {
        const res = await axios("signup",{
            method: "POST",
            data:creds
        })
        const data = res.data;
        return data;
    } catch (err) {
        if (err instanceof AxiosError) {
            throw new Error(err.response?.data.message)
        }
    }
}