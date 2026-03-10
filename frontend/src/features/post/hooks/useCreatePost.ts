import { createPostApi } from "@/api/post";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

function useCreatePost({ onSuccess, onError }: { onSuccess: () => void, onError: () => void }) {
    const { isSuccess, data, error, status, mutate: createPost } = useMutation({
        mutationFn: createPostApi,
        onSuccess: () => {
            toast("Post created successfully");
            if (onSuccess) onSuccess();
        },
        onError: (e) => {
            toast(e.message);
            if (onError) onError();
        }
    })
    return { createPost, isSuccess, data, error, status }
}

export default useCreatePost