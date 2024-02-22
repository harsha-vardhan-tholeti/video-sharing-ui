import { useState } from "react";
import {
  Button,
  Container,
  Input,
  Link,
  Links,
  More,
  PageLink,
  SubTitle,
  Title,
  Wrapper,
} from "./signup.styles";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loginFailed, loginStart, loginSuccess } from "../../redux/userSlice";
import { auth, provider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "auth/signUp",
        {
          name,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      navigate("/signIn");
    } catch (error) {
      console.log(error);
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
        navigate("/signIn");
      })
      .catch((error) => {
        console.log(error);
        console.log(loginFailed());
      });
  };

  return (
    <Container>
      <Wrapper>
        <Title>Sign Up</Title>
        <SubTitle>to continue to YouTube</SubTitle>
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
        <PageLink onClick={() => navigate("/signIn")}>
          Already have a account?
        </PageLink>
        <Button onClick={handleSignUp}>Sign Up</Button>
        <Title>Or</Title>
        {!currentUser && (
          <>
            <Button onClick={signInWithGoogle}>Sign Up with Google</Button>
          </>
        )}
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

export default SignUp;
