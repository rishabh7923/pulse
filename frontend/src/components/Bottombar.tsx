import { Home, Plus, User } from "lucide-react"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import CreatePost from "@/features/post/CreatePost"

function Bottombar() {
    return (
        <div className='md:hidden relative top-16 h-10 border'>
            <div className="h-10 left-0 right-0 bottom-0 border-b-blue-800 fixed bg-background">
                <div className="flex justify-around">
                    <Button variant="ghost" size="icon">
                        <Home />
                    </Button>
                    <Dialog>
                        <DialogTrigger>
                            <Button variant="ghost" size="icon">
                                <Plus />
                            </Button>
                            <DialogContent>
                                <CreatePost />
                            </DialogContent>
                        </DialogTrigger>
                    </Dialog>
                    <Button variant="ghost" size="icon">
                        <User />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Bottombar