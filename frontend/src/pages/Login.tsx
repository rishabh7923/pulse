import Container from '@/components/Container'
import AuthForm from '@/features/auth/AuthForm'

function Login() {
    return (
        <Container>
            <div className='flex items-center min-h-screen '>
                <AuthForm variant='login' />
            </div>
        </Container>
    )
}

export default Login