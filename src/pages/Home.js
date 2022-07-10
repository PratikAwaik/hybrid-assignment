import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import LoadingWrapper from "../components/LoadingWrapper";
import PostCard from "../components/PostCard";

function Home() {
  const [posts, setPosts] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (posts.length === 0 && searchParams.has("searchText")) {
      fetchPosts();
    }
  }, []); // eslint-disable-line

  const changeSearchText = ({ target: { value } }) => {
    setSearchParams({ searchText: value });
  };

  const fetchPosts = async (e) => {
    if (e) e.preventDefault();

    setShowLoading(true);
    const response = await axios.get(
      `https://hn.algolia.com/api/v1/search?query=${searchParams.get(
        "searchText"
      )}`
    );
    setPosts(response.data.hits);
    setShowLoading(false);
  };

  return (
    <div>
      <form
        className="search w-full flex items-center border border-orange-400 rounded-md my-5"
        onSubmit={fetchPosts}
      >
        <input
          className="w-4/5 p-3 outline-none rounded-tl-md rounded-bl-md"
          type="text"
          value={searchParams.get("searchText") || ""}
          onChange={changeSearchText}
          placeholder="Search HackerNews..."
        />
        <button
          type="submit"
          className="w-1/5 p-3 rounded-tr-md rounded-br-md bg-orange-400"
        >
          Search
        </button>
      </form>
      <LoadingWrapper showLoading={showLoading}>
        {posts.length === 0 ? (
          <div className="my-5 text-center">
            No posts found. Try searching again
          </div>
        ) : (
          <div className="home mb-10">
            {posts.map((post) => (
              <PostCard key={post.objectID} post={post} />
            ))}
          </div>
        )}
      </LoadingWrapper>
    </div>
  );
}

export default Home;
