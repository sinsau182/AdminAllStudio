import React from 'react';
import styled from 'styled-components';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const Container = styled.div`
    background-color: #E6E6FA;
    padding: 20px;
    margin: 10px;
    margin-bottom: 20px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    width: 97%;
    height: auto;
    gap: 10px;
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.3);

    @media (max-width: 768px) {
        padding: 15px;
        margin: 8px;
        gap: 8px;
    }
`;

const Details = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
`;

const Title = styled.h4`
    color: purple;
    font-size: 18px;
    margin-right: 10px;

    @media (max-width: 768px) {
        font-size: 16px;
    }
`;

const Description = styled.h5`
    font-size: 15px;
    color: black;
    width: 90%;
    margin-top: 8px;
    margin-bottom: 10px;

    @media (max-width: 768px) {
        font-size: 14px;
    }
`;

const NameDetails = styled.div`
    display: flex;
    gap: 10px;
    flex-wrap: wrap; // Ensures the content wraps to the next line if it doesn't fit

    @media (max-width: 768px) {
        gap: 8px;
    }
`;

const Name = styled.div`
    font-size: 17px;
    color: black;

    @media (max-width: 768px) {
        font-size: 15px;
    }
`;

const Button = styled.button`
    position: relative;
    padding: 2px 10px;
    justify-content: flex-end;
    background-color: transparent;
    border: 1px solid black;
    color: black;
    border-radius: 5px;
    font-weight: 500;
    margin-top: 0px;
    margin-left: auto;
    margin-right: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;

    @media (max-width: 768px) {
        padding: 2px 8px;
        font-size: 14px;
    }
`;

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    width: auto;
    margin-bottom: 4px;
    gap: 5px;
    justify-content: space-between;
    flex-wrap: wrap; // Wrap items on smaller screens

    @media (max-width: 768px) {
        justify-content: flex-start; // Align items to the start
        gap: 8px;
    }
`;

export default function MsgCards({ message, onDelete }) {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const token = localStorage.getItem("token");

    const handleDelete = async () => {
        try {
            await axios.delete(`${baseUrl}/messages/${message._id}`,{ headers: { Authorization: token, } });
            onDelete(message._id); // Call the onDelete function passed as a prop to update the UI
            console.log('Message deleted:', message._id);
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    };

    return (
        <Container>
            <Details>
                <Wrapper>
                    <Title>Email: {message.email}</Title>
                    <Title>Company: {message.company}</Title>
                </Wrapper>
                <Wrapper>
                    <Title>Mob No.: {message.phone}</Title>
                    <Title>Designation: {message.designation}</Title>
                </Wrapper>
                <Description>Query: {message.message}</Description>
                <Wrapper>
                    <NameDetails>
                        <Title>Name - {message.name}</Title>
                        <Name>(Username - {message.user})</Name>
                    </NameDetails>
                    <NameDetails>
                        <Title>Video Selected - {message.video}</Title>
                        <Button onClick={handleDelete}>
                            <DeleteIcon />
                            Remove
                        </Button>
                    </NameDetails>
                </Wrapper>
            </Details>
        </Container>
    );
}
