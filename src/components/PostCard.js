import moment from "moment";
import { useNavigate } from "react-router-dom";

function PostCard({ post }) {
  const navigate = useNavigate();

  const redirectToPostDetail = () => {
    navigate(`/post/${post.objectID}`);
  };

  return (
    <div
      className="post-card my-5 shadow-md bg-orange-200 rounded-md p-3 cursor-pointer"
      onClick={redirectToPostDetail}
    >
      <div className="post-card-body flex flex-col">
        <h3 className="title text-xl">{post.title}</h3>
        <a
          href={post.url}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-xs underline text-orange-600 w-max"
        >
          {post.url}
        </a>
      </div>
      <div className="post-card-footer">
        <span className="text-xs text-gray-700">
          {post.points} points by {post.author}{" "}
          {moment(post.created_at).fromNow()} | {post.num_comments} comments
        </span>
      </div>
    </div>
  );
}

export default PostCard;
