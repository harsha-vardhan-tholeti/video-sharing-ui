import { useEffect, useState } from "react";
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
import { format } from "timeago.js";
import axios from "axios";

const Card = ({ type, video }) => {
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchChannel = async () => {
      const res = await axios.get(`users/${video?.userId}`);
      setChannel(res?.data);
    };
    fetchChannel();
  }, [video?.userId]);

  return (
    <Link to={`/video/${video?._id}`} style={{ textDecoration: "none" }}>
      <Container type={type}>
        <Image type={type} src={video?.imgUrl} />
        <Details type={type}>
          <ChannelImage type={type} src={channel?.img} />
          <Texts>
            <Title>{video?.title}</Title>
            <ChannelName>{channel?.name}</ChannelName>
            <Info>
              {video?.views} views {format(video?.createdAt)}
            </Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

Card.propTypes = {
  type: PropTypes.string,
  video: PropTypes.object,
};

export default Card;
