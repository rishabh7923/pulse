import type { Ref } from "react";
import { useNavigate } from "react-router-dom";
import { Bookmark, Share2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CommentButton from "./comment/CommentButton";
import LikeButton from "./LikeButton";
import { PostCardDropDown } from "./PostCardDropDown";

type PostCardProps = {
    id: string;
    author: string;
    avatar?: string;
    content: string;
    image?: string;
    createdAt: string;
    likes: number;
    comments: number;
    liked: boolean;
    saved?: boolean;
    ref: Ref<HTMLDivElement>
};

export default function PostCard({
    // avatar,
    id,
    content,
    image,
    createdAt,
    likes,
    liked,
    saved,
    ref
}: PostCardProps) {
    const navigate = useNavigate();
    return (
        <div className="hover:bg-card p-4 space-y-4" ref={ref}>

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
                <PostCardDropDown />
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
                        className="w-full max-h-100 object-contain"
                    />
                </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-2">

                <div className="flex items-center gap-4">

                    <LikeButton likes={likes} liked={Boolean(liked)} postId={id} />
                    <CommentButton onClick={() => navigate(`p/${id}`)} />
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
        </div>
    );
}