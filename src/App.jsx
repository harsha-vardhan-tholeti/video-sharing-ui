import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { Container, Main, Wrapper } from "./app.styles";
import Menu from "./components/menu/Menu";
import Navbar from "./components/navbar/Navbar";
import { darkTheme, lightTheme } from "./utils/Theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/homepage/Home";
import Video from "./pages/videopage/Video";
import Login from "./pages/loginpage/Login";
import axios from "axios";
import Search from "./pages/searchpage/Search";
import SignUp from "./pages/signuppage/SignUp";

const App = () => {
  axios.defaults.baseURL = "https://vs-api.onrender.com/api/v1/";

  axios.defaults.withCredentials = true;

  const [darkMode, setDarkMode] = useState(true);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <BrowserRouter>
          <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
          <Main>
            <Navbar />
            <Wrapper>
              <Routes>
                <Route path="/">
                  <Route index element={<Home type="random" />} />
                  <Route path="trends" element={<Home type="trending" />} />
                  <Route
                    path="subscriptions"
                    element={<Home type="subscribed" />}
                  />
                  <Route path="search" element={<Search />} />
                  <Route index element={<Home />} />
                  <Route path="signIn" element={<Login />} />
                  <Route path="signUp" element={<SignUp />} />
                  <Route path="video" element={<Video />}>
                    <Route path=":id" element={<Video />} />
                  </Route>
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
};

export default App;
