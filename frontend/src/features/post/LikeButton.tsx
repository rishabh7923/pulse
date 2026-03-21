import { Heart } from "lucide-react"
import useLike from "./hooks/useLike";
import useUnlike from "./hooks/useUnlike";

function LikeButton({ likes, liked, postId }: { likes: number, liked: boolean, postId: string }) {
    const { like, status: likeStatus } = useLike(postId);
    const { unlike, status: unlikeStatus } = useUnlike(postId);
    const status = likeStatus && unlikeStatus
    function handleClick() {
        if (liked) return unlike(postId);
        like(postId)
    };

    return (
        <button className="flex items-center gap-2 text-sm hover:text-red-500" onClick={handleClick} disabled={status == "pending"}>
            <Heart
                className={`w-4 h-4 ${liked ? "fill-red-500 text-red-500" : ""} transition active:scale-125 duration-100 ease-in-out`}
            />
            {likes}
        </button>)
}

export default LikeButton