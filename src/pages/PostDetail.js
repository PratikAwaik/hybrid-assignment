import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comments from "../components/Comments";
import LoadingWrapper from "../components/LoadingWrapper";
import { addLevelToComments, getCommentsFlattened } from "../utils/helpers";

function PostDetail() {
  const [postDetail, setPostDetail] = useState({});
  const [comments, setComments] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    setError(null);
    fetchPostDetail();
  }, []); // eslint-disable-line

  const fetchPostDetail = async () => {
    try {
      const response = await axios.get(
        `https://hn.algolia.com/api/v1/items/${id}`
      );
      setPostDetail(response.data);

      const flattenedComments = getCommentsFlattened(response.data.children);
      const levelledComments = addLevelToComments(flattenedComments);
      setComments(levelledComments);
    } catch (error) {
      setError(
        "Some Error occured while trying to fetch the post. Either go back or please try refreshing."
      );
    }
    setShowLoading(false);
  };

  return (
    <LoadingWrapper showLoading={showLoading}>
      {error ? (
        <div className="my-5 text-center">{error}</div>
      ) : (
        <div className="post-detail my-10 bg-orange-200 p-3 rounded-md">
          <div className="post-detail-body mb-5">
            <div className="flex flex-col">
              <h3 className="title text-xl">{postDetail.title}</h3>
              <a
                href={postDetail.url}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-xs underline text-orange-600 w-max"
              >
                {postDetail.url}
              </a>
            </div>
            <div>
              <span className="text-xs text-gray-700">
                {postDetail.points} points by {postDetail.author}{" "}
                {moment(postDetail.created_at).fromNow()} | {comments.length}{" "}
                comments
              </span>
            </div>
          </div>
          <div className="separator h-px w-full bg-orange-600 mb-5"></div>
          <div className="post-detail-comments">
            <Comments comments={comments} />
          </div>
        </div>
      )}
    </LoadingWrapper>
  );
}

export default PostDetail;
