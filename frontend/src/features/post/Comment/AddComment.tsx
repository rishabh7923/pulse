import { Button } from '@/components/ui/button'

function AddComment() {
    return (
        <div className="flex gap-2 px-2">
            <input
                placeholder="Write a comment..."
                className="flex-1 border rounded-lg px-3 py-2 text-sm"
            />
            <Button className="text-sm">Post</Button>
        </div>)
}

export default AddComment