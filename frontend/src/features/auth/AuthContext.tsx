/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import axios from "@/utils/axios";
import { loginApi, signupApi } from "@/api/auth";
import type { LOGINSCHEMA, SIGNUPSCHEMA } from "@/types/auth";

interface AuthContextType {
    user: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (creds: LOGINSCHEMA) => Promise<void>;
    signup: (creds: SIGNUPSCHEMA) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthChecking, setIsAuthChecking] = useState(true) 

    const isAuthenticated = user !== null;

    async function login(creds: LOGINSCHEMA) {
        try {
            setIsLoading(true);

            const data = (await loginApi(creds)) as {
                token: string;
                username: string;
            };

            localStorage.setItem("token", data.token);
            setUser(data.username);
        } catch (err: unknown) {
            if (err instanceof Error) {
                alert(err.message);
            }
        } finally {
            setIsLoading(false);
        }
    }

    async function signup(creds: SIGNUPSCHEMA) {
        try {
            setIsLoading(true);

            const data = (await signupApi(creds)) as {
                token: string;
                username: string;
            };

            localStorage.setItem("token", data.token);
            setUser(data.username);
        } catch (err: unknown) {
            if (err instanceof Error) {
                alert(err.message);
            }
        } finally {
            setIsLoading(false);
        }
    }

    function logout() {
        localStorage.removeItem("token");
        setUser(null);
    }

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("token")

            if (!token) {
                setIsAuthChecking(false)
                return
            }

            try {
                const res = await axios("/users/me")
                setUser(res.data.username)
            } catch {
                localStorage.removeItem("token")
                setUser(null)
            } finally {
                setIsAuthChecking(false)
            }
        }

        checkAuth()
    }, [])

    const value: AuthContextType = {
        user,
        isAuthenticated,
        isLoading,
        login,
        signup,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {isAuthChecking ? "Loading..." : children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used inside AuthProvider");
    return context;
}

export default AuthProvider;