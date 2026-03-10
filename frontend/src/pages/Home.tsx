import { AppSidebar } from '@/components/AppSidebar';
import Container from '@/components/Container';
import CreatePost from '@/features/post/CreatePost';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Bottombar from '@/components/Bottombar';
import PostFeed from '@/features/post/PostFeed';
import Topbar from '@/components/Topbar';

function Home() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <Topbar />
            <Container>
                <div className='top-16 relative flex md:px-2'>
                    <div className='max-w-xl mx-auto min-h-screen px-2 lg:px-6'>
                        <div className='mx-auto'>
                            <CreatePost />
                            <PostFeed />
                        </div>
                    </div>
                    <aside className='hidden min-w-76 max-h-96 max-w-80 ml-auto bg-sidebar rounded-lg my-2 text-foreground lg:block lg:py-4 sticky top-20'>
                        <h3 className='text-base mb-3 text-muted-foreground uppercase px-4'>
                            Trending Today
                        </h3>
                        <div className="divide-y">
                            <article className="items-start text-sm p-2 lg:p-4">
                                <div className="flex gap-2 mb-2">
                                    <Avatar size="sm">
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>U</AvatarFallback>
                                    </Avatar>
                                    <span>Chad029</span>
                                    <div className="text-muted-foreground">
                                        19 mins ago
                                    </div>
                                </div>

                                <p className="font-medium mb-2">
                                    Lorem ipsum dolor si Impedit suscipit totam perferendis culpa. Dolore!
                                </p>

                                <div className='space-x-2 text-sm'>
                                    <span>123 likes</span> <span>12 comments</span>
                                </div>

                            </article>

                            <article className="items-start text-sm p-2 lg:p-4">
                                <div className="flex gap-2 mb-2">
                                    <Avatar size="sm">
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>U</AvatarFallback>
                                    </Avatar>
                                    <span>Chad029</span>
                                    <div className="text-muted-foreground">
                                        19 mins ago
                                    </div>
                                </div>
                                <p className="font-medium mb-2">
                                    Lorem ipsum dolor si Impedit suscipit totam perferendis culpa. Dolore!
                                </p>
                                <div className='space-x-2 text-sm'>
                                    <span>123 likes</span> <span>12 comments</span>
                                </div>
                            </article>
                        </div>
                    </aside>
                </div>

                <Bottombar />
            </Container>
        </SidebarProvider>
    )
}

export default Home