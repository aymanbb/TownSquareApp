import type { Post } from "../types/Post";

// Henter alle poster
export async function listPosts(): Promise<Post[]> {
  const res = await fetch("/api/v1/posts", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const errorBody = (await res.json()) as { message?: string };
    throw new Error(errorBody.message || "Kunne ikke hente poster");
  }

  return (await res.json()) as Post[];
}

// Henter én post
export async function getPostById(id: string | number): Promise<Post> {
  const res = await fetch(`/api/v1/posts/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const errorBody = (await res.json()) as { message?: string };
    throw new Error(errorBody.message || "Kunne ikke hente posten");
  }

  return (await res.json()) as Post;
}

// Henter poster for et realm
export async function listPostsByRealm(realmId: number): Promise<Post[]> {
  const res = await fetch(`/api/v1/realms/posts/${realmId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const body = await res.json();
  console.log(
    "listPostsByRealm HTTP body:",
    body,
    "| isArray:",
    Array.isArray(body),
  );

  if (!res.ok) {
    const message =
      (body as { message?: string }).message ||
      "Kunne ikke hente poster for dette realmet";
    throw new Error(message);
  }

  // For now, just return what we *think* it is:
  return body as Post[];
}
