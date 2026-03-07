import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "./ui/button"
import MenuButton from "./MenuButton"
import { Laugh, Newspaper } from "lucide-react"
import { GiLoveHowl } from "react-icons/gi"
import { MdOutlineAutoGraph } from "react-icons/md"
import { BiHome, BiQuestionMark } from "react-icons/bi"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "./ui/dropdown-menu"

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="h-16" />
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-4">
            <SidebarMenuItem>
              <MenuButton to="/">
                <div className="flex gap-2 items-center h-6">
                  <BiHome /> Home
                </div>
              </MenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <MenuButton to="/popular">
                <div className="flex gap-2 items-center h-6">
                  <MdOutlineAutoGraph />Popular
                </div>
              </MenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <MenuButton to="/news">
                <div className="flex gap-2 items-center h-6">
                  <Newspaper /> Issues
                </div>
              </MenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <MenuButton to="/confessions">
                <div className="flex gap-2 items-center h-6">
                  <GiLoveHowl /> Confessions
                </div>
              </MenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <MenuButton to="/memes">
                <div className="flex gap-2 items-center h-6">
                  <Laugh /> Memes
                </div>
              </MenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <MenuButton to="/questions">
                <div className="flex gap-2 items-center h-6">
                  <BiQuestionMark /> Questions
                </div>
              </MenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>


        <SidebarGroup />


      </SidebarContent>
      <SidebarFooter>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button className="w-full" variant="outline">
              {/* <User /> */}
               Annonymous
            </Button>

          </DropdownMenuTrigger>
          <DropdownMenuContent>

            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              {/* <User /> */}
              <span>Profile</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" role="button" onClick={() => dispatch(logout())}>
              {/* <LogOut /> */}
              <span>Log out</span>
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  )
}