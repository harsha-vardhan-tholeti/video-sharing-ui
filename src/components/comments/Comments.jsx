import { Avatar, Container, Input, NewComment } from "./comments.styles";
import Comment from "../comment/Comment";

const Comments = () => {
  return (
    <Container>
      <NewComment>
        <Avatar />
        <Input placeholder="Add a comment..." />
      </NewComment>
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
    </Container>
  );
};

export default Comments;
