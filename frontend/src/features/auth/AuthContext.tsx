import { signupApi } from '@/api/auth';
import type { SIGNUPSCHEMA } from '@/types/auth';
import React, { type ReactNode } from 'react'
import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


interface AuthContextType {
    user: string | null;
    isAuthenticated: boolean
    isLoading: boolean;

}

const d = {
    user: null,
    isLoading: false,
    isAuthenticated: false
}
const AuthContext = createContext<AuthContextType>(d)


function AuthProvider({ children }: { children: ReactNode }) {
    const navigate = useNavigate()
    const [user, setUser] = useState<string | null>(null)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    async function signup(creds:SIGNUPSCHEMA) {
        try {
            // send signup request
            const res = await signupApi(creds);
            // if success
            const
            // update user and authenticated state

        } catch {
            // display error message
        }
        finally {
            setIsLoading(false)
        }

        function login() {
            try {
                // send signup request
                // if success
                // update user and authenticated state

            } catch {
                // display error message
            }
            finally {
                setIsLoading(false)
            }
        }

        function logout() {
            // just remove token from local storage
        }
    }
    const value = { user, isAuthenticated, isLoading }
    useEffect(() => {
        // send req to server to check if user is logged in
        // get token 
    }, [])

    return (
        <AuthContext.Provider value={value}>

        </AuthContext.Provider>
    )
}

export default AuthProvider