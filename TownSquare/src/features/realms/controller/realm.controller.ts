import { CreatePostService, EditPostService, GetPostService } from "../service/realm.service";

export function GetPost() {
    return GetPostService;
}

export function CreatePost() {
    return CreatePostService;
}

export function EditPost() {
    return EditPostService;
}