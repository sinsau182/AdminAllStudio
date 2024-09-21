import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import axios from 'axios';
import MsgCards from '../MsgCards';

const Container = styled.div`
  flex: 1;
  margin-bottom: 60px;
  padding-bottom: 20px;

  @media (max-width: 768px) {
    padding-bottom: 10px;
  }
`;

export default function Approach() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem("token");

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await axios.get(`${baseUrl}/messages/all`, { headers: { Authorization: token, } });
      setMessages(res.data);
    }
    fetchMessages();
  }, []);

  const handleDelete = (id) => {
    setMessages(messages.filter((msg) => msg._id !== id));
}

  return (
    <Container>
      {messages.map((message) => (
        <MsgCards key={message._id} message={message} onDelete={handleDelete} />
      ))}
    </Container>
  )
}
