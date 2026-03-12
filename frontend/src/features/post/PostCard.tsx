import { Heart, MessageCircle, Bookmark, Flag, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Comment from "./Comment/Comment";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { Ref } from "react";
type PostCardProps = {
    id: string;
    author: string;
    avatar?: string;
    content: string;
    image?: string;
    createdAt: string;
    likes: number;
    comments: number;
    liked?: boolean;
    saved?: boolean;
    ref: Ref<HTMLDivElement>
};

export default function PostCard({
    // avatar,
    content,
    image,
    createdAt,
    likes,
    comments,
    liked,
    saved,
    ref
}: PostCardProps) {
    const [showComments, setShowComments] = useState(false)
    return (
        <div className="hover:bg-card rounded-xl p-4 space-y-4 " ref={ref}>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">

                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col leading-none">
                        <span className="font-medium text-sm">notaprotoganist</span>
                        <span className="text-xs text-muted-foreground">
                            {createdAt}
                        </span>
                    </div>

                </div>

                <Tooltip>
                    <TooltipTrigger>
                        <Button className="hover:text-red-500" variant="ghost" size="icon">
                            <Flag className="w-4 h-4" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Report this post</TooltipContent>
                </Tooltip>
            </div>

            {/* Content */}
            <p className="text-sm leading-relaxed whitespace-pre-line">
                {content}
            </p>

            {/* Image */}
            {image && (
                <div className="overflow-hidden rounded-lg border">
                    <img
                        src={image}
                        className="w-full max-h-100 object-cover"
                    />
                </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-2">

                <div className="flex items-center gap-4">

                    <button className="flex items-center gap-2 text-sm hover:text-red-500 transition">
                        <Heart
                            className={`w-4 h-4 ${liked ? "fill-red-500 text-red-500" : ""}`}
                        />
                        {likes}
                    </button>

                    <button className="flex items-center gap-2 text-sm hover:text-blue-500 transition" onClick={() => setShowComments(s => !s)}>
                        <MessageCircle className="w-4 h-4" />
                        {comments}
                    </button>
                    <button className="flex items-center gap-2 text-sm hover:text-yellow-500 transition" >
                        <Share2 className="w-4 h-4" />
                    </button>

                </div>

                <button className="hover:text-yellow-500 transition">
                    <Bookmark
                        className={`w-4 h-4 ${saved ? "fill-yellow-500 text-yellow-500" : ""}`}
                    />
                </button>

            </div>
            {showComments && (
                <div className="border-t pt-3 space-y-3">

                    {/* comment input */}
                    <div className="flex gap-2">
                        <input
                            placeholder="Write a comment..."
                            className="flex-1 border rounded-lg px-3 py-2 text-sm"
                        />
                        <Button className="text-sm">Post</Button>
                    </div>

                    {/* comment list */}
                    <div className="space-y-2 text-sm">
                        <p className="flex items-center">
                            <span className="inline-block mr-2 text-lg font-medium">Comments </span>
                            <Badge>25</Badge>
                        </p>
                        <Comment />
                        <Comment />
                    </div>

                </div>
            )}
        </div>
    );
}