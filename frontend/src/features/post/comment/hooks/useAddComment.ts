import { addCommentApi } from "@/api/comment";
import type { addCommentSchema } from "@/types/comment";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

function useAddComment() {
    const queryClient = useQueryClient();
    const { pid } = useParams();
    return useMutation({
        mutationFn: (data: addCommentSchema) => addCommentApi(data),

        onSuccess: () => {
            toast.success("comment added successfully");

            queryClient.invalidateQueries({
                queryKey: ["comments", pid]
            });
        },

        onError: (error: unknown) => {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("Something went wrong");
            }
        },
    });
}

export default useAddComment