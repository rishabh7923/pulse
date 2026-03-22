import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import type { Comment } from '@/types/comment';
import dayjs from "@/lib/day";
function Comment({ comment }: { comment: Comment }) {
    return (
        <div className='p-2'>
            <div className='flex gap-2 items-center'>
                <Avatar>
                    <AvatarImage src={comment?.user?.profilePic} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className="font-semibold text-sm">notaprotoganist</span>
                <div className='text-muted-foreground text-xs'>
                    {dayjs(comment.created_at).fromNow()}
                </div>
            </div>
            <p className='mt-1 text-sm'>
                {comment.content}
            </p>
        </div>
    )
}

export default Comment