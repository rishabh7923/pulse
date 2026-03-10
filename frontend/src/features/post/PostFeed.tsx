import PostCard from './PostCard'
import PostCardSkeleton from './PostCardSkeleton'

function PostFeed() {
    return (
        <ul className='mt-2'>
            <PostCard
                id="1"
                author="Anonymous"
                createdAt="2h ago"
                content="I swear our DBMS teacher thinks we are preparing for ISRO interviews."
                image="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d"
                likes={24}
                comments={8}
                liked={false}
                saved={false}
            />
            <PostCard
                id="1"
                author="Anonymous"
                createdAt="2h ago"
                content="I swear our DBMS teacher thinks we are preparing for ISRO interviews."
                image="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d"
                likes={24}
                comments={8}
                liked={false}
                saved={false}
            />
            <PostCard
                id="1"
                author="Anonymous"
                createdAt="2h ago"
                content="I swear our DBMS teacher thinks we are preparing for ISRO interviews."
                image="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d"
                likes={24}
                comments={8}
                liked={true}
                saved={false}
            />

            <PostCardSkeleton/>
        </ul>)
}

export default PostFeed