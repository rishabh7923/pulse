import { useState } from "react"
import { Image } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export default function CreatePost() {
  const [content, setContent] = useState("")
  const [focused, setFocused] = useState(false)

  return (
    <div className="border-b p-4 flex gap-3">

      {/* Avatar */}
      <Avatar>
        <AvatarImage src="/avatar.png" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>

      <div className="flex-1 space-y-3">

        {/* Textarea */}
        <textarea
          placeholder="What’s happening?"
          value={content}
          onFocus={() => setFocused(true)}
          onChange={(e) => setContent(e.target.value)}
          className="w-full bg-transparent resize-none outline-none text-lg placeholder:text-muted-foreground"
        />

        {/* Bottom Row */}
        <div className="flex items-center justify-between">

          {/* Actions */}
          <div className="flex items-center gap-4 t">

            <button className="hover:bg-blue-500/10 p-2 rounded-full">
              <Image size={18} />
            </button>

          </div>

          {/* Post Button */}
          <Button disabled={!content.trim()}>
            Post
          </Button>

        </div>

      </div>
    </div>
  )
}