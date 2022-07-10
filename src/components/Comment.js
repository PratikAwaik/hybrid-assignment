import moment from "moment";

function Comment({ comment }) {
  return (
    <div
      className="comment mb-5"
      id={comment.id}
      style={{ marginLeft: `${comment.level * 25}px` }}
    >
      <div className="comment-header">
        <span className="text-xs text-gray-700">
          {comment.author} {moment(comment.created_at).fromNow()}
        </span>
      </div>
      <div
        className="comment-body text-sm"
        dangerouslySetInnerHTML={{ __html: comment.text }}
      ></div>
    </div>
  );
}

export default Comment;
