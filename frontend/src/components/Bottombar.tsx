import { HeartPlus, Home, Laugh, NewspaperIcon, Plus } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import CreatePost from "@/features/post/CreatePost"
import { Button } from "./ui/button"

function Bottombar() {
    return (
        <div className='md:hidden relative top-16 h-10 border'>
            <div className="h-10 left-0 right-0 bottom-0 border-b-blue-800 fixed bg-background">
                <div className="flex justify-around">
                    <Button variant="ghost" size="icon">
                        <Home />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <HeartPlus />
                    </Button>
                    <Dialog>
                        <DialogTrigger>
                            <Button className="h-10 w-10 rounded-full relative -top-1/2"  size="icon">
                                <Plus/>
                            </Button>
                            <DialogContent>
                                <CreatePost />
                            </DialogContent>
                        </DialogTrigger>
                    </Dialog>
                    <Button variant="ghost" size="icon">
                        <Laugh />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <NewspaperIcon />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Bottombar