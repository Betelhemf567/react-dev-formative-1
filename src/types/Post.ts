// Shared type describing a single blog post.
// Keeping this in its own file lets any component (PostList, Post, future
// components like an editor or a details page) import the same shape
// instead of redefining it.
export interface Post {
  id: number;
  title: string;
  author: string;
  content: string;
  datePosted: string; // ISO date string, e.g. "2026-09-15T10:00:00Z"
}