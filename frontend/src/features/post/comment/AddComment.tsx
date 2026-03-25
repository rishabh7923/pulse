import { Button } from '@/components/ui/button'
import useAddComment from './hooks/useAddComment'
import { useParams } from 'react-router-dom';
import { useRef } from 'react';
import { toast } from 'sonner';

function AddComment() {
    const { mutate, status } = useAddComment();
    const { pid } = useParams();
    const ref = useRef<HTMLInputElement>(null);
    function addComment(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        if (ref.current) {
            if(ref.current?.value === "") {
                toast.error("comment too short");
                return;
            }
            mutate({ content: ref.current?.value, postId: pid! })
            ref.current.value = "";
        }
    }
    
    return (
        <div >
            <form className="flex gap-2 px-2" onSubmit={addComment}>
                <input
                    placeholder="Write a comment..."
                    className="flex-1 border rounded-lg px-3 py-2 text-sm"
                    ref={ref}
                />
                <Button className="text-sm" disabled={status == "pending"}>Post</Button>
            </form>
        </div>)
}

export default AddComment