"use client";

import React, { useState } from "react";
import type { Post } from "@/features/posts/types/Post";
import { createPost } from "../../api/post-api";

type CreatePostFormProps = {
  user: { id: string } | null;
  realmId: number;
  onPostCreated?: (post: Post) => void;
  onErrorChange?: (error: string | null) => void;
};

export const CreatePostForm: React.FC<CreatePostFormProps> = ({
  user,
  realmId,
  onPostCreated,
  onErrorChange,
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    onErrorChange?.(null);

    if (!title.trim() || !content.trim()) {
      const message = "All fields must be filled out before submitting!";
      setError(message);
      onErrorChange?.(message);
      return;
    }

    if (!user) {
      const message = "You must be logged in to create a post!";
      setError(message);
      onErrorChange?.(message);
      return;
    }

    const newPost: Partial<Post> = {
      title,
      content,
      realmId,
      authorId: user.id,
    };

    try {
      const created = await createPost(newPost);

      console.log("Created post:", created);
      onPostCreated?.(created);
      setTitle("");
      setContent("");
      setError(null);
      onErrorChange?.(null);
    } catch (e) {
      console.error(e);
      const message =
        e instanceof Error ? e.message : "Unexpected error during post creation";
      setError(message);
      onErrorChange?.(message);
    }
  }

  return (
    <div
      className="
        w-full max-w-4xl
        rounded-xl
        border-2 border-white
        bg-black
        p-4
        shadow-2xl
        text-white
        mb-4
      "
    >
      <h2 className="mb-3 text-lg font-semibold">Create new post</h2>

      {error && <p className="mb-3 text-sm text-red-400">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex flex-col">
          <label htmlFor="postTitle" className="mb-1 text-sm font-medium">
            Title
          </label>
          <input
            type="text"
            id="postTitle"
            placeholder="Write your post title here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="
              rounded
              border border-gray-500
              bg-black
              px-2 py-1
              text-white
              placeholder-gray-400
              focus:border-white
              focus:outline-none
            "
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="postContent" className="mb-1 text-sm font-medium">
            Content
          </label>
          <textarea
            id="postContent"
            placeholder="Write your post content here"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="
              rounded
              border border-gray-500
              bg-black
              px-2 py-1
              text-white
              placeholder-gray-400
              focus:border-white
              focus:outline-none
              resize-y
            "
          />
        </div>

        <div className="mt-3 flex justify-end">
          <button
            type="submit"
            className="
              rounded
              border border-white
              bg-white
              px-3 py-1
              text-sm
              font-semibold
              text-black
              hover:bg-gray-200
            "
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};
