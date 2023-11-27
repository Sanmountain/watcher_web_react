import styled from "styled-components";
import { colors } from "../styles/palette";
import { useState } from "react";
import Toggle from "../components/common/Toggle";

export default function ImageSetting() {
  const [isOn, setIsOn] = useState(false);

  const handleImageSetting = () => {
    setIsOn(!isOn);
  };

  return (
    <Container>
      <TitleToggleContainer>
        <Title>이미지설정</Title>
        <Toggle onClick={handleImageSetting} $isOn={isOn} />
      </TitleToggleContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const TitleToggleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: fit-content;
  height: fit-content;
  padding: 7% 10%;
  border: 1px solid ${colors.black[700]};
  border-radius: 20px;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 2.8rem;
  font-weight: 700;
  color: ${colors.blue[500]};
  margin-bottom: 50%;
`;
