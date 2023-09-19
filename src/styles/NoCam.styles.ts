import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 99.4%;
  justify-content: center;
  align-items: center;
`;

export const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 70px;
  margin: 50px 0;
`;

export const Info = styled.div`
  width: 100%;
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
`;

export const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const TopImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 300px;
  gap: 50px;
`;

export const SeparateImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 23%;
  height: 100%;
  border-radius: 20px;
  overflow: hidden;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
`;

export const BottomImageContainer = styled.div`
  width: 60%;
  height: 180px;
`;
