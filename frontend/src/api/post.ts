import { AxiosError } from "axios"
import axios from "../utils/axios"
import type { CreatePostResponse } from "@/types/post"

type CreatePost = {
    content: string,
    attachments: File[]
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