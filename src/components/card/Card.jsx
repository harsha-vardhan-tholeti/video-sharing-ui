import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  ChannelImage,
  ChannelName,
  Container,
  Details,
  Image,
  Info,
  Texts,
  Title,
} from "./card.styles";

const Card = ({ type }) => {
  return (
    <Link to="/video/test" style={{ textDecoration: "none" }}>
      <Container type={type}>
        <Image
          type={type}
          src="https://i9.ytimg.com/vi_webp/k3Vfj-e1Ma4/mqdefault.webp?v=6277c159&sqp=CIjm8JUG&rs=AOn4CLDeKmf_vlMC1q9RBEZu-XQApzm6sA"
        />
        <Details type={type}>
          <ChannelImage type={type} />
          <Texts>
            <Title>Test Video</Title>
            <ChannelName>Dev Harsh</ChannelName>
            <Info>10,00,00,000 views 1 day ago</Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

Card.propTypes = {
  type: PropTypes.string,
};

export default Card;
