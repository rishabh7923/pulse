import useInfinitePosts from './hooks/useInfinitePosts';
import usePosts from './hooks/usePosts'
import PostCard from './PostCard'
import PostCardSkeleton from './PostCardSkeleton'

function PostFeed() {
    const { data, isFetchingNextPage, status, error, fetchNextPage } = usePosts();
    const lastPostRef = useInfinitePosts(fetchNextPage)

    if (status === "pending") {
        return (
            <ul className="mt-2 w-96 max-w-full">
                <PostCardSkeleton />
                <PostCardSkeleton />
                <PostCardSkeleton />
            </ul>
        );
    }

    const posts = data?.pages.flatMap((page) => page.posts) ?? [];
    return (
        <ul className="mt-2 w-96 max-w-full">
            {posts.map((post, i) => (
                <PostCard
                    key={post.id}
                    id={post.id}
                    author={post.user_id}
                    createdAt="2h ago"
                    content={post.content}
                    image={post.attachments?.[0]?.url as unknown as string}
                    likes={24}
                    comments={8}
                    liked={false}
                    saved={false}
                    ref={i === posts.length - 1 ? lastPostRef : null}
                />
            ))}

            {isFetchingNextPage && <PostCardSkeleton />}
            {status === "error" && <p>{error?.message}</p>}
        </ul>
    );
}

export default PostFeed