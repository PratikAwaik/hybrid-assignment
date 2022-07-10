import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";

function App() {
  return (
    <div className="App mt-5 mx-auto max-w-6xl">
      <h1 className="text-4xl bg-orange-300 text-white p-3 rounded-md">
        Hacker News
      </h1>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<PostDetail />} path="/post/:id" />
      </Routes>
    </div>
  );
}

export default App;
