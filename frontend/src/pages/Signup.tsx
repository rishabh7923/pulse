import Container from '@/components/Container'
import AuthForm from '@/features/auth/AuthForm'

function Signup() {
  return (
    <Container>
            <div className='flex items-center min-h-screen '>
                <AuthForm variant='signup' />
            </div>
        </Container>
  )
}

export default Signup