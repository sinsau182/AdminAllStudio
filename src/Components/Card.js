import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';

const Container = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    background-color: lightgray;
    width: 100%;
    max-width: 470px;
    height: 140px;
    margin-bottom: 60px;
    cursor: pointer;
    gap: 10px;
    padding: 10px;
    border-radius: 10px;

    @media (max-width: 768px) {
        flex-direction: row;
        height: auto;
        padding: 10px;
    }
`;

const Image = styled.img`
    width: 200px;
    height: 120px;
    background-color: #999;
    border-radius: 10px;
    object-fit: cover;

    @media (max-width: 768px) {
        width: 150px;
        height: 100px;
    }
`;

const Details = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    height: 100%;

    @media (max-width: 768px) {
        width: 100%;
        height: auto;
    }
`;

const Title = styled.h4`
    font-size: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const Description = styled.h5`
    margin-top: 5px;
    font-size: 14px;
    color: #666;  
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const Author = styled.div`
    font-size: 14px;
    color: ${({ theme }) => theme.textSoft};
    margin-right: 10px;
`;

const Button = styled.button`
    padding: 2px 10px;
    background-color: transparent;
    border: 1px solid black;
    color: black;
    border-radius: 5px;
    font-weight: 500;
    display: flex;
    align-items: center;
    cursor: pointer;

    &:hover {
        background-color: black;
        color: white;
    }
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

const Buttons = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 10px;
`;

export default function Card({ video, onDelete }) {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const token = localStorage.getItem("token");

    const handleDelete = async () => {
        try {
            await axios.delete(`${baseUrl}/videos/${video._id}`, { headers: { Authorization: token } });
            onDelete(video._id);
            console.log('Video deleted:', video._id);
        } catch (error) {
            console.error('Error deleting video:', error);
        }
    };

    return (
        <Container>
            <Image src={video.imgUrl} alt={video.title} />
            <Details>
                <Wrapper>
                    <Title>{video.title}</Title>
                    <Author>by {video.author}</Author>
                </Wrapper>
                <Description>{video.desc}</Description>
                <Buttons>
                    <Button onClick={handleDelete}>
                        <DeleteIcon />
                        Delete
                    </Button>
                </Buttons>
            </Details>
        </Container>
    );
}
