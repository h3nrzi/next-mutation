import { Suspense } from "react";
import { getPosts } from "@/lib/posts";
import Posts from "@/components/posts";

export default async function Home() {
  const latestPosts = await getPosts(2);

  return (
    <>
      <h1>Welcome back!</h1>
      <p>Here's what you might've missed.</p>
      <section id="latest-posts">
        <Suspense fallback={<p>Loading recent posts...</p>}>
          {!latestPosts || latestPosts.length === 0 ? (
            <p>There are no posts yet. Maybe start sharing some?</p>
          ) : (
            <Posts posts={latestPosts} />
          )}
        </Suspense>
      </section>
    </>
  );
}
