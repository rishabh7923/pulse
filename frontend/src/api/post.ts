import { AxiosError } from "axios"
import axios from "../utils/axios"
import type { CreatePostResponse, Post } from "@/types/post"

type CreatePost = {
    content: string,
    attachments: File[]
}

type GetPostsResponse = {
    posts: Post[],
    nextCursor: string | null
}

export async function createPostApi(data: CreatePost): Promise<CreatePostResponse> {
    try {
        const res = await axios("/posts", {
            method: "POST",
            data
        })
        return res.data
    }
    catch (e: unknown) {
        if (e instanceof AxiosError) {
            return e.response?.data.error
        }
        throw new Error("something went wrong while creating post")
    }
}
export async function getPostsApi(cursor: string | null = null): Promise<GetPostsResponse> {
    try {
            const url = cursor ? `/posts?cursor=${cursor}` : `/posts`;
        const res = await axios(url);
        return { posts: res.data.data.posts as unknown as Post[], nextCursor: res.data.pagination.next_cursor as string | null }
    } catch (e: unknown) {
        if (e instanceof AxiosError) {
            throw new Error(e.response?.data.error.message)
        }
        throw new Error("Something went wrong");
    }
}