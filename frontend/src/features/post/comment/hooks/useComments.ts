import { getCommentsApi } from "@/api/comment"
import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"

function useComments() {
    const { pid } = useParams();
    const { data:comments, status } = useQuery({
        queryFn: () => getCommentsApi({ postId: pid as string }),
        queryKey:["comments", pid]
        
    })
    return {comments, status}
}

export default useComments