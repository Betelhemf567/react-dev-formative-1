# Mini Blog — Dev Insights

An internal "Mini Blog" platform for Dev Insights employees to share quick
tips, insights, and updates related to web development. Built as a
formative assessment covering React fundamentals, TypeScript, component
design, styling, and basic optimization.

## Tech Stack

- **Vite** — dev server and build tool
- **React** + **TypeScript**
- **styled-components** — CSS-in-JS for the `Header`
- Plain **external CSS** for the `App` shell and `Post` card

## Getting Started

This project was scaffolded with Vite, so the usual Vite workflow applies.

```bash
# 1. Clone the repository
git clone https://github.com/Betelhemf567/react-dev-formative-1.git
cd react-dev-formative-1

# 2. Install dependencies
npm install

# 3. Run the dev server
npm run dev
# Vite will print a local URL (usually http://localhost:5173)

# 4. Build for production
npm run build

# 5. Preview the production build
npm run preview

# 6. Lint
npm run lint
```

No environment variables or backend are required — all post data is
hardcoded in `PostList.tsx` for this stage of the project.

## Project Structure
src/
components/
Header.tsx # Logo + "New Post" link, wrapped with withLogger
PostList.tsx # Hardcoded sample posts, renders a list of <Post>
Post.tsx # Single post card, memoized
styles/
App.css # Layout for the app shell
Post.css # External stylesheet for the Post card
index.css # Global resets and base typography
hoc/
withLogger.tsx # HOC that logs mount/unmount to the console
types/
Post.ts # Shared Post interface used across components
utils/
postUtils.ts # getPreview, isWithinLast24Hours, formatPostDate
App.tsx # Root component — renders Header + PostList
main.tsx # Entry point


## Component Design Choices

### Functional vs. class components

Every component in this project is a **functional component**. For a
small, self-contained UI like this one there's no lifecycle logic complex
enough to need a class: `Post` and `PostList` are effectively pure
render functions of their props, and `Header` only needed a lifecycle
hook (`useEffect`, via `withLogger`) to log mount/unmount — which hooks
handle without any of the constructor/`this`-binding boilerplate a class
component would need. Functional components also compose more naturally
with `React.memo` and custom hooks, which is why `Post` is wrapped in
`memo` directly rather than extending `PureComponent`.

## Styling

Two styling methods are used, as required:

1. **External CSS** (`src/styles/Post.css`, `App.css`, `index.css`) for
   the layout and the `Post` card's base look.
2. **styled-components** for the `Header` — a good fit there because the
   header is small, self-contained, and benefits from colocated styles.

**Conditional styling** appears in two places on `Post`:

- A **"New!" badge** is shown next to any post whose `datePosted` is
  within the last 24 hours.
- Posts by a specific featured author (`highlightAuthor`, currently set
  to `"Amina Rossi"` in `PostList`) get a warm background/border via an
  **inline style** — the second styling technique on the same component,
  applied only when `post.author` matches.

## Optimization & HOCs

- **`React.memo`** wraps `Post`, so if `PostList` re-renders for an
  unrelated reason, individual `Post` instances skip re-rendering unless
  their own props actually changed.
- **Keyed list rendering** — `PostList` maps over `samplePosts` using
  `key={post.id}` (a stable id) rather than the array index.
- **`withLogger` HOC** wraps `Header` and logs
  `"[withLogger] Header mounted"` / `"...unmounted"` to the browser
  console.

## Challenges & Reflection

The trickiest part was getting the `withLogger` HOC to preserve the
wrapped component's prop types — TypeScript's generic `ComponentType<P>`
took a bit of trial and error before the Header's props flowed through
correctly. I also ran into a build error partway through from a missing
component file (`PostList.tsx`), which was a useful reminder to run
`tsc -b` after creating each new file rather than waiting until the end
to check everything compiles. Deciding where to put the conditional
styling logic (the "New!" badge and the author highlight) took some
thought too — I settled on computing both as booleans up front in `Post`
so the JSX itself stayed readable instead of nesting ternaries inline.
Getting git authentication working with GitHub was also a small hurdle,
since password auth is no longer supported and a Personal Access Token
is required instead.

## External Libraries

- `styled-components` (+ `@types/styled-components`) — CSS-in-JS for the
  `Header` component.
- No other runtime dependencies beyond the Vite React/TypeScript
  scaffold (`react`, `react-dom`).
  