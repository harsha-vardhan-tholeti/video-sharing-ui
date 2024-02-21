import {
  AddTaskOutlined,
  ReplyOutlined,
  ThumbDown,
  ThumbDownOffAltOutlined,
  ThumbUpAlt,
  ThumbUpOffAlt,
} from "@mui/icons-material";
import {
  Button,
  Buttons,
  Channel,
  ChannelCounter,
  ChannelDetails,
  ChannelInfo,
  ChannelName,
  Container,
  Content,
  Description,
  Details,
  Hr,
  Image,
  Info,
  Subscribe,
  Title,
  VideoFrame,
  VideoWrapper,
} from "./video.styles";
import Comments from "../../components/comments/Comments";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { dislike, fetchSuccess, like } from "../../redux/videoSlice";
import { format } from "timeago.js";
import { subscription } from "../../redux/userSlice";
import Recommendations from "../../components/recommendations/Recommendations";

const Video = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch();

  const path = useLocation().pathname.split("/")[2];

  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const videoRes = await axios.get(`videos/${path}`);
        const channelRes = await axios.get(`users/${videoRes.data.userId}`);
        dispatch(fetchSuccess(videoRes.data));
        setChannel(channelRes.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchVideo();
  }, [path, dispatch]);

  const handleLike = async () => {
    await axios.patch(`users/like/${currentVideo._id}`, {
      withCredentials: true,
    });
    dispatch(like(currentUser._id));
  };

  const handleDislike = async () => {
    await axios.patch(`users/dislike/${currentVideo._id}`, {
      withCredentials: true,
    });
    dispatch(dislike(currentUser._id));
  };

  const handleSubscribe = async () => {
    if (
      currentUser.subscribedChannels.includes(channel._id) &&
      currentUser.subscribedChannels.length > 0
    ) {
      await axios.patch(`users/unsubscribe/${channel._id}`, {
        withCredentials: true,
      });
    } else {
      await axios.patch(`users/subscribe/${channel._id}`, {
        withCredentials: true,
      });
    }
    dispatch(subscription(channel._id));
  };

  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame src={currentVideo?.videoUrl} controls />
        </VideoWrapper>
        <Title>{currentVideo?.title}</Title>
        <Details>
          <Info>
            {currentVideo?.views} views {format(currentVideo?.createdAt)}
          </Info>
          <Buttons>
            <Button onClick={handleLike}>
              {currentVideo?.likes?.includes(currentUser._id) ? (
                <ThumbUpAlt />
              ) : (
                <ThumbUpOffAlt />
              )}{" "}
              {currentVideo?.likes?.length}
            </Button>
            <Button onClick={handleDislike}>
              {currentVideo?.disLikes?.includes(currentUser._id) ? (
                <ThumbDown />
              ) : (
                <ThumbDownOffAltOutlined />
              )}{" "}
              Dislike
            </Button>
            <Button>
              <ReplyOutlined /> Share
            </Button>
            <Button>
              <AddTaskOutlined /> Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={channel?.img} />
            <ChannelDetails>
              <ChannelName>{channel?.name}</ChannelName>
              <ChannelCounter>
                {channel?.subscribers} subscribers
              </ChannelCounter>
              <Description>{currentVideo?.desc}</Description>
            </ChannelDetails>
          </ChannelInfo>
          <Subscribe onClick={handleSubscribe}>
            {currentUser.subscribedChannels?.includes(channel._id)
              ? "SUBSCRIBED"
              : "SUBSCRIBE"}
          </Subscribe>
        </Channel>
        <Hr />
        <Comments videoId={currentVideo._id} />
      </Content>
      <Recommendations tags={currentVideo.tags} />
    </Container>
  );
};

export default Video;
