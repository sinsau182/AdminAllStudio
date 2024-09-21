import React, { useEffect } from 'react'
import styled from 'styled-components';
import Card from './Card';
import axios from 'axios';
import { useState } from 'react';


const Container = styled.div`
postion: absolute;
    display: column;
    flex-wrap: wrap;
    flex: 1;
    margin-bottom: 40px;
`;
const Headings = styled.div`
    display: flex;
    justify-content: flex-start;
    padding: 10px;
    margin-right: 0px;
`;

export default function AdminUploads() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            const res = await axios.get(`${baseUrl}/videos/random`);
            setVideos(res.data);
        }
        fetchVideos();
    }, []);


    const handleDelete = (id) => {
        setVideos(videos.filter((video) => video._id !== id));
    }


  return (
    <Container>
      <Headings>
        <h3>Admin Uploads</h3> 
      </Headings>
      {videos.map((video) => (
        <Card key={video._id} video={video} onDelete={handleDelete} />
      ))}
    </Container>
  )
}
