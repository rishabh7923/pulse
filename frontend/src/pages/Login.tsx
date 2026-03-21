import Container from '@/components/Container'
import AuthForm from '@/features/auth/AuthForm'

function Login() {
    return (
        <Container>
            <div className='flex items-center min-h-screen p-2 lg:p-4'>
                <AuthForm variant='login' />
            </div>
        </Container>
    )
}

export default Login