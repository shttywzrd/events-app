import classes from "./CommentList.module.css";

function CommentList(props) {
  const comments = props.items;

  return (
    <ul className={classes.comments}>
      {comments.map((comment, index) => (
        <li key={index}>
          <p>{comment.text}</p>
          <div>
            By <address>{comment.username}</address>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
