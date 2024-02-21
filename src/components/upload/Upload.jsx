import PropTypes from "prop-types";
import {
  Button,
  Close,
  Container,
  Cross,
  Desc,
  Input,
  Label,
  Tag,
  Tags,
  Title,
  Wrapper,
} from "./upload.styles";
import { useEffect, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Upload = ({ setOpen }) => {
  const [img, setImg] = useState(null);
  const [video, setVideo] = useState(null);
  const [imgPercent, setImgPercent] = useState(0);
  const [videoPercent, setVideoPercent] = useState(0);
  const [inputs, setInputs] = useState({
    title: "",
    desc: "",
    imgUrl: "",
    videoUrl: "",
  });
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    video && uploadFile(video, "videoUrl");
  }, [video]);

  useEffect(() => {
    img && uploadFile(img, "imgUrl");
  }, [img]);

  const handleTag = (e) => {
    setTag(e.target.value);
  };

  const uploadFile = (file, urlType) => {
    const storage = getStorage();

    const fileName = new Date().getTime() + file.name;

    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgUrl"
          ? setImgPercent(Math.round(progress))
          : setVideoPercent(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      // eslint-disable-next-line no-unused-vars
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };

  const handleTags = (e) => {
    if (e.key === "Enter" && tag.trim() !== "") {
      setTags((prevTags) => [...prevTags, tag.trim()]);
      setTag("");
    }
  };

  const removeTag = (index) => {
    setTags((prevTags) => prevTags.filter((_, i) => i !== index));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      "videos/",
      { ...inputs, tags },
      { withCredentials: true }
    );
    setOpen(false);
    res.status = 200 && navigate(`video/${res.data._id}`);
  };

  return (
    <Container>
      <Wrapper>
        <Close onClick={() => setOpen(false)}>X</Close>
        <Title>Upload a New Video</Title>
        <Label>Video:</Label>
        {videoPercent === 0 && (
          <Input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
          />
        )}
        {videoPercent > 0 &&
          videoPercent < 99 &&
          "uploading" + videoPercent + "%"}
        {videoPercent === 100 && "Video Uploaded"}

        <Input
          type="text"
          name="title"
          placeholder="title"
          onChange={handleChange}
        />
        <Desc
          name="desc"
          placeholder="Description"
          rows={8}
          onChange={handleChange}
        />
        <Tags>
          {tags.map((tag, index) => (
            <>
              <Tag key={index}>
                {tag} <Cross onClick={() => removeTag(index)}>X</Cross>
              </Tag>
            </>
          ))}
        </Tags>
        <Input
          type="text"
          placeholder="Separate the tags with commas."
          value={tag}
          onChange={handleTag}
          onKeyDown={handleTags}
        />
        <Label>Image:</Label>
        {imgPercent === 0 && (
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setImg(e.target.files[0])}
          />
        )}
        {imgPercent > 0 && imgPercent < 99 && "Uploading" + imgPercent + "%"}
        {imgPercent === 100 && "Image Uploaded"}
        <Button onClick={handleUpload}>Upload</Button>
      </Wrapper>
    </Container>
  );
};

Upload.propTypes = {
  setOpen: PropTypes.func,
};

export default Upload;
