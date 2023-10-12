import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  min-height: 100vh;
`;

export const ChildrenHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  min-height: 100vh;
`;

export const ChildrenContainer = styled.div`
  width: calc(100% - 250px);
  min-height: calc(100vh - 70px);
`;
