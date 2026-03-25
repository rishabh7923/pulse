import {deleteCommentApi } from "@/api/comment";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function useDeleteComment() {
    const queryClient = useQueryClient();
    const { pid } = useParams();
    const {mutate:deleteComment, status} = useMutation({
        mutationFn: deleteCommentApi,

        onSuccess: () => {
            toast.success("comment deleted successfully");

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
    return {deleteComment, status};
}
