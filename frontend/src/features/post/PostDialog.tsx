import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Comment from "./Comment/Comment";
import AddComment from "./Comment/AddComment";
import { ScrollArea } from "@/components/ui/scroll-area";

const image = "";
function PostDialog() {
    return (
        <div className="hidden md:block h-full p-4 overflow-hidden">
            <div className="h-full w-4/5 mx-auto flex min-h-0 bg-background rounded-sm overflow-hidden">

                {/* Post image */}
                <div className="w-full h-full bg-amber-600 border">
                    {image && (
                        <div className="overflow-hidden rounded-lg border">
                            <img
                                src={image}
                                className="w-full max-h-100 object-contain"
                            />
                        </div>
                    )}
                </div>
                <div className="w-full h-full flex flex-col pb-2 min-h-0 overflow-x-hidden">
                    {/* USER INFO */}
                    <div className="flex items-center gap-3 p-2">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>

                        <div className="flex flex-col leading-none">
                            <span className="font-semibold text-sm">notaprotoganist</span>
                            <span className="text-xs text-muted-foreground">
                                {"3 days ago"}
                            </span>
                        </div>
                    </div>

                    {/* Post content */}
                    <div className="p-2 text-sm text-accent-foreground">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate quibusdam, blanditiis itaque, neque et iure nulla error minus aut quo ducimus aliquid nesciunt.</p>
                    </div>


                    {/* Comments */}
                    <ScrollArea className="flex-1 overflow-y-auto min-h-0">
                        <div className="p-2">
                            <h3 className="font-medium">Comments</h3>
                        </div>

                        <ul className="divide-y">
                            <Comment />
                            <Comment />
                            <Comment />
                            <Comment />
                            <Comment />
                            <Comment />
                            <Comment />
                        </ul>
                    </ScrollArea>

                    {/* Add comment */}
                    <div className="border-t py-2">
                        <AddComment />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostDialog