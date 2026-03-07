import { AppSidebar } from '@/components/AppSidebar';
import Container from '@/components/Container';
import CreatePost from '@/components/CreatePost';
import PostCard from '@/components/PostCard';
import { Input } from '@/components/ui/input';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ToggleTheme from '@/components/ToggleTheme';

function Home() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <div className='h-16 fixed top-0 left-0 right-0 z-10 border-b bg-background border-gray-800'>
                <div className='flex items-center justify-around h-full'>
                    <p className='font-semibold text-2xl'>
                        Spill
                    </p>
                    <div className='grow max-w-3xl'>
                        <Input className='w-full ring-1 ring-background rounded-2xl' placeholder='Find anything' />
                    </div>
                    <ToggleTheme/>
                </div>
            </div>
            <Container>
                <div className='top-16 relative w-full min-h-screen flex px-2 lg:px-6'>
                    <div className='mx-auto'>
                        <CreatePost />
                        <ul className='mt-2'>
                            <PostCard
                                id="1"
                                author="Anonymous"
                                createdAt="2h ago"
                                content="I swear our DBMS teacher thinks we are preparing for ISRO interviews."
                                image="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d"
                                likes={24}
                                comments={8}
                                liked={false}
                                saved={false}
                            />
                        </ul>
                    </div>
                    <div className='hidden min-w-76 max-w-80 ml-auto text-foreground lg:block p-2 lg:p-4 sticky top-16'>
                        <h3 className='text-lg font-semibold my-3'>
                            Trending
                        </h3>
                        <div className='flex flex-col divide-y gap-4'>
                            <div className='flex gap-2 items-center'>
                                <Avatar>
                                    <AvatarImage src="/avatar.png" />
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                                Lorem ipsum dolor si Impedit suscipit totam perferendis culpa. Dolore!
                            </div>
                            <div className='flex gap-2 items-center'>
                                <Avatar>
                                    <AvatarImage src="/avatar.png" />
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                                Lorem ipsum dolor si Impedit suscipit totam perferendis culpa. Dolore!
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </SidebarProvider>
    )
}

export default Home