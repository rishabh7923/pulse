import { getPostApi } from "@/api/post"
import { useQuery } from "@tanstack/react-query"

function usePost(postId: string) {
    const { data: post, status } = useQuery({
        queryFn: () => getPostApi(postId),
        queryKey: ["post", postId]
    }
    )
    return { post, status };
}

export default usePost