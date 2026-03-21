import { AppSidebar } from '@/components/AppSidebar';
import Container from '@/components/Container';
import CreatePost from '@/features/post/CreatePost';
import { SidebarProvider } from '@/components/ui/sidebar';
import Bottombar from '@/components/Bottombar';
import PostFeed from '@/features/post/PostFeed';
import Topbar from '@/components/Topbar';
import { useEffect } from 'react';
import { useAuth } from '@/features/auth/AuthContext';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import TrendingSection from '@/components/TrendingSection';

function Home() {
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();
    useEffect(() => {
        if (!user) return
        if (isAuthenticated && !user?.verified) {
            toast("Please verify your email", {
                action: {
                    label: "Verify",
                    onClick: () => navigate("/verify")
                }
            })
        }
    }, [user, isAuthenticated, navigate])
    return (
        <SidebarProvider>
            <AppSidebar />
            <Topbar />
            <Container>
                <div className='top-16 relative flex md:px-2'>
                    <div className='max-w-120 w-full mx-auto min-h-screen  border'>
                        <div className='mx-auto'>
                            <div className='border-b py-4 px-2'>
                                <CreatePost />
                            </div>
                            <PostFeed />
                        </div>
                    </div>
                   <TrendingSection/>
                </div>
                <Bottombar />
            </Container>
        </SidebarProvider>
    )
}

export default Home