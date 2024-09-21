import React from 'react';
import styled from 'styled-components';
import Upload from '../Upload';
import AdminUploads from '../AdminUploads';
import CategoryUpload from '../CategoryUpload';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Align items to the top in mobile view */
  gap: 20px;
  margin-top: 0px;
  width: 100%;
  max-width: 1400px; /* Optional: set a max width for better layout control */
  margin-left: auto; /* Centering horizontally */
  margin-right: auto; /* Centering horizontally */

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center; /* Center items horizontally in desktop view */
    align-items: flex-start; /* Align items to the top in desktop view */
    gap: 100px; /* Add space between items in desktop view */
    margin-bottom: 50px;
  }
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 100%;

  @media (min-width: 768px) {
    width: 60%;
  }
`;

export default function Home() {
  return (
    <>
      <Container>

      <ColumnContainer>
        <Upload />
        <CategoryUpload />
      </ColumnContainer>

        <AdminUploads />
        
      </Container>
    </>
  );
}
