import Header from "./components/Header";
import PostList from "./components/PostList";
import "./styles/App.css";

function App() {
  return (
    <div className="app">
      <Header />
      <main className="app__main">
        <h1 className="app__heading">Latest Posts</h1>
        <PostList />
      </main>
    </div>
  );
}

export default App;