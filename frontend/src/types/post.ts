export type CreatePostResponse = {
    success: boolean;
    message: string;
    data: Post
}


export type CreatePostSchema = {
    content: string,
    category_id:string,
    attachments: File[]
}
export type Post = {
    id: string;
    user_id: string;
    created_at:string;
    content: string;
    attachments: PostImage[];
    liked:boolean
    likes_count:number
}

export type PostImage = {
    id: number | string
    url: string;
    type: string;
    post_id:number;
    created_at:string;

}