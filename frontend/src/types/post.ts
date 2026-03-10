export type CreatePostResponse = {
    success: boolean;
    message: string;
    data: Post
}

export type Post = {
    id: string;
    content: string;
    attachments: PostImage[];
    user_id: number;

}

export type PostImage = {
    id: number | string
    url: string;
    type: string;
}