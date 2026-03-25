import { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { Bookmark, ShareIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CommentButton from "./comment/CommentButton";
import LikeButton from "./LikeButton";
import { PostCardDropDown } from "./PostCardDropDown";
import type { PostCardProps } from "@/types/post";

const PostCard = forwardRef<HTMLDivElement, PostCardProps>((post, ref) => {
    const navigate = useNavigate();
    
  return (
      <div
      ref={ref}
      className="group border-b p-4 transition hover:bg-muted/40"
      >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src={post.avatar || "https://github.com/shadcn.png"} />
            <AvatarFallback>
              {post.user.username.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <div className="flex items-center gap-4">
              <span className="font-medium text-sm">
                {post.user.username}
              </span>
            </div>

            <span className="text-xs text-muted-foreground">
              {post.createdAt}
            </span>
          </div>
        </div>

        <PostCardDropDown postId={post.id} userId={post.user.id} />
      </div>

      {/* Content */}
      <div className="mt-3">
        <p className="text-sm leading-relaxed whitespace-pre-line">
          {post.content}
        </p>
      </div>

      {/* Image */}
      {post.image && (
        <div className="mt-3 overflow-hidden rounded-xl border">
          <img
            src={post.image}
            className="w-full max-h-[420px] object-cover transition group-hover:scale-[1.01]"
            alt="post"
            />
        </div>
      )}

      {/* Actions */}
      <div className="mt-3 flex items-center justify-between text-muted-foreground">
        <div className="flex items-center gap-5">
          <LikeButton
            likes={post.likes}
            liked={Boolean(post.liked)}
            postId={post.id}
            />

          <CommentButton onClick={() => navigate(`/p/${post.id}`)} />

          <button className="flex items-center gap-2 text-sm transition hover:text-foreground">
            <ShareIcon className="h-4 w-4" />
          </button>
        </div>

        <button className="transition hover:text-yellow-500">
          <Bookmark
            className={`h-4 w-4 transition ${
                post.saved ? "fill-yellow-500 text-yellow-500" : ""
            }`}
            />
        </button>
      </div>
    </div>
  );
});
export default PostCard;