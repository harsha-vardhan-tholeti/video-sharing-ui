import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import { Container } from "./home.styles";
import axios from "axios";

const Home = ({ type }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`videos/${type}`, {
        withCredentials: type === "subscribed" ? true : false,
      });
      setVideos(res.data);
    };
    fetchVideos();
  }, [type]);

  return (
    <Container>
      {videos?.map((video) => (
        <Card key={video?._id} video={video} />
      ))}
    </Container>
  );
};

Home.propTypes = {
  type: PropTypes.string,
};

export default Home;
