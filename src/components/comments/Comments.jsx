import PropTypes from "prop-types";
import { Avatar, Container, Input, NewComment } from "./comments.styles";
import Comment from "../comment/Comment";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Comments = ({ videoId }) => {
  const { currentUser } = useSelector((state) => state.user);

  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/comments/${videoId}`);
        setComments(res.data);
      } catch (error) {
        /* empty */
      }
    };
    fetchComments();
  }, [videoId]);

  return (
    <Container>
      <NewComment>
        <Avatar src={currentUser?.img} />
        <Input placeholder="Add a comment..." />
      </NewComment>
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </Container>
  );
};

Comments.propTypes = {
  videoId: PropTypes.string,
};

export default Comments;
