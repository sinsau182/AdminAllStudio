import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: flex-start;
  margin: 20px;
  width: 90%;
  max-width: 600px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 90%;
    margin: 10px;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: row;
    gap: 15px;
  }
`;

const Input = styled.input`
  width: 70%;
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 10px;
  border-radius: 5px;
  background-color: transparent;
  color: ${({ theme }) => theme.text};
  font-size: 16px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Button = styled.button`
  border-radius: 5px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.bgDark};
  }
`;

const CategoryList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
  margin-top: 10px;
`;

const CategoryItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  background-color: ${({ theme }) => theme.bgLighter};
  border-radius: 5px;
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
    padding: 15px;
  }
`;

export default function CategoryUpload() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [toggleList, setToggleList] = useState(false);
  const [categories, setCategories] = useState([]);
  const [input, setInput] = useState({ name: "" });
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${baseUrl}/category`, { ...input },{ headers: { Authorization: token, } });
      setInput({ name: "" });
      setCategories([...categories, res.data]); // Update the categories list
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get(`${baseUrl}/category/all`, { headers: { Authorization: token, } });
      setCategories(res.data);
    };
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseUrl}/category/${id}`,{ headers: { Authorization: token, } });
      setCategories(categories.filter((category) => category._id !== id));
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <InputWrapper>
        <Input
          type="text"
          placeholder="Enter Categories"
          name="name"
          value={input.name}
          onChange={handleChange}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSubmit(e);
            }
          }
          }
        />
        <Button onClick={(e) =>handleSubmit(e)}>Submit</Button>
        <Button onClick={() => setToggleList(!toggleList)}>
          {toggleList ? "Close" : "Show"}
        </Button>
      </InputWrapper>
      {toggleList && (
        <CategoryList>
          {categories.map((category) => (
            <CategoryItem key={category._id}>
              <span>{category.name}</span>
              <Button onClick={() => handleDelete(category._id)}>Delete</Button>
            </CategoryItem>
          ))}
        </CategoryList>
      )}
    </Wrapper>
  );
}
