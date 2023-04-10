import { Button, TextField, Typography } from "@material-ui/core";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import useStyles from "./styles";
import { commentPost } from "../../actions/posts";
const CommentSection = ({ post }) => {
  const classes = useStyles();
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");

  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  const handleClick = async () => {
    let userName = user?.result?.name;
    if (typeof userName === "undefined") {
      userName = user.name;
    }
    const finalComment = `${userName}: ${comment}`;
    const newComments = await dispatch(commentPost(finalComment, post._id));
    setComments(newComments);
    setComment("");
    commentRef.current.scrollIntoView({ behaviour: "smooth" });
  };

  const commentRef = useRef();
  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {comments.map((c, i) => (
            <Typography>{c}</Typography>
          ))}
          <div ref={commentRef} />
        </div>
        {user?.result?.name || user?.name ? (
          <div style={{ width: "70%" }}>
            <Typography gutterBottom variant="h6">
              Write a Comment
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              label="Comment"
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              style={{ marginTop: "10px" }}
              fullWidth
              disabled={!comment}
              variant="contained"
              onClick={handleClick}
            >
              Comment
            </Button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
