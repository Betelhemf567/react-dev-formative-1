import type { Post as PostType } from "../types/Post";
import Post from "./Post";

// Hardcoded sample posts. One date is set to "now" at module load time so
// that the "New!" badge on Post has something to actually demonstrate —
// the other two are backdated by a few days.
const now = new Date();
const daysAgo = (days: number) => {
  const d = new Date(now);
  d.setDate(d.getDate() - days);
  return d.toISOString();
};

const samplePosts: PostType[] = [
  {
    id: 1,
    title: "Getting Started with Vite + TypeScript",
    author: "Amina Rossi",
    content:
      "Vite gives you a dev server with near-instant hot module replacement, and pairing it with TypeScript catches type errors before they ever hit the browser. Here's how I set up a new project in under five minutes.",
    datePosted: now.toISOString(),
  },
  {
    id: 2,
    title: "Why We Switched to Functional Components",
    author: "Jonas Mensah",
    content:
      "Class components served us well for years, but hooks made our logic easier to share and test. This post walks through the refactor we did on our dashboard module and what we learned along the way.",
    datePosted: daysAgo(2),
  },
  {
    id: 3,
    title: "Three CSS-in-JS Patterns Worth Knowing",
    author: "Amina Rossi",
    content:
      "Styled components, CSS modules, and inline styles each solve a slightly different problem. Here's a quick comparison of when to reach for each one, based on a few projects at Dev Insights.",
    datePosted: daysAgo(5),
  },
];

/**
 * PostList
 * Displays the list of blog posts. Each Post gets a stable, unique `key`
 * (the post's own id) rather than the array index — this is the list
 * optimization requirement, and it also keeps React's reconciliation
 * correct if posts are ever reordered or filtered.
 */
function PostList() {
  return (
    <section aria-label="Blog posts">
      {samplePosts.map((post) => (
        <Post key={post.id} post={post} highlightAuthor="Amina Rossi" />
      ))}
    </section>
  );
}

export default PostList;