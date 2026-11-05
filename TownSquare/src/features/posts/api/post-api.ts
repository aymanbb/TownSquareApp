import type { Post } from "../types/Post";
import type { Result } from "../utils/Result";

// Fetches the list of posts from the API and returns them as an array of Post objects.
export async function listPosts(): Promise<Post[]> {
  // console.log("Fetching posts from API...");
  // console.log("Requesting URL: /api/v1/posts");
  // console.log("Awaiting response...");

  const res = await fetch("/api/v1/posts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // console.log("Response received, parsing JSON...");
  const result: Result<Post[]> = await res.json();
  // console.log("Parsed JSON result:", result);

  if (!result.success) {
    throw new Error(result.error?.message || "Kunne ikke hente poster");
  }

  // console.log("Returning post data:", result.data ?? []);
  return result.data ?? [];
}

export async function getPostById(id: string): Promise<Post> {
  // console.log(`Fetching post with ID: ${id} from API...`);
  const res = await fetch(`/api/v1/posts/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result: Result<Post> = await res.json();
  if (!result.success) {
    throw new Error(result.error?.message || "Kunne ikke hente posten");
  }
  return result.data!;
}

export async function listPostsByRealm(realmId: number): Promise<Post[]> {
  const res = await fetch(`/api/v1/realms/posts/${realmId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result: Result<Post[]> = await res.json();

  if (!result.success) {
    throw new Error(
      result.error?.message || "Kunne ikke hente poster for dette realmet",
    );
  }

  return result.data ?? [];
}

// Ny, uten Result-wrapper – matcher controller som returnerer ren Post som JSON
export async function createPost(
  newPost: Partial<Post>,
): Promise<Post> {
  const res = await fetch("/api/v1/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPost),
  });

  let bodyText: string | undefined;

  try {
    bodyText = await res.text();
  } catch {
    bodyText = undefined;
  }

  if (!res.ok) {
    console.error("POST /api/v1/posts failed:", res.status, res.statusText, bodyText);

    let message = "Kunne ikke opprette posten";
    try {
      const json = JSON.parse(bodyText || "{}") as { message?: string };
      if (json.message) message = json.message;
    } catch {
      // ignore
    }
    throw new Error(message);
  }

  const created = bodyText ? (JSON.parse(bodyText) as Post) : ({} as Post);
  return created;
}
