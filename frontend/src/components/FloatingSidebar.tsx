import { ChartNoAxesCombined, FileQuestionMark, HeartPlus, HelpCircle, Home, Laugh, LogOut, NewspaperIcon, Plus, Settings } from "lucide-react"
import SideBarLink from "./SideBarLink"
import { Button } from "./ui/button"
function FloatingSidebar() {
    return (
        <div className="hidden mt-2 w-60 self-start bg-accent rounded-lg sticky top-20 h-auto md:flex flex-col gap-16">
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
                <Button className="w-full rounded-full mt-4">
                    <Plus /> Create
                </Button>
                <div>
                    <Button variant="ghost">
                        <Settings /> Settings
                    </Button>
                    <Button  variant="ghost">
                        <HelpCircle /> Help
                    </Button>
                    <Button variant="ghost">
                        <LogOut /> Logout
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default FloatingSidebar