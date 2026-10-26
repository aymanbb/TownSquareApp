import type { Post } from "../types/Post";
import type { Result } from "../utils/Result";

// Fetches the list of posts from the API and returns them as an array of Post objects.
export async function listPosts(): Promise<Post[]> {
  console.log("Fetching posts from API...");
  console.log("Requesting URL: /api/v1/posts");
  console.log("Awaiting response...");
  const res = await fetch("/api/v1/posts");
  console.log("Response received, parsing JSON...");
  const result: Result<Post[]> = await res.json();
  console.log("Parsed JSON result:", result);

  if (!result.success) {
    throw new Error(result.error?.message || "Kunne ikke hente poster");
  }

  console.log("Returning post data:", result.data ?? []);
  return result.data ?? [];
}
console.log("listPosts function defined.");
