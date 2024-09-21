import React, { useState } from 'react';
import styled from 'styled-components';
import logo from '../img/LogoAdmin.png'
import { Link, useNavigate } from 'react-router-dom';
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import ForumIcon from '@mui/icons-material/Forum';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/userSlice';
import axios from 'axios';

const NavbarStyled = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #1a1a1a;
  color: white;

  h1 {
    font-size: 1.5rem;
    color: white;
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-right: 0.4rem;

  h1 {
    font-size: 1.2rem;
  }
`;

const LogoImg = styled.img`
  height: 35px;

  @media (max-width: 768px) {
    height: 20px;
  }
`;

const Items = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  padding: 7.5px 0px;

  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 5px 0px;
  }
`;

const NavItems = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: flex;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

export default function Navbar() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();

const handleLogout = async () => {
    try {
      const res = await axios.post(`${baseUrl}/auth/logout`, {}, { headers: { Authorization: token } });
      if (res.status === 200) {
        dispatch(logout());
        localStorage.removeItem("token");
        navigate("/signin");
        window.location.reload();
      }

    } catch (error) {
      console.log(error);
  }
}
  
  return (
    <NavbarStyled>
      <Logo>
        <LogoImg src={logo} />
      </Logo>
      {token && (
      <NavItems>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Items>
            <VideoCallOutlinedIcon /> StudioAll
          </Items>
        </Link>
        <Link to="/approach" style={{ textDecoration: "none", color: "inherit" }}>
          <Items>
            <ForumIcon /> Queries
          </Items>
        </Link>

        <Items onClick={handleLogout}>
      <LogoutIcon /> Logout
    </Items>

      </NavItems>
      )}
    </NavbarStyled>
  );
}
