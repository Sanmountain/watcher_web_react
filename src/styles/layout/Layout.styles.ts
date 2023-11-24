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
  width: calc(100% - 14.5%);
  height: calc((var(--vh, 1vh) * 100) - 80px);
`;
