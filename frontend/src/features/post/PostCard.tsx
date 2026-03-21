import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { Ref } from "react";
import LikeButton from "./LikeButton";
import useMediaQuery from "@/hooks/useMediaQuery";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Bookmark, Flag, Share2 } from "lucide-react";
import CommentButton from "./Comment/CommentButton";
import MobileScreenComments from "./Comment/MobileScreenComments";
import PostDialog from "./PostDialog";

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
    comments,
    liked,
    saved,
    ref
}: PostCardProps) {
    const isDesktop = useMediaQuery("(min-width: 768px)");

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
                        className="w-full max-h-100 object-contain"
                    />
                </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-2">

                <div className="flex items-center gap-4">

                    <LikeButton likes={likes} liked={Boolean(liked)} postId={id} />
                    {isDesktop ? <Dialog>
                        <DialogTrigger asChild>
                            <CommentButton onClick={() => 1} />
                        </DialogTrigger>
                        <DialogContent className="w-screen h-screen max-w-none sm:max-w-none bg-transparent">
                            <PostDialog />
                        </DialogContent>
                    </Dialog> : <Drawer>
                        <DrawerTrigger asChild>
                            <CommentButton onClick={() => 1} />
                        </DrawerTrigger>
                        <DrawerContent>
                            <MobileScreenComments />
                        </DrawerContent>
                    </Drawer>}
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