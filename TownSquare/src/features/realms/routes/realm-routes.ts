import { route } from "rwsdk/router";
import { CreatePost, EditPost, GetPost } from "../controller/realm.controller";

export const realmRoutes = [
    route("/:id/posts/:id", {
        get: GetPost,
        post: CreatePost,
        patch: EditPost,
    })
]