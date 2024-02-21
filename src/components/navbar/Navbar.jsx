import AccountCircleOutlined from "@mui/icons-material/AccountCircleOutlined";
import {
  Button,
  Container,
  Input,
  Search,
  User,
  Wrapper,
  Avatar,
} from "./navbar.styles";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { VideoCallOutlined } from "@mui/icons-material";
import { logOut } from "../../redux/userSlice";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useState } from "react";
import Upload from "../upload/Upload";

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookies, removeCookie] = useCookies(["cookie-name"]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    await axios.post("auth/signOut", {
      withCredentials: true,
    });
    removeCookie("access_token");
    dispatch(logOut());
    navigate("/");
  };

  return (
    <>
      <Container>
        <Wrapper>
          <Search>
            <Input
              placeholder="Search"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SearchOutlinedIcon
              onClick={() => navigate(`/search?query=${searchQuery}`)}
            />
          </Search>
          {currentUser ? (
            <User>
              <VideoCallOutlined onClick={() => setOpen(true)} />
              <Avatar src={currentUser.img} />
              {currentUser.name}
              <Button onClick={handleLogOut}>Log Out</Button>
            </User>
          ) : (
            <Link to="signIn" style={{ textDecoration: "none" }}>
              <Button>
                <AccountCircleOutlined />
                SIGN IN
              </Button>
            </Link>
          )}
        </Wrapper>
      </Container>
      {open && <Upload setOpen={setOpen} />}
    </>
  );
};

export default Navbar;
