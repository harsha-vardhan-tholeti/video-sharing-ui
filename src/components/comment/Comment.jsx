import { Avatar, Container, Date, Details, Name, Text } from "./comment.styles";

const Comment = () => {
  return (
    <Container>
      <Avatar />
      <Details>
        <Name>
          Harsha <Date>1 day ago</Date>
        </Name>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint omnis
          iure magni corporis veritatis ducimus doloremque explicabo totam,
          temporibus ipsum error assumenda, facilis soluta modi quos
          perferendis? Possimus, nihil fugiat!
        </Text>
      </Details>
    </Container>
  );
};

export default Comment;
