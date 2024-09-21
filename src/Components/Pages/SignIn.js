import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { loginFailure, loginStart, loginSuccess } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { auth, provider } from '../../firebase';
import { signInWithPopup } from "firebase/auth";
import { error } from 'ajv/dist/vocabularies/applicator/dependencies';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 56px);
    color: ${({ theme }) => theme.text};
    padding: 20px;
`;

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 90%;
    max-width: 400px;
    background-color: ${({ theme }) => theme.bgLighter};
    border: 1px solid ${({ theme }) => theme.soft};
    padding: 40px 30px;
    gap: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    @media (max-width: 600px) {
        width: 100%;
        padding: 20px;
    }
`;

const Title = styled.div`
    font-size: 24px;
    text-align: center;

    @media (max-width: 600px) {
        font-size: 20px;
    }
`;

const SubTitle = styled.div`
    font-size: 18px;
    font-weight: 300;
    text-align: center;

    @media (max-width: 600px) {
        font-size: 16px;
    }
`;

const Input = styled.input`
    border: 2px solid ${({ theme }) => theme.soft};
    border-radius: 5px;
    padding: 10px;
    background-color: transparent;
    width: 100%;
    color: ${({ theme }) => theme.text};
    margin-bottom: 10px;

    @media (max-width: 600px) {
        padding: 8px;
        font-size: 14px;
    }
`;

const Button = styled.button`
    border-radius: 3px;
    border: none;
    padding: 10px 20px;
    font-weight: 500;
    cursor: pointer;
    background-color: ${({ theme }) => theme.soft};
    color: ${({ theme }) => theme.text};
    width: 100%;

    @media (max-width: 600px) {
        padding: 8px 16px;
        font-size: 14px;
    }
`;

const More = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    font-size: 12px;
    color: black;
    gap: 20px;

    @media (max-width: 600px) {
        flex-direction: row;
        gap: 10px;
        font-size: 10px;
    }
`;

const Links = styled.div`
    margin: 5px 0;
    cursor: pointer;
`;

const Error = styled.div`
    color: red;
    font-size: 14px;
    text-align: center;
`;

export default function SignIn() {
  const [error, setError] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const baseUrl = process.env.REACT_APP_BASE_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try{
      const res = await axios.post(`${baseUrl}/auth/signin`, {email,password})
      console.log(res.data.data.role);
      if(res?.data?.data?.role === "admin") {
        dispatch(loginSuccess(res.data?.data));
      localStorage.setItem("token", res.headers['authorization']);
      window.location.reload();
      }
      else {
        console.log("you are not admin")
        setError("You are not admin")
      }
      
    } catch(err){
      console.log(err.response.data.message);
      setError(err.response.data.message);
    }
  }

  return (
    <Container>
      <Wrapper>
        <Title> SignIn </Title>
        <SubTitle> Hello Admin ! </SubTitle>

        <Input placeholder="Email" onChange={e=>setEmail(e.target.value)}/>
        <Input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)}/>
        <Button onClick={handleLogin}> SignIn </Button>
        {error && <Error>{error}</Error>}

      </Wrapper>
      <More>
          Dawdle (IND)
        <Links>Help</Links>
        <Links>Privacy</Links>
        <Links>Terms</Links>
      </More>
    </Container>
  )
}
