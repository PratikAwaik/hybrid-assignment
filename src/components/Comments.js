import Comment from "./Comment";

function Comments({ comments }) {
  return (
    <div className="comments">
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}

export default Comments;
