import { deletePostApi } from "@/api/post"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

function useDeletPost() {
    const client = useQueryClient();
    return useMutation({
        mutationFn: deletePostApi,
        onSuccess: () => {
            toast.success("Post deleted.");
            client.invalidateQueries({ queryKey: ["posts"] });
        },
        onError: (e) => {
            toast.error(e.message)
        }
    })
}

export default useDeletPost