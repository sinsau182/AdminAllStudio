import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import app from '../firebase';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  width: 90%;
  max-width: 800px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  margin-top: 30px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 15px;
    gap: 15px;
  }
`;

const Title = styled.div`
  text-align: center;
  font-size: 24px;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 10px;
  border-radius: 3px;
  background-color: transparent;
  color: ${({ theme }) => theme.text};
  font-size: 16px;

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px;
  }
`;

const Desc = styled.textarea`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 10px;
  border-radius: 3px;
  background-color: transparent;
  color: ${({ theme }) => theme.text};
  font-size: 16px;

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.soft};
  border: none;
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  align-self: flex-end;

  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 14px;
  }
`;

const OneLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Label = styled.label`
  font-size: 14px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const Select = styled.select`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 10px;
  border-radius: 3px;
  background-color: black;
  color: ${({ theme }) => theme.text};
  font-size: 16px;

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px;
  }
`;

export default function Upload({ videoId }) {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [img, setImg] = useState(undefined);
  const [video, setVideo] = useState(undefined);
  const [imgPerc, setImgPerc] = useState(0);
  const [videoPerc, setVideoPerc] = useState(0);
  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleTags = (e) => {
    setTags(e.target.value.split(','));
  };

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const storageRef = ref(storage, file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === 'imgUrl' ? setImgPerc(Math.round(progress)) : setVideoPerc(Math.round(progress));
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => ({ ...prev, [urlType]: downloadURL }));
        });
      }
    );
  };

  useEffect(() => {
    video && uploadFile(video, 'videoUrl');
  }, [video]);

  useEffect(() => {
    img && uploadFile(img, 'imgUrl');
  }, [img]);


  const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await axios.get(`${baseUrl}/category/all`, { headers: { Authorization: token, } });
            setCategories(res?.data);
        }
        fetchCategories();
    }, []);


  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${baseUrl}/videos`, { ...inputs, tags },{ headers: { Authorization: token, } });
      if (res.status === 200) {
        setSuccessMessage('Video uploaded successfully!');
        setInputs({});
        setTags('');
        setImg(null);
        setVideo(null);
        setVideoPerc(0);
        setImgPerc(0);

        setTimeout(() => {
          setSuccessMessage('');
          navigate('/');
          window.location.reload();
        }, 3000);
      }
    } catch (error) {
      console.error('Error uploading video:', error);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>Upload Video</Title>
        <OneLine>
          <Label>Video:</Label>
          {videoPerc > 0 ? (
            `Uploading: ${videoPerc}%`
          ) : (
            <Input type="file" accept="video/*" onChange={(e) => setVideo(e.target.files[0])} />
          )}
        </OneLine>
        <Input
          type="text"
          placeholder="Title"
          name="title"
          value={inputs.title || ''}
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="Author"
          name="author"
          value={inputs.author || ''}
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="Please enter the Profile Link"
          name="link"
          value={inputs.link || ''}
          onChange={handleChange}
        />
        <OneLine>
          <Label>Category:</Label>
          <Select required value={inputs.category || ''} name="category" onChange={handleChange}>
            <option value="" disabled>
              Select Option
            </option>
            {categories?.map((category) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
          </Select>
        </OneLine>
        <Desc
          placeholder="Description"
          name="desc"
          rows={8}
          value={inputs.desc || ''}
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="Separate the tags with commas."
          value={tags}
          onChange={handleTags}
        />
        <OneLine>
          <Label>Image:</Label>
          {imgPerc > 0 ? (
            `Uploading: ${imgPerc}%`
          ) : (
            <Input type="file" accept="image/*" onChange={(e) => setImg(e.target.files[0])} />
          )}
        </OneLine>
        <Button onClick={handleUpload}>Upload</Button>
        {successMessage && <p>{successMessage}</p>}
      </Wrapper>
    </Container>
  );
}
