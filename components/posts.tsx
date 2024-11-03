"use client";

import { useOptimistic } from "react";
import { formatDate } from "@/lib/format";
import LikeButton from "./like-icon";
import Post from "@/types/Post";
import { togglePostLikeStatus } from "@/lib/actions";

export default function Posts({ posts }: { posts: Post[] }) {
  const [optimisticPosts, optimisticUpdatePosts] = useOptimistic(
    posts,
    (prevPosts, updatedPostId: number): Post[] => {
      const targetPostIndex = prevPosts.findIndex(
        (post) => post.id === updatedPostId,
      );

      if (targetPostIndex === -1) return prevPosts;

      const updatedPost = { ...prevPosts[targetPostIndex] };
      // updatedPost.likes = updatedPost.likes! + (!updatedPost.isLiked ? 1 : -1);
      updatedPost.isLiked = !updatedPost.isLiked;

      const newPosts = [...prevPosts];
      newPosts[targetPostIndex] = updatedPost;

      return newPosts;
    },
  );

  return (
    <ul className="posts">
      {optimisticPosts.map((post) => (
        <li key={post.id}>
          <article className="post">
            <div className="post-image">
              <img src={post.image} alt={post.title} />
            </div>
            <div className="post-content">
              <header>
                <div>
                  <h2>{post.title}</h2>
                  <p>
                    Shared by {post.userFirstName} on{" "}
                    <time dateTime={post.createdAt}>
                      {formatDate(post.createdAt!)}
                    </time>
                  </p>
                </div>
                <div>
                  <form
                    action={async () => {
                      optimisticUpdatePosts(post.id!);
                      await togglePostLikeStatus(post.id!);
                    }}
                    className={post.isLiked ? "liked" : ""}
                  >
                    <LikeButton />
                  </form>
                </div>
              </header>
              <p>{post.content}</p>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
