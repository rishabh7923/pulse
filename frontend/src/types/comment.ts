export type Comment = {
    id: string;
    user_id: string;
    content: string;
    user: {
        user_id: string;
        profilePic: string;
    };
    created_at:Date
}

export type addCommentSchema = {
    postId: string,
    content: string
}

export type getPostCommentsSchema = {
    postId: string
}

export type getPostCommentsResponse = Comment[]

