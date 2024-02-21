import { useState } from "react";
import {
  Button,
  Container,
  Input,
  Link,
  Links,
  More,
  SubTitle,
  Title,
  Wrapper,
} from "./login.styles";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loginFailed, loginStart, loginSuccess } from "../../redux/userSlice";
import { auth, provider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";

const Login = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [name, setName] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post(
        "auth/signIn",
        {
          name,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(loginSuccess(res.data.data));
    } catch (error) {
      console.log(error);
      dispatch(loginFailed());
    }
  };

  const signInWithGoogle = async () => {
    dispatch(loginStart());
    signInWithPopup(auth, provider)
      .then((result) =>
        axios.post(
          "auth/google",
          {
            name: result.user.displayName,
            email: result.user.email,
            img: result.user.photoURL,
          },
          {
            withCredentials: true,
          }
        )
      )
      .then((res) => {
        console.log(res);
        dispatch(loginSuccess(res.data));
      })
      .catch((error) => {
        console.log(error);
        console.log(loginFailed());
      });
  };

  return (
    <Container>
      <Wrapper>
        <Title>Sign In</Title>
        <SubTitle>to continue to YouTube</SubTitle>
        <Input
          placeholder="username"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin}>Sign In</Button>
        <Title>Or</Title>
        {!currentUser && (
          <>
            <Button onClick={signInWithGoogle}>SignIn with Google</Button>
            <Title>Or</Title>
          </>
        )}
        <Input
          placeholder="username"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button>Sign Up</Button>
      </Wrapper>
      <More>
        English(IN)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  );
};

export default Login;
