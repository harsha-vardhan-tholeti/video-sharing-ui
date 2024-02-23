import { useEffect, useState } from "react";
import { Avatar, Container, Date, Details, Name, Text } from "./comment.styles";
import PropTypes from "prop-types";
import axios from "axios";
import { format } from "timeago.js";

const Comment = ({ comment }) => {
  const [commentUser, setCommentUser] = useState({});

  useEffect(() => {
    const fetchCommentUser = async () => {
      const res = await axios.get(`users/${comment.userId}`);

      setCommentUser(res.data);
    };

    fetchCommentUser();
  }, [comment.userId]);

  return (
    <Container>
      <Avatar src={commentUser?.img} />
      <Details>
        <Name>
          {commentUser.name} <Date>{format(commentUser.createdAt)}</Date>
        </Name>
        <Text>{comment.desc}</Text>
      </Details>
    </Container>
  );
};

Comment.propTypes = {
  comment: PropTypes.object,
};

export default Comment;
