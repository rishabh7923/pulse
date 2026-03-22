"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function SelectPostCategory() {
  const [category, setCategory] = React.useState("general")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="rounded-full" variant="secondary">Select category</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32">
        <DropdownMenuGroup>
          <DropdownMenuRadioGroup value={category} onValueChange={setCategory}>
            <DropdownMenuRadioItem value="general">General</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="confession">Confession</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="issue">Issue</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="meme">Memes</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="question">Question</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
