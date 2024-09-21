import React from 'react'
import styled from 'styled-components'
import BookmarkTwoToneIcon from '@mui/icons-material/BookmarkTwoTone';
import ShareIcon from '@mui/icons-material/Share';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { fetchSuccess } from '../../redux/videoSlice';
import { subscription } from '../../redux/userSlice';


const Container = styled.div`
    display: flex;
    gap: 24px;
`;

const Content = styled.div`
    flex: 5;
`;

const VideoWrapper = styled.div`

`;

const FirstLine = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: 600;
    margin-top: 20px;
    margin-bottom: 10px;
`;

const Author = styled.div`
    color: #555;
`;

const Details = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`; 

const Tags = styled.span`
    color: #555;
`;

const Buttons = styled.div`
    display: flex;
    gap: 20px;

`;

const Button = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
`;

const Hr = styled.hr`
    margin: 15px 0px;
    border: 0.5px solid #ccc;
`;

const Description = styled.p`
    font-size: 18px;
    color: #1a1a1a;
`;

const VideoFrame = styled.video`
    width: 100%;
    max-height: 720px;
    object-fit: cover;
`;

export default function Video() {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const token = localStorage.getItem("token");
    
    const { currentUser } = useSelector((state) => state.user)
    const { currentVideo } = useSelector((state) => state.video)
    const dispatch = useDispatch()

    const path = useLocation().pathname.split("/")[2]

    useEffect(() => {
        const fetchData = async () => {
            try {
                const videoRes = await axios.get(`${baseUrl}/videos/find/${path}`)
                dispatch(fetchSuccess(videoRes.data))
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [path, dispatch])

    const handleSub = async () => {
        await axios.put(`${baseUrl}/users/sub/${currentUser._id}`,{ headers: { Authorization: token, } })
        dispatch(subscription(currentUser._id))
    }

  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame src={currentVideo.videoUrl} />
        </VideoWrapper>

        <FirstLine>
            <Title>{currentVideo.title}</Title>
            <Author>{currentVideo.author}</Author>
        </FirstLine>
        
       <Details>
              <Tags>#HashTags.......</Tags>
                <Buttons>
                    <Button onClick={handleSub}>
                        <BookmarkTwoToneIcon />
                        Bookmark
                    </Button>
                    <Button>
                        <ShareIcon />
                        Share   
                    </Button>
                </Buttons>
       </Details>
         <Hr />

        <Description>
            {currentVideo.desc}
        </Description>
      </Content>

    </Container>
  )
}
