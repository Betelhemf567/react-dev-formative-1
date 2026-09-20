import styled from "styled-components";
import withLogger from "../hoc/withLogger";

// Styled-components is our second styling technique (alongside the
// external Post.css file used by the Post component).
const HeaderBar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  background-color: #1f2933;
  color: #ffffff;
`;

const Logo = styled.span`
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: 0.02em;
`;

const NavLink = styled.a`
  color: #f0f4f8;
  text-decoration: none;
  font-size: 0.95rem;
  padding: 0.4rem 0.9rem;
  border: 1px solid #4b5563;
  border-radius: 6px;

  &:hover {
    background-color: #323f4b;
  }
`;

/**
 * Header
 * A functional component showing the "Dev Insights" logo and a
 * (non-functional, per the brief) "New Post" navigation link.
 */
function Header() {
  return (
    <HeaderBar>
      <Logo>Dev Insights</Logo>
      <NavLink href="#" onClick={(e) => e.preventDefault()}>
        + New Post
      </NavLink>
    </HeaderBar>
  );
}

// Wrapped with withLogger to satisfy the HOC requirement — open the
// browser console to see the mount/unmount logs.
export default withLogger(Header);