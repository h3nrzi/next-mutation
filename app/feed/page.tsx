import { getPosts } from "@/lib/posts";
import Posts from "@/components/posts";

export default async function FeedPage() {
  const posts = await getPosts();

  return (
    <>
      <h1>All posts by all users</h1>
      {!posts || posts.length === 0 ? (
        <p>There are no posts yet. Maybe start sharing some?</p>
      ) : (
        <Posts posts={posts} />
      )}
    </>
  );
}
