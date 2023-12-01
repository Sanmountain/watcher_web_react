import { styled } from "styled-components";
import SpinnerImg from "../../assets/images/spinner.gif";

interface ILoadingProps {
  isVass?: boolean;
}

export default function Loading({ isVass }: ILoadingProps) {
  return (
    <Spinner $isVass={isVass}>
      <SpinnerImage src={SpinnerImg} />
    </Spinner>
  );
}

const Spinner = styled.div<{ $isVass?: boolean }>`
  position: ${(props) => (props.$isVass ? "absolute" : "static")};
  top: 30%;
  left: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 13%;
  height: 28%;
  z-index: 999;
`;

const SpinnerImage = styled.img`
  width: 100%;
  height: 100%;
`;
