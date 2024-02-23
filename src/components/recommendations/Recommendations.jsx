import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Container } from "./recommendations.styles";
import Card from "../../components/card/Card";
import axios from "axios";

const Recommendations = ({ tags }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`videos/tags?tags=${tags}`);
      setVideos(res.data);
    };

    fetchVideos();
  }, [tags]);

  return (
    <Container>
      {videos.map((video) => (
        <Card type="sm" key={video._id} video={video} />
      ))}
    </Container>
  );
};
Recommendations.propTypes = {
  tags: PropTypes.array,
};

export default Recommendations;
