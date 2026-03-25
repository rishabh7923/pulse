import { ChartNoAxesCombined, FileQuestionMark, HeartPlus, Home, Laugh, NewspaperIcon, Plus } from "lucide-react"
import { DialogContent, DialogTrigger, Dialog } from './ui/dialog';
import { Button } from "./ui/button"
import CreatePost from '@/features/post/CreatePost';
import SideBarLink from "./SideBarLink"
function FloatingSidebar() {
    return (
        <div className="hidden mt-2 w-60 self-start bg-popover rounded-lg sticky top-20 h-auto md:flex flex-col gap-16 border">
            <ul className="p-2 lg:p-4 space-y-4">
                <SideBarLink to="/">
                    <Home /> Home
                </SideBarLink>
                <SideBarLink to="/popular">
                    <ChartNoAxesCombined />Popular
                </SideBarLink>
                <SideBarLink to="/issues">
                    <NewspaperIcon /> Issues
                </SideBarLink>
                <SideBarLink to="/memes">
                    <Laugh /> Memes
                </SideBarLink>
                <SideBarLink to="/confessions">
                    <HeartPlus /> Confessions
                </SideBarLink>
                <SideBarLink to="/ask">
                    <FileQuestionMark /> Ask
                </SideBarLink>
            </ul>
            <div className="justify-self-end p-2 space-y-2">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className='w-full  rounded-full'>
                            <Plus />
                            <span>
                                Create
                            </span>
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <CreatePost />
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}


export default FloatingSidebar