import styled, { ThemeProvider } from "styled-components";
import bg from './img/bg.png';
import Navbar from "./Components/Navbar";
import { useRef, useState } from "react";
import Menu from "./Components/Menu";
import { darkTheme, lightTheme } from "./utils/Theme";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Components/Pages/Home";
import Approach from "./Components/Pages/Approach";
import Video from "./Components/Pages/Video";
import SignIn from "./Components/Pages/SignIn";
import { useSelector } from "react-redux"; // Assuming you're using Redux for authentication state

const Container = styled.div`
  display: flex;
  height: 100vh;
  overflow: auto;
`;

const Main = styled.div`
  flex: 11;
`;

const Wrapper = styled.div`
  padding: 22px 10px;
`;

function App() {
  const [theme, setTheme] = useState(true);
  const authToken = localStorage.getItem('token');
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  
return (
  <AppStyled bg={bg} className="App">
    <ThemeProvider theme={theme ? darkTheme : lightTheme}>
      <Navbar />
      <Container>
        <Main>
          <Wrapper>
            <Routes>
              <Route path="/signin" element={authToken ? <Navigate to="/" /> : <SignIn />} />
              <Route path="/" element={authToken ? <Home /> : <Navigate to="/signin" />} />
              <Route path="approach" element={authToken ? <Approach /> : <Navigate to="/signin" />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Wrapper>
        </Main>
      </Container>
    </ThemeProvider>
  </AppStyled>
);
}

const AppStyled = styled.div`
  background-image: url(${(props) => props.bg});
`;

export default App;
