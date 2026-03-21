import { AxiosError } from "axios";
import axios from "../utils/axios"

type addCommentSchema = {
    postId: string,
    content: string
}

type getPostCommentsSchema = {
    postId: string
}
export async function addCommentApi(data: addCommentSchema) {
    try {
        await axios.post(`posts/${data.postId}/comments`, {
            content: data.content
        })
    } catch (e: unknown) {
        if (e instanceof AxiosError) {
            throw new Error(e.response?.data.error.message);
        }
        throw e;
    }
}

export async function getCommentsApi({ postId }: getPostCommentsSchema) {
    try {
        const res = await axios.get(`posts/${postId}`)
        return res.data.data.comments;
    } catch (e: unknown) {
        if (e instanceof AxiosError) {
            throw new Error(e.response?.data.error.message);
        }
        throw e;
    }
}

export async function deleteCommentApi({ postId, commentId }: { postId: string, commentId: string }) {
    try {
        await axios.delete(`posts/${postId}/comments/${commentId}`)
    } catch (e: unknown) {
        if (e instanceof AxiosError) {
            throw new Error(e.response?.data.error.message);
        }
        throw e;
    }
}