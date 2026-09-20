import { memo } from "react";
import type { Post as PostType } from "../types/Post";
import {
  formatPostDate,
  getPreview,
  isWithinLast24Hours,
} from "../utils/postUtils";
import "../styles/Post.css";

interface PostProps {
  post: PostType;
  highlightAuthor?: string;
}

// Author whose posts get a highlighted background — feeds the conditional
// styling requirement (in addition to the "New!" badge below).
const FEATURED_BACKGROUND: React.CSSProperties = {
  backgroundColor: "#fff8ec",
  borderColor: "#ffcf8f",
};

/**
 * Post
 * Renders a single blog post. This is a FUNCTIONAL component rather than a
 * class component — see README for the reasoning (hooks aren't needed here,
 * but functional components are the modern default, pair naturally with
 * React.memo for optimization, and keep the code shorter with no
 * constructor/this-binding boilerplate).
 *
 * Wrapped in React.memo so that if the parent (PostList) re-renders for an
 * unrelated reason, a Post whose own `post` and `highlightAuthor` props
 * haven't changed skips re-rendering.
 */
function Post({ post, highlightAuthor }: PostProps) {
  const isFeatured =
    highlightAuthor !== undefined &&
    post.author.toLowerCase() === highlightAuthor.toLowerCase();
  const isNew = isWithinLast24Hours(post.datePosted);

  return (
    <article
      className="post-card"
      // Inline style used here for the conditional highlight — combined
      // with the external Post.css file, this satisfies the "at least two
      // styling methods" requirement.
      style={isFeatured ? FEATURED_BACKGROUND : undefined}
    >
      <div className="post-card__header">
        <h3 className="post-card__title">{post.title}</h3>
        {isNew && <span className="post-card__badge">New!</span>}
      </div>
      <p className="post-card__meta">
        By {post.author} · {formatPostDate(post.datePosted)}
      </p>
      <p className="post-card__preview">{getPreview(post.content)}</p>
    </article>
  );
}

export default memo(Post);