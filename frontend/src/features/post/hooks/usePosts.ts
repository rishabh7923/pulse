import { useInfiniteQuery } from "@tanstack/react-query";
import { getPostsApi } from "@/api/post";

function usePosts() {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status, error } =
        useInfiniteQuery({
            queryKey: ["posts"],
            queryFn: ({ pageParam }: { pageParam: null | string }) => getPostsApi(pageParam),
            initialPageParam: null,
            getNextPageParam: (lastPage) => lastPage.nextCursor,
        });

    return { data, fetchNextPage, hasNextPage, isFetchingNextPage, status, error };
}

export default usePosts;