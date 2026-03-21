import { MessageCircle } from 'lucide-react'

function CommentButton({onClick}:{onClick:()=>void}) {
    return (
        <button className="flex items-center gap-2 text-sm hover:text-blue-500 transition" onClick={onClick}>
            <MessageCircle className="w-4 h-4" /> 45
        </button>)
}



export default CommentButton