import AuthForm from '@/features/auth/AuthForm'
import React from 'react'

function Login() {
    return (
        <div className='max-w-275 min-h-vh'>
            <AuthForm variant='login'/>
        </div>
    )
}

export default Login