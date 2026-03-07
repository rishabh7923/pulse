import { Heart, MessageCircle, Bookmark, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

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
};

export default function PostCard({
    author,
    avatar,
    content,
    image,
    createdAt,
    likes,
    comments,
    liked,
    saved,
}: PostCardProps) {
    const [showComments, setShowComments] = useState(false)
    return (
        <div className="hover:bg-card rounded-xl p-4 space-y-4 ">

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">

                    <img
                        src={avatar || "/avatar.png"}
                        className="w-9 h-9 rounded-full object-cover"
                    />

                    <div className="flex flex-col leading-none">
                        <span className="font-medium text-sm">{author}</span>
                        <span className="text-xs text-muted-foreground">
                            {createdAt}
                        </span>
                    </div>

                </div>

                <Button variant="ghost" size="icon">
                    <MoreHorizontal className="w-4 h-4" />
                </Button>
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
                        <p><b>Rahul</b> same teacher bro 😭</p>
                        <p><b>Ankit</b> DBMS trauma</p>
                    </div>

                </div>
            )}
        </div>
    );
}