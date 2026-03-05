import AuthForm from '@/features/auth/AuthForm'
import React from 'react'

function Signup() {
  return (
    <div className='max-w-275 min-h-vh'>
      <AuthForm variant='signup'/>
    </div>
  )
}

export default Signup