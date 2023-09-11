import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  min-height: 100vh;
`;

export const ChildrenHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 250px);
  min-height: 100vh;
`;

export const ChildrenContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 70px);
`;
