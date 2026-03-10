import { Home, Plus, User } from "lucide-react"
import { Button } from "./ui/button"

function Bottombar() {
    return (
        <div className='md:hidden relative top-16 h-10 border'>

        <div className="h-10 left-0 right-0 border-b-blue-800 fixed bottom-0 bg-background">
            <div className="flex justify-around">
                <Button variant="ghost" size="icon">
                    <Home />
                </Button>
                <Button variant="ghost" size="icon">
                    <Plus />
                </Button>
                <Button variant="ghost" size="icon">
                    <User />
                </Button>
            </div>
        </div>
        </div>
    )
}

export default Bottombar